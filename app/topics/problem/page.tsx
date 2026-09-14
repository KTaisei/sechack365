import { TopicDetail } from '../../topic-detail';
export const dynamic='force-static';
export default function Page(){return <TopicDetail number="00-A" title="解決したい課題" lead="学習内容ではなく、学習者の現在地を出発点にできる仕組みが必要です。" sections={[
 {id:'situation',label:'BACKGROUND',title:'同じところでつまずく理由',paragraphs:['英語や数学を学び直すとき、理解済みの範囲まで最初から繰り返したり、前提知識が抜けたまま先へ進んだりすることがあります。教材が不足しているだけでなく、「何が分かり、何が足りないか」を把握できていないことが原因です。']},
 {id:'gap',label:'CURRENT GAP',title:'固定された学習ルートの限界',paragraphs:['多くのサービスは標準的な順序を提示します。しかし、同じ目標を持つ人でも、既に持っている知識、期限、使える時間は異なります。全員に同じ開始地点と順番を当てはめると、無駄な復習や前提の見落としが生まれます。'],fact:'本研究が扱う中心課題：学習者ごとの知識状態と知識間の前提関係を、次に学ぶ内容の決定へ反映すること。'},
 {id:'scope',label:'SCOPE',title:'今回の研究で扱う範囲',paragraphs:['まず、知識をグラフとして整理し、少ない質問から弱点候補を探す部分を実装・検証します。その結果を学習スケジュールへ接続することが最終的な方向です。現段階では、あらゆる分野で教育効果が確認された完成サービスではありません。']}
 ]} next={{href:'/topics/goal/',label:'プロジェクトのゴール'}}/>}
