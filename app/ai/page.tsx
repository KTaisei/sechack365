import type { Metadata } from 'next';
import { AiChat } from '../ai-chat';
import { Site } from '../site';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: '展示AIガイド' };

export default function AiPage() {
  const basePath = process.env.PAGES_BASE_PATH ?? '';
  return <Site><main className="ai-page"><section className="ai-page-content"><div className="container"><AiChat basePath={basePath}/></div></section></main></Site>;
}
