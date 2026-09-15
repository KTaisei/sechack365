'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ArrowUp, RotateCcw, Sparkles } from 'lucide-react';

const apiUrl = process.env.NEXT_PUBLIC_SAKURA_AI_PROXY_URL ?? '';
const storageKey = 'sechack-ai-chat-session-v1';
const examples = ['この研究の目的は？', 'GIADとは？', '実験結果を教えて'];
type Source = { title: string; url: string };
type Message = { role: 'user' | 'assistant'; content: string; sources?: Source[] };

export function AiChat({ basePath = '' }: { basePath?: string }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? '[]') as unknown;
      if (Array.isArray(saved)) {
        const restored = saved.filter((item): item is Message =>
          item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string'
        ).slice(-20);
        setTimeout(() => { loaded.current = true; setMessages(restored); }, 0);
        return;
      }
    } catch { /* An invalid saved conversation starts fresh. */ }
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (loaded.current) sessionStorage.setItem(storageKey, JSON.stringify(messages.slice(-20)));
    bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading, error]);

  function newChat() {
    setMessages([]);
    setQuestion('');
    setError('');
    sessionStorage.removeItem(storageKey);
    input.current?.focus();
  }

  async function ask(value: string) {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    if (!apiUrl) { setError('AI APIがまだ設定されていません。管理者にお知らせください。'); return; }
    const history = messages.slice(-6).map(({ role, content }) => ({ role, content: content.slice(0, 800) }));
    setMessages(current => [...current, { role: 'user', content: trimmed }]);
    setQuestion('');
    setLoading(true);
    setError('');
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed, history }),
      });
      const body = (await response.json()) as { answer?: string; error?: string; sources?: Source[] };
      if (!response.ok || !body.answer) throw new Error(body.error || 'AIから回答を取得できませんでした。');
      setMessages(current => [...current, { role: 'assistant', content: body.answer!, sources: Array.isArray(body.sources) ? body.sources : [] }]);
    } catch (cause) {
      setMessages(current => current.slice(0, -1));
      setQuestion(trimmed);
      setError(cause instanceof Error ? cause.message : '通信に失敗しました。');
    } finally { setLoading(false); }
  }

  function keyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault(); void ask(question);
    }
  }

  return <div className="ai-conversation">
    <div className="ai-conversation-top"><div className="ai-conversation-title"><span className="ai-conversation-mark"><Sparkles size={18} aria-hidden="true" /></span><div><strong>展示AIガイド</strong><small>展示資料をもとに回答</small></div></div><button type="button" className="ai-new-chat" onClick={newChat} disabled={loading}><RotateCcw size={16} aria-hidden="true" />新しい会話</button></div>
    <div className="ai-messages" aria-live="polite" aria-busy={loading}>
      {messages.length === 0 && <div className="ai-welcome"><span className="ai-welcome-icon"><Sparkles size={26} aria-hidden="true" /></span><h2>研究について、何でも聞いてください</h2><p>目的や仕組み、実験結果など、展示資料にある内容をご案内します。</p><div className="ai-suggestions">{examples.map(example => <button type="button" key={example} onClick={() => void ask(example)} disabled={loading}>{example}<span aria-hidden="true">↗</span></button>)}</div></div>}
      {messages.map((message, index) => <div className={`ai-message ai-message-${message.role}`} key={index}><span className="ai-message-avatar" aria-hidden="true">{message.role === 'user' ? 'あなた' : <Sparkles size={16} />}</span><div className="ai-message-body"><strong>{message.role === 'user' ? 'あなた' : '展示AIガイド'}</strong><p>{message.content}</p>{message.sources && message.sources.length > 0 && <div className="ai-message-sources"><span>参照した展示ページ</span><div>{message.sources.map(source => <a key={source.url} href={`${basePath}${source.url}`}>{source.title} ↗</a>)}</div></div>}</div></div>)}
      {loading && <div className="ai-message ai-message-assistant"><span className="ai-message-avatar" aria-hidden="true"><Sparkles size={16} /></span><div className="ai-message-body"><strong>展示AIガイド</strong><p className="ai-thinking">資料を確認しています<span>…</span></p></div></div>}
      {error && <div className="ai-chat-error" role="alert">{error}</div>}
      <div ref={bottom} />
    </div>
    <div className="ai-composer-area"><form className="ai-composer" onSubmit={event => { event.preventDefault(); void ask(question); }}><label className="sr-only" htmlFor="ai-question">研究について質問する</label><textarea ref={input} id="ai-question" value={question} onChange={event => setQuestion(event.target.value)} onKeyDown={keyDown} maxLength={800} disabled={loading} rows={2} placeholder="研究について質問する…" /><button type="submit" aria-label="質問を送信" disabled={loading || !question.trim()}><ArrowUp size={19} aria-hidden="true" /></button></form><p>回答には誤りが含まれる場合があります。重要な内容は展示資料で確認してください。</p></div>
    <style>{chatCss}</style>
  </div>;
}

