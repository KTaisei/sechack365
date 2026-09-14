'use client';

import { FormEvent, useState } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_SAKURA_AI_PROXY_URL ?? '';
type Source = { title: string; url: string };
const examples = ['この研究の目的は？', 'GIADとは？', '実験結果を教えて'];

export function AiChat({ basePath = '' }: { basePath?: string }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || loading) return;
    if (!apiUrl) {
      setError('AI APIがまだ設定されていません。管理者にお知らせください。');
      return;
    }
    setLoading(true);
    setError('');
    setAnswer('');
    setSources([]);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      });
      const body = (await response.json()) as { answer?: string; error?: string; sources?: Source[] };
      if (!response.ok || !body.answer) throw new Error(body.error || 'AIから回答を取得できませんでした。');
      setAnswer(body.answer);
      setSources(Array.isArray(body.sources) ? body.sources : []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '通信に失敗しました。');
    } finally {
      setLoading(false);
    }
  }

  return <div className="chat-demo">
    <div className="chat-heading"><span className="ai-status"><i aria-hidden="true"/> AIガイド</span><span>展示資料を参照して回答</span></div>
    <p className="chat-label">質問例を選ぶ</p>
    <div className="chat-examples">{examples.map(example => <button type="button" key={example} onClick={() => setQuestion(example)} disabled={loading}>{example}</button>)}</div>
    <form className="chat-box" onSubmit={submit}>
      <label className="sr-only" htmlFor="ai-question">プロジェクトについて質問する</label>
      <input id="ai-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={800} disabled={loading} inputMode="text" autoComplete="off" placeholder="例：この研究は何を解決しますか？" />
      <button type="submit" disabled={loading || !question.trim()}>{loading ? '回答中…' : 'AIに質問する'}</button>
    </form>
    <div className="chat-result" aria-live="polite" aria-busy={loading}>
      {loading && <p>展示資料をもとに回答を作成しています。</p>}
      {answer && <p><strong>AI：</strong>{answer}</p>}
      {sources.length > 0 && <div className="chat-sources"><strong>根拠となる展示ページ</strong><ul>{sources.map(source => <li key={source.url}><a href={`${basePath}${source.url}`}>{source.title}</a></li>)}</ul></div>}
      {error && <p className="chat-error">{error}</p>}
    </div>
    <small>AIの回答には誤りが含まれる場合があります。重要な内容は展示資料で確認してください。</small>
  </div>;
}
