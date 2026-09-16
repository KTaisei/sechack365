import { PageHero, Site } from '../site';
export const dynamic = 'force-static';
const base=process.env.PAGES_BASE_PATH ?? '';
const resources=[
 ['A1 PDF','プロジェクトポスター','課題、全体構成、予備実験、iPadアプリ、今後の展開',`${base}/exhibits/research-poster.pdf`,'PDFを閲覧'],
 ['A4 PDF','技術詳細チラシ','適応型診断の内部処理、推定モデル、予備実験の詳細',`${base}/exhibits/research-flyer.pdf`,'PDFを閲覧'],
 ['A4 PDF','第一回展示のチラシ','当時の3つのAI技術、開発状況、ロードマップ、デモ',`${base}/exhibits/first-flyer.pdf`,'PDFを閲覧'],
 ['先行研究','個別最適な学び・協働的な学び','指導の個別化と学習の個性化、ICTを活用した学習状況の把握について示した背景資料','https://www.mext.go.jp/a_menu/shotou/new-cs/senseiouen/mext_01491.html','文部科学省'],
 ['JSON','ナレッジグラフサンプル','微分・三角関数・暗号通信の3種類を、レイヤーと依存関係から閲覧',`${base}/knowledge-graphs/`,'ブラウザで閲覧'],
 ['CODE','GitHubリポジトリ','現時点ではKnowledge Graphを生成するシステムのソースのみ公開しています。','https://github.com/KTaisei/KnowledgeGraph','公開中'],
 ['Technology Blog','Knowledge Graph技術ブログ','Knowledge Gtraphの生成についてまとめた技術ブログです。','https://ktaisei.github.io/official/works/knowledge-graph-collector/','ブラウザで閲覧'],
 ['Technology Blog','GIAD技術ブログ','少ない質問数で理解度を推定する技術についてまとめた技術ブログです。','https://ktaisei.github.io/official/works/optimization/','ブラウザで閲覧']
];
export default function Resources(){return <Site><main><PageHero eyebrow="RESOURCES" title="展示・研究資料" lead="会場で掲示するポスターとチラシを、ブラウザ上で拡大して確認できます。"/><section className="section alt"><div className="container"><div className="resource-grid">{resources.map(([icon,title,text,href,status])=><a className="resource" href={href} target={href.endsWith('.pdf')?'_blank':undefined} rel={href.endsWith('.pdf')?'noreferrer':undefined} key={title}><span className="resource-icon">{icon}</span><div><h3>{title}</h3><p>{text}</p><small>{status}</small></div><b aria-hidden="true">→</b></a>)}</div></div></section><section className="section" id="preparing"><div className="container"><div className="section-head"><p className="eyebrow">PUBLICATION POLICY</p><h2>資料の位置づけ</h2><p className="lead">掲載中の資料（プロジェクトポスター、技術詳細チラシ）の結果は合成データを用いた予備実験です。実回答データによる有効性は未検証であり、今後の検証結果に合わせて資料を更新します。また、ナレッジグラフのデータに関してはwikipediaからデータを取得して、独自に開発したシステムを通して生成されたものです。</p></div></div></section></main></Site>}
