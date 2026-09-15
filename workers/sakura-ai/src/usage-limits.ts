import { DurableObject } from 'cloudflare:workers';

export const MINUTE_LIMIT = 5;
export const DAY_LIMIT = 50;
export const MONTH_LIMIT = 2700;

export type LimitResult = { allowed: true } | { allowed: false; reason: 'minute' | 'day' | 'month'; retryAfter: number };

// One coordinator is intentional: the monthly budget must be exact across all visitors.
export class UsageLimits extends DurableObject<Record<string, never>> {
  constructor(ctx: DurableObjectState, env: Record<string, never>) {
    super(ctx, env);
    void ctx.blockConcurrencyWhile(async () => {
      ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS usage (visitor TEXT NOT NULL, at INTEGER NOT NULL, day TEXT NOT NULL, month TEXT NOT NULL)');
      ctx.storage.sql.exec('CREATE INDEX IF NOT EXISTS usage_visitor_at ON usage(visitor, at)');
      ctx.storage.sql.exec('CREATE INDEX IF NOT EXISTS usage_visitor_day ON usage(visitor, day)');
      ctx.storage.sql.exec('CREATE INDEX IF NOT EXISTS usage_month ON usage(month)');
    });
  }

  reserve(visitor: string, now: number): LimitResult {
    const jst = new Date(now + 9 * 60 * 60 * 1000);
    const day = `${jst.getUTCFullYear()}-${String(jst.getUTCMonth() + 1).padStart(2, '0')}-${String(jst.getUTCDate()).padStart(2, '0')}`;
    const month = day.slice(0, 7);
    return this.ctx.storage.transactionSync(() => {
      // Old records never affect a future month and can be discarded.
      this.ctx.storage.sql.exec('DELETE FROM usage WHERE month < ?', month);
      const monthly = this.ctx.storage.sql.exec<{ count: number }>('SELECT COUNT(*) AS count FROM usage WHERE month = ?', month).one().count;
      if (monthly >= MONTH_LIMIT) return { allowed: false, reason: 'month', retryAfter: secondsUntilNextMonth(now) };
      const today = this.ctx.storage.sql.exec<{ count: number }>('SELECT COUNT(*) AS count FROM usage WHERE visitor = ? AND day = ?', visitor, day).one().count;
      if (today >= DAY_LIMIT) return { allowed: false, reason: 'day', retryAfter: secondsUntilNextDay(now) };
      const recent = this.ctx.storage.sql.exec<{ count: number; oldest: number | null }>('SELECT COUNT(*) AS count, MIN(at) AS oldest FROM usage WHERE visitor = ? AND at > ?', visitor, now - 60_000).one();
      if (recent.count >= MINUTE_LIMIT) return { allowed: false, reason: 'minute', retryAfter: Math.max(1, Math.ceil(((recent.oldest ?? now) + 60_000 - now) / 1000)) };
      this.ctx.storage.sql.exec('INSERT INTO usage (visitor, at, day, month) VALUES (?, ?, ?, ?)', visitor, now, day, month);
      return { allowed: true };
    });
  }
}

function secondsUntilNextDay(now: number) {
  const jst = new Date(now + 9 * 60 * 60 * 1000);
  return Math.ceil((Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate() + 1) - jst.getTime()) / 1000);
}

function secondsUntilNextMonth(now: number) {
  const jst = new Date(now + 9 * 60 * 60 * 1000);
  return Math.ceil((Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth() + 1, 1) - jst.getTime()) / 1000);
}
