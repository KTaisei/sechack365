'use client';

import { useState } from 'react';
import { siteHref } from '../lib/base-path';

export function FloatingAiButton() {
  const [leaving, setLeaving] = useState(false);
  const aiPath = siteHref('/ai/');

  function openAi() {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => window.location.assign(aiPath), 420);
  }

  return <>
    <div className={`ai-transition${leaving ? ' is-active' : ''}`} aria-hidden="true"/>
    <button className={`floating-ai-button${leaving ? ' is-leaving' : ''}`} type="button" onClick={openAi} aria-label="AIガイドの質問ページを開く">
      <span className="floating-ai-icon" aria-hidden="true">AI</span>
      <span><b>AIに質問</b><small>展示資料から回答</small></span>
    </button>
  </>;
}
