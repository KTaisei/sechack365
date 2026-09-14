import { TopicDetail } from '../../topic-detail';
export const dynamic='force-static';
export default function Page(){return <TopicDetail number="05" title="今後の展開" lead="予備実験で見えた弱点を直し、診断結果を学習計画へ接続します。" sections={[
 {id:'real-data',label:'NEXT 01',title:'実回答データによる精度検証',paragraphs:['実際の回答者に診断を受けてもらい、F1・MAE・回答時間・疲労感を比較します。分野や学習経験によって見逃しや誤判定が増えないかも確認します。']},
 {id:'model',label:'NEXT 02',title:'理解度推定モデルの改善',paragraphs:['弱点候補を広く探す前半と、候補を詳しく測る後半を分ける二段階方式を検討します。理解度の区分や確信度の扱いも見直し、質問数とMAEの両立を目指します。']},
 {id:'schedule',label:'NEXT 03',title:'スケジュール生成機能の追加',paragraphs:['診断結果、ナレッジグラフ、ゴール、期限、利用可能時間を組み合わせ、学ぶ内容と順序を週次計画として生成します。予定どおり進まなかった場合に再計画できる仕組みも必要です。']},
 {id:'ai',label:'FUTURE',title:'展示資料について質問できる専用AI',paragraphs:['将来は、ポスター、チラシ、実験条件、用語説明を根拠として回答するAIをサイトへ導入します。回答には参照した資料や該当セクションを示し、研究で確認済みの内容と今後の構想を区別できる設計を目指します。']}
 ]} next={{href:'/resources/',label:'展示・研究資料を見る'}}/>}
