import { FirstFlyerDetail } from '../../first-flyer/detail';
export const dynamic = 'force-static';
export default function Page(){return <FirstFlyerDetail number="開発" title="第一回展示時点の開発状況" lead="紙面の「完了・進行中・次フェーズ」は第一回展示時点の区分です。" sections={[
 {id:'done',label:'COMPLETE AT FIRST EXHIBITION',title:'ナレッジグラフ自動生成',paragraphs:['当時のチラシは、Wikipediaの情報収集・フィルタリングを使った実用レベルのナレッジグラフ自動生成を「完了」と示しています。紙面右下には、微分のグラフを表示したデモ画面も載っています。']},
 {id:'progress',label:'IN PROGRESS AT FIRST EXHIBITION',title:'AIの理解度テストと順序決定',paragraphs:['AI自身の理解度テストを使ったトポロジカルソートと、グラフ精度の自動改善を「進行中」としています。この表示は、その時点での研究計画を示し、改善結果の有効性を実証したという意味ではありません。']},
 {id:'next',label:'NEXT PHASE AT FIRST EXHIBITION',title:'ユーザーの知識推定',paragraphs:['利用者向けのAI生成理解度テストと、学習スケジュール生成は「次フェーズ」です。現在の研究状況を知りたい場合は、第二回のポスターと技術詳細チラシを参照してください。']}
 ]} next={{href:'/topics/first-roadmap/',label:'これからできるようにすること'}}/>}
