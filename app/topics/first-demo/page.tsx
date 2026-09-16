import { FirstFlyerDetail } from '../../first-flyer/detail';
export const dynamic = 'force-static';
export default function Page(){return <FirstFlyerDetail number="デモ" title="第一回展示のナレッジグラフデモ" lead="第一回チラシには「微分」をテーマに生成したグラフの画面が載っています。" sections={[
 {id:'screen',label:'DEMO SCREEN',title:'知識のつながりを可視化する',paragraphs:['紙面の画面では、知識ノードと関係を矢印で表示し、左から右へ基礎から応用の段階が変わる様子を紹介しています。ノードの詳細も画面で確認できる構成です。']},
 {id:'data',label:'IN_COLLECTER',title:'生成結果をJSONとして保存する',paragraphs:['in_collecterは入力したテーマのグラフをJSONへ保存し、Web画面で生成済みグラフを選んで表示できます。保存データにはノード、エッジ、レイヤー、調査計画などが含まれます。']},
 {id:'scope',label:'WHAT THIS DEMO SHOWS',title:'デモの範囲',paragraphs:['この画面が示すのは、学ぶ概念と前提関係を生成・表示する部分です。利用者の理解度診断や個人用スケジュールが第一回展示時点に完成していたことを示すものではありません。']}
 ]} next={{href:'/knowledge-graphs/',label:'現在のグラフサンプルを見る'}}/>}
