import { NextPage, PageHero, Site } from '../site';
export const dynamic='force-static';
const tech=[
 ['01','情報収集と学習グラフ生成','MediaWiki API + TF-IDF + Google Trends + Ollama / Gemma','実装済み',['自然文を5〜10個の調査語へ分解','最大180候補を収集し、本文量・被リンク・類似度で絞る','15〜25ノード、4レイヤーの教育用グラフを生成','JSON形式・値域・IDをPydanticで検証']],
 ['02','適応型理解度推定','NetworkX + Ollama / Gemma + Pydantic','実装済み',['未評価・上位レイヤー・接続数から出題候補を選ぶ','一問で接続された最大5ノードを直接評価','理解度・確かさ・回答中の根拠を構造化','エッジ重み・距離減衰・確かさで推定を伝播']],
 ['03','iPadクライアント','SwiftUI + Python API','実装済み',['iPadOS 17以上・横向きに対応','診断、グラフ表示、結果、履歴、設定を実装','SVG理解度マップとセッションJSONを出力','スケジュール生成は未接続']],
 ['04','学習スケジュール生成','構想・設計段階','今後',['診断結果から学ぶ内容と順序を決める','期限と利用可能時間を週次計画へ反映','学習行動に応じて再計画する']],
];
export default function Page(){return <Site><main><PageHero eyebrow="TECHNOLOGY" title="実装されている技術" lead="2つのコードベースとiPadアプリを確認し、現在動いている処理と今後の構想を分けて説明します。"/><section className="section"><div className="container"><div className="tech-list">{tech.map(([n,t,name,state,items])=><article className="tech" key={n as string}><div><span className="number">TECHNOLOGY {n as string}</span><h3>{t as string}</h3><span className={`tag ${state==='今後'?'active':''}`}>{state as string}</span></div><div><p className="tech-name">{name as string}</p><ul>{(items as string[]).map(i=><li key={i}>{i}</li>)}</ul></div></article>)}</div></div></section></main><NextPage href="/progress/" label="NEXT" title="現在の開発進捗を見る"/></Site>}
