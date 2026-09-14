'use client';

import { FormEvent, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_SAKURA_AI_PROXY_URL ?? '';

export function AiChat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
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
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      });
      const body = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !body.answer) throw new Error(body.error || 'AIから回答を取得できませんでした。');
      setAnswer(body.answer);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '通信に失敗しました。');
    } finally {
      setLoading(false);
    }
  }

  return <div className="chat-demo">
    <span className="ai-status">さくらのAI Engine</span>
    <p className="chat-hint">例：「GIADは、従来方式と何が違うのですか？」</p>
    <form className="chat-box" onSubmit={submit}>
      <label className="sr-only" htmlFor="ai-question">プロジェクトについて質問する</label>
      <input id="ai-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={800} disabled={loading} placeholder="プロジェクトについて質問する" />
      <button type="submit" disabled={loading || !question.trim()}>{loading ? '回答中…' : '送信'}</button>
    </form>
    <div className="chat-result" aria-live="polite" aria-busy={loading}>
      {loading && <p>展示資料をもとに回答を作成しています。</p>}
      {answer && <p><strong>AI：</strong>{answer}</p>}
      {error && <p className="chat-error">{error}</p>}
    </div>
    <small>AIの回答には誤りが含まれる場合があります。重要な内容は展示資料で確認してください。</small>
  </div>;
}
