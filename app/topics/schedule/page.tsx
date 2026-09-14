import Link from 'next/link';
import { Site } from '../../site';

export const dynamic = 'force-static';

export default function SchedulePage(){return <Site><main>
  <header className="topic-hero"><div className="container"><Link className="back-link" href="/">← ポスター展示へ戻る</Link><p className="eyebrow" style={{color:'#0017c1'}}>POSTER 01 / TOPIC 03</p><h1>予定を自動で更新</h1><p className="lead">ゴール、期限、使える時間、知識診断の結果をまとめ、実行可能な週次学習プランへ変換します。</p></div></header>
  <div className="container section topic-layout"><aside className="topic-nav" aria-label="ページ内目次"><strong>このページの内容</strong><a href="#input">入力情報</a><a href="#agents">AIの役割</a><a href="#update">更新方法</a><a href="#status">現在地</a></aside><article className="topic-body">
    <section id="input"><p className="eyebrow" style={{color:'#0017c1'}}>INPUT</p><h2>目標だけでなく、現実の制約も扱う</h2><p>目標と期限に加えて、曜日ごとに使える時間、知識診断で分かった現在地、学習マップ上の前提関係を入力として扱います。単なる教材一覧ではなく、実行する日と量を持つ計画を生成します。</p></section>
    <section id="agents"><p className="eyebrow" style={{color:'#0017c1'}}>MULTI-AGENT</p><h2>3つの視点から計画を調整する</h2><ul><li><strong>Planner：</strong>ゴールから週次マイルストーンを逆算する</li><li><strong>Content：</strong>各段階に合う教材と課題を選定する</li><li><strong>Mental：</strong>負荷や継続可能性を見てペースを調整する</li></ul><p>それぞれの提案を統合し、学習順序と生活上の制約を両立した最終案を作ります。</p></section>
    <section id="update"><p className="eyebrow" style={{color:'#0017c1'}}>UPDATE</p><h2>計画から外れても、作り直せる</h2><p>予定どおり進まなかった日や、想定より早く理解できた項目を検知し、残りの計画へ反映します。将来はiPadアプリ上の学習記録と接続し、利用者が毎回手作業で組み直さなくてもよい体験を目指します。</p></section>
    <section id="status"><p className="eyebrow" style={{color:'#0017c1'}}>CURRENT STATUS</p><h2>現在は設計・開発段階</h2><div className="fact"><strong>開発中</strong><br/>LangGraphとマルチエージェント構成を想定し、各役割と入出力を設計しています。</div><p>実運用には、計画の妥当性、過負荷の防止、教材推薦の根拠表示、利用者が計画を修正できる操作設計が必要です。</p></section>
  </article></div>
  <section className="next-page"><Link href="/technology/"><span>関連ページ</span><strong>使用技術をまとめて確認する</strong><b>→</b></Link></section>
 </main></Site>}
