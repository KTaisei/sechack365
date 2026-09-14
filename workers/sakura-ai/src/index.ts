interface Env {
  SAKURA_AI_TOKEN: string;
  ALLOWED_ORIGIN: string;
  SAKURA_AI_MODEL?: string;
}

const SYSTEM_PROMPT = `あなたはSecHack365の研究展示「学ぶを支援するシステムの開発」の案内役です。
回答は日本語で簡潔に、次の確認済み情報だけを根拠にしてください。不明なことは推測せず「展示資料からは確認できません」と答えてください。

・目標は、学習者の理解状態に合わせて学習ルートとスケジュールを更新すること。
・GIADは知識を前提・基礎・中核・応用のグラフで表し、回答後にベイズ更新、グラフ伝播、情報利得による次問選択を行う適応型診断モデル。
・研究用GIADコアの数値推定はLLMではなく明示的な数式で行う。生成AIは問題文の草案や自由記述の構造化に使う。
・合成データによる予備実験では、比較方式が8問で得た弱点検出F1へGIADは5〜6問で到達した。
・一方、8問時点の理解度MAEは微分0.385、三角関数0.402、暗号通信0.379で、3分野すべてIndependent CATより悪かった。
・したがって、弱点候補を少ない質問で絞る可能性はあるが、理解度全体を同じ精度で推定できたとは言えない。
・実験は合成回答による予備実験であり、実際の学習者への有効性は未検証。
・今後は弱点探索と精密測定を分けた二段階方式、実回答による係数校正、学習スケジュールとの接続を検討する。

研究で確認済みの結果と今後の構想を明確に区別し、断定しすぎないでください。回答は原則250文字以内にしてください。`;

function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, origin: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const requestOrigin = request.headers.get('Origin') ?? '';
    const allowedOrigin = env.ALLOWED_ORIGIN;
    if (!allowedOrigin || requestOrigin !== allowedOrigin) {
      return json({ error: 'このサイトからは利用できません。' }, 403, allowedOrigin || 'null');
    }
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin) });
    if (request.method !== 'POST') return json({ error: 'POSTリクエストのみ利用できます。' }, 405, allowedOrigin);

    let question = '';
    try {
      const body = (await request.json()) as { question?: unknown };
      question = typeof body.question === 'string' ? body.question.trim() : '';
    } catch {
      return json({ error: 'リクエスト形式が正しくありません。' }, 400, allowedOrigin);
    }
    if (!question || question.length > 800) return json({ error: '質問は1〜800文字で入力してください。' }, 400, allowedOrigin);

    try {
      const upstream = await fetch('https://api.ai.sakura.ad.jp/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.SAKURA_AI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: env.SAKURA_AI_MODEL || 'gpt-oss-120b',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: question }],
          temperature: 0.2,
          max_tokens: 500,
          stream: false,
        }),
      });
      if (!upstream.ok) {
        console.error('Sakura AI error', upstream.status, await upstream.text());
        return json({ error: 'AIサービスが一時的に利用できません。' }, 502, allowedOrigin);
      }
      const result = (await upstream.json()) as { choices?: Array<{ message?: { content?: string } }> };
      const answer = result.choices?.[0]?.message?.content?.trim();
      if (!answer) return json({ error: 'AIから空の回答が返されました。' }, 502, allowedOrigin);
      return json({ answer }, 200, allowedOrigin);
    } catch (error) {
      console.error('Sakura AI request failed', error);
      return json({ error: 'AIサービスへの接続に失敗しました。' }, 502, allowedOrigin);
    }
  },
};
