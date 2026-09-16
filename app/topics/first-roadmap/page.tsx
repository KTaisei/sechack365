import { FirstFlyerDetail } from '../../first-flyer/detail';
export const dynamic = 'force-static';
export default function Page(){return <FirstFlyerDetail number="計画" title="第一回展示のロードマップ" lead="紙面の3フェーズは、その後に目指した開発の順序です。" sections={[
 {id:'phase1',label:'PHASE 1',title:'ユーザーの知識推定',paragraphs:['理解度テストで回答速度などのデータを扱い、利用者が持つ知識を推定する構想です。第一回展示では、利用者向け診断の方向性として提示しました。']},
 {id:'phase2',label:'PHASE 2',title:'AIによるスケジュール生成',paragraphs:['知識推定の結果をもとに、一人ひとりに合わせた学習スケジュールを作る構想です。日々の学習状況や理解度の変化に合わせて、計画を修正する機能も含みます。']},
 {id:'phase3',label:'PHASE 3',title:'よりユーザーベースのAIへ',paragraphs:['学習記録を繰り返し反映し、利用者ごとに調整したスケジュールを提案する将来像です。紙面のフェーズは実装済み機能の一覧ではありません。'],fact:'現行サイトでは、実装済みの診断と今後の学習計画生成を分けて説明しています。'}
 ]} next={{href:'/topics/first-demo/',label:'ナレッジグラフ生成デモ'}}/>}
