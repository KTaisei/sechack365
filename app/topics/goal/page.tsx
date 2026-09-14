import { TopicDetail } from '../../topic-detail';
export const dynamic='force-static';
export default function Page(){return <TopicDetail number="00-B" title="プロジェクトのゴール" lead="理解度と知識の前提関係から、次に学ぶ内容と順序を提案します。" sections={[
 {id:'goal',label:'GOAL',title:'一人ひとりの計画づくりを支援する',paragraphs:['学びたいテーマを入力すると、必要な知識を整理し、現在の理解状態を確かめ、期限と学習時間に合う計画を作ることを目指しています。最終的な出力は単なる教材一覧ではなく、「なぜ今これを学ぶのか」が分かる順序付きの計画です。']},
 {id:'principles',label:'DESIGN PRINCIPLES',title:'システムが重視する3点',paragraphs:[],bullets:['知識の前提関係を保ち、基礎から応用へ進めること','少ない質問で学習者の負担を抑えながら弱点候補を探すこと','診断後も、学習行動や残り時間に応じて計画を更新できること']},
 {id:'measure',label:'SUCCESS CRITERIA',title:'何をもって有効と判断するか',paragraphs:['質問数を減らせたかだけでは十分ではありません。弱点検出のF1、理解度推定のMAE、回答時間、疲労感、提案した順序の妥当性を分けて評価します。'],fact:'短い診断と正確な診断の両立が研究課題です。予備実験では弱点検出に可能性が見られましたが、理解度の値の精度には改善余地があります。'}
 ]} next={{href:'/topics/learning-map/',label:'ナレッジグラフを作る技術'}}/>}
