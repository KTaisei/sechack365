import { FirstFlyerDetail } from '../../first-flyer/detail';
export const dynamic = 'force-static';
export default function Page(){return <FirstFlyerDetail number="03" title="つまずきのサインを読む" lead="第一回展示では、回答速度や入力の迷いから学習者の負担を読み取る構想を紹介しました。" sections={[
 {id:'first',label:'FIRST EXHIBITION',title:'知識推定を目指した理由',paragraphs:['チラシでは、AIが生成した理解度テストに答える際の回答速度や入力の迷いを見て、どこでつまずいているかを推定する案を示しました。正誤だけでは分からない負担や確信の弱さも、学習支援に使う発想です。']},
 {id:'boundary',label:'CURRENT POSITION',title:'構想と現行診断を分けて見る',paragraphs:['現在の適応型診断は、段階式問題への回答内容を評価し、知識ノードごとの理解度と確かさを更新します。回答速度や入力の迷いを負担推定に使う機能は、第一回チラシに載った構想として扱い、現行実装の根拠とは混同しません。'],fact:'現在の回答評価については、関連する「質問数を少なくする技術」のページで詳しく説明しています。'},
 {id:'related',label:'RELATED',title:'その後の研究につながる点',paragraphs:['学習者の現在地を少ない質問から推定し、弱点候補を次の出題や学習順序へ反映する方向は、後の研究へ引き継がれています。']}
 ]} next={{href:'/topics/first-status/',label:'第一回展示時点の開発状況'}}/>}
