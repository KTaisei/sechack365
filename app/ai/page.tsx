import type { Metadata } from 'next';
import { AiChat } from '../ai-chat';
import { Site } from '../site';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'AIに質問する' };

export default function AiPage() {
  return <Site><main className="ai-page"><section className="ai-page-hero"><div className="container"><p className="eyebrow">AI GUIDE</p><h1>研究についてAIに質問する</h1><p>展示資料を根拠に、研究の目的、仕組み、実験結果や用語を案内します。</p></div></section><section className="ai-page-content"><div className="container"><AiChat/></div></section></main></Site>;
}
