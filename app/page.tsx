import Link from 'next/link';
import { AiChat } from './ai-chat';
import { Site } from './site';
/* oxlint-disable next/no-img-element -- supplied exhibition documents are shown without visual changes */
const base=process.env.PAGES_BASE_PATH ?? '';
const documents=[
 {href:'/poster/',kind:'POSTER / A1',title:'プロジェクトポスター',text:'研究の課題、システム全体、適応型理解度推定、予備実験、iPadアプリ、今後の展開。',image:'/exhibits/research-poster.png',count:'8セクション'},
 {href:'/flyer/',kind:'FLYER / A4',title:'技術詳細チラシ',text:'一問ごとの推定処理、グラフ伝播モデル、合成データによる予備実験の詳細。',image:'/exhibits/research-flyer.png',count:'3セクション'},
];
export default function Home(){return <Site><main><section className="selector-hero"><div className="container"><p className="eyebrow">PROJECT EXHIBITION</p><h1>展示資料を選ぶ</h1><p>読みたいポスターまたはチラシを選択してください。次のページで資料全体を確認し、紙面上の各セクションから詳細へ進めます。</p></div></section><section className="selector-section"><div className="container exhibit-selector">{documents.map(d=><Link className="selector-card" href={d.href} key={d.href}><div className="selector-image"><img src={`${base}${d.image}`} alt={d.title}/></div><div className="selector-copy"><p>{d.kind}</p><h2>{d.title}</h2><span>{d.text}</span><strong>{d.count}から選ぶ →</strong></div></Link>)}</div></section><section className="ai-preview"><div className="container ai-grid"><div><p className="eyebrow">AI GUIDE</p><h2>展示内容について、<br/>その場で質問する。</h2><p>ポスター、チラシ、研究内容について、さくらのAI Engineが案内します。</p></div><AiChat /></div></section></main></Site>}
