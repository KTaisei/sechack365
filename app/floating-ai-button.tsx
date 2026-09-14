'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { siteHref } from '../lib/base-path';

export function FloatingAiButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const aiPath = siteHref('/ai/');

  if (pathname === aiPath || pathname === aiPath.replace(/\/$/, '')) return null;

  function openAi() {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => router.push(aiPath), 420);
  }

  return <>
    <div className={`ai-transition${leaving ? ' is-active' : ''}`} aria-hidden="true"/>
    <button className={`floating-ai-button${leaving ? ' is-leaving' : ''}`} type="button" onClick={openAi} aria-label="AIガイドの質問ページを開く">
      <span className="floating-ai-icon" aria-hidden="true">AI</span>
      <span><b>AIに質問</b><small>展示資料から回答</small></span>
    </button>
  </>;
}