const chatCss = `
.ai-page{background:#f6f7fb}.ai-page-content{padding:28px 0 56px}.ai-page-content>.container{width:min(100% - 32px,920px);max-width:920px}.ai-page-hero{display:none}
.ai-conversation{display:flex;flex-direction:column;min-height:min(780px,calc(100vh - 160px));background:#fff;border:1px solid #e4e7ef;border-radius:20px;box-shadow:0 14px 44px rgba(13,23,57,.07);overflow:hidden;color:#20232b}
.ai-conversation-top{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:17px 24px;border-bottom:1px solid #edf0f5}.ai-conversation-title{display:flex;align-items:center;gap:12px}.ai-conversation-mark,.ai-welcome-icon{display:grid;place-items:center;background:#e7eaff;color:#0017c1}.ai-conversation-mark{width:38px;height:38px;border-radius:12px}.ai-conversation-title strong,.ai-conversation-title small{display:block}.ai-conversation-title strong{font-size:16px;line-height:1.3}.ai-conversation-title small{color:#636c7c;font-size:12px;line-height:1.4;margin-top:3px}.ai-new-chat{display:inline-flex;align-items:center;gap:7px;padding:9px 12px;background:#fff;border:1px solid #d9deea;border-radius:10px;color:#33405b;font:700 13px 'Noto Sans JP',sans-serif;cursor:pointer}.ai-new-chat:hover{background:#f4f6ff;border-color:#b7c0ea}.ai-new-chat:disabled{opacity:.5;cursor:not-allowed}
.ai-messages{flex:1;min-height:420px;max-height:calc(100vh - 310px);overflow:auto;padding:28px 38px}.ai-welcome{max-width:620px;margin:clamp(40px,10vh,100px) auto 48px;text-align:center}.ai-welcome-icon{width:58px;height:58px;border-radius:18px;margin:0 auto 22px}.ai-welcome h2{font-size:clamp(22px,3vw,29px);margin:0 0 10px;line-height:1.5}.ai-welcome p{margin:0;color:#667085;font-size:15px}.ai-suggestions{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:32px}.ai-suggestions button{display:flex;justify-content:space-between;align-items:center;gap:8px;text-align:left;padding:17px 15px;background:#f8f9fc;border:1px solid #e4e7ee;border-radius:12px;color:#252b39;font:700 14px 'Noto Sans JP',sans-serif;cursor:pointer}.ai-suggestions button:hover{background:#f0f2ff;border-color:#aeb8e7}.ai-suggestions button span{color:#0017c1}
.ai-message{display:flex;gap:14px;max-width:760px;margin:0 auto 30px}.ai-message-avatar{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#e8eaff;color:#0017c1;font-size:10px;font-weight:800}.ai-message-user .ai-message-avatar{background:#edf0f5;color:#404b62}.ai-message-body{min-width:0;flex:1}.ai-message-body>strong{display:block;font-size:13px;color:#576176;margin:3px 0 8px}.ai-message-body>p{white-space:pre-wrap;margin:0;font-size:16px;line-height:1.85;overflow-wrap:anywhere}.ai-message-user .ai-message-body>p{display:inline-block;padding:12px 16px;background:#f4f6fa;border-radius:4px 14px 14px 14px}.ai-message-sources{margin-top:14px;padding:12px 14px;background:#f5f9ff;border-left:3px solid #0017c1;border-radius:0 9px 9px 0}.ai-message-sources>span{display:block;color:#59677c;font-size:12px;font-weight:700;margin-bottom:8px}.ai-message-sources>div{display:flex;gap:7px;flex-wrap:wrap}.ai-message-sources a{padding:5px 9px;border:1px solid #c9d4f3;border-radius:7px;color:#0017c1;font-size:13px;font-weight:700}.ai-message-sources a:hover{text-decoration:underline}.ai-thinking{color:#667085}.ai-chat-error{max-width:760px;margin:0 auto 20px;padding:12px 16px;border-radius:9px;background:#fff0f0;color:#9b1c1c;font-size:14px}
.ai-composer-area{padding:16px 38px 18px;border-top:1px solid #edf0f5;background:#fff}.ai-composer{display:flex;align-items:flex-end;gap:10px;max-width:760px;margin:auto;padding:11px 11px 11px 17px;border:1px solid #cbd3e1;border-radius:17px;box-shadow:0 3px 12px rgba(21,36,73,.05)}.ai-composer:focus-within{border-color:#0017c1;box-shadow:0 0 0 3px rgba(0,23,193,.1)}.ai-composer textarea{flex:1;min-width:0;max-height:180px;resize:vertical;border:0;outline:0;background:none;color:#20232b;font:16px/1.6 'Noto Sans JP',sans-serif}.ai-composer textarea::placeholder{color:#858c9c}.ai-composer button{flex:none;display:grid;place-items:center;width:38px;height:38px;border:0;border-radius:11px;background:#0017c1;color:#fff;cursor:pointer}.ai-composer button:disabled{background:#aab0bf;cursor:not-allowed}.ai-composer-area>p{max-width:760px;margin:10px auto 0;color:#778091;font-size:12px;text-align:center;line-height:1.6}
@media(max-width:680px){.ai-page-content{padding:0 0 28px}.ai-page-content>.container{width:100%}.ai-conversation{min-height:calc(100dvh - 64px);border:0;border-radius:0;box-shadow:none}.ai-conversation-top{padding:13px 16px}.ai-new-chat{font-size:12px;padding:8px}.ai-messages{min-height:300px;max-height:none;padding:24px 18px}.ai-welcome{margin:70px auto 32px}.ai-suggestions{grid-template-columns:1fr;margin-top:25px}.ai-suggestions button{padding:13px 16px}.ai-message{gap:10px}.ai-composer-area{padding:12px 16px 18px}.ai-composer-area>p{font-size:11px}}
`;
