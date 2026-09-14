import Link from 'next/link';
import { Site } from './site';

type Section={id:string;label:string;title:string;paragraphs:string[];bullets?:string[];fact?:string};

export function TopicDetail({number,title,lead,sections,next}:{number:string;title:string;lead:string;sections:Section[];next:{href:string;label:string}}){return <Site><main>
  <header className="topic-hero"><div className="container"><Link className="back-link" href="/">← ポスター展示へ戻る</Link><p className="eyebrow" style={{color:'#0017c1'}}>POSTER / SECTION {number}</p><h1>{title}</h1><p className="lead">{lead}</p></div></header>
  <div className="container section topic-layout"><aside className="topic-nav" aria-label="ページ内目次"><strong>このページの内容</strong>{sections.map(s=><a href={`#${s.id}`} key={s.id}>{s.title}</a>)}</aside><article className="topic-body">{sections.map(s=><section id={s.id} key={s.id}><p className="eyebrow" style={{color:'#0017c1'}}>{s.label}</p><h2>{s.title}</h2>{s.paragraphs.map((p,i)=><p key={i}>{p}</p>)}{s.bullets&&<ul>{s.bullets.map(x=><li key={x}>{x}</li>)}</ul>}{s.fact&&<div className="fact">{s.fact}</div>}</section>)}</article></div>
  <section className="next-page"><Link href={next.href}><span>次のポスター項目</span><strong>{next.label}</strong><b>→</b></Link></section>
 </main></Site>}
