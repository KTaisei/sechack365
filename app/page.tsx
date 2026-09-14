import Link from '../components/base-link';
import { siteHref } from '../lib/base-path';
import { Site } from './site';
/* oxlint-disable next/no-img-element -- supplied exhibition documents are shown without visual changes */
const base=process.env.PAGES_BASE_PATH ?? '';
const documents=[
 {href:'/poster/',kind:'POSTER / A1',title:'プロジェクトポスター',text:'研究の課題、システム全体、適応型理解度推定、予備実験、iPadアプリ、今後の展開。',image:'/exhibits/research-poster.png',count:'8セクション'},
 {href:'/flyer/',kind:'FLYER / A4',title:'技術詳細チラシ',text:'一問ごとの推定処理、グラフ伝播モデル、合成データによる予備実験の詳細。',image:'/exhibits/research-flyer.png',count:'3セクション'},
];
export default function Home(){return <Site><main><section className="selector-hero"><div className="container"><p className="eyebrow">PROJECT EXHIBITION</p><h1>展示資料を選ぶ</h1><p>ポスターまたはチラシを選ぶと、紙面と各テーマの詳しい説明を確認できます。研究について知りたいことは、右下のAIガイドからいつでも質問できます。</p></div></section><section className="selector-section"><div className="container exhibit-selector">{documents.map(d=><Link className="selector-card" href={siteHref(d.href)} key={d.href}><div className="selector-image"><img src={`${base}${d.image}`} alt={d.title}/></div><div className="selector-copy"><p>{d.kind}</p><h2>{d.title}</h2><span>{d.text}</span><strong>{d.count}から選ぶ →</strong></div></Link>)}</div></section></main></Site>}
