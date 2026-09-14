import { TopicDetail } from '../../topic-detail';
export const dynamic='force-static';
export default function Page(){return <TopicDetail number="02" title="システム全体のつながり" lead="ナレッジグラフ生成と適応型理解度推定をJSONで接続し、iPadから操作できる試作を構成しています。" sections={[
 {id:'flow',label:'SYSTEM FLOW',title:'入力から診断結果まで',paragraphs:['利用者の自然文を調査計画へ変換し、Wikipedia候補と検索傾向を収集します。Gemmaが教育用ナレッジグラフJSONを生成し、理解度推定バックエンドがそのJSONを読み込みます。iPadアプリはバックエンド経由で問題を受け取り、回答と診断結果を表示します。'],bullets:['in_collecter：入力解析、候補収集、グラフJSON生成','knowleage_estimat：出題先選択、問題生成、回答分析、グラフ伝播','KnowledgeTracingApp：プロフィール設定、回答、理解度マップ、履歴表示']},
 {id:'loops',label:'INFERENCE LOOP',title:'回答ごとに理解状態と次問を更新する',paragraphs:['一問への回答を直接評価し、前提・応用へ弱めて伝播した後、未評価または不確かな知識から次の対象を選び直します。セッションはJSON保存され、ブラウザを再読み込みしても再開できます。']},
 {id:'status',label:'CURRENT STATUS',title:'実装済みと未実装の境界',paragraphs:['自然文入力、Wikipedia候補収集、Gemmaによるグラフ生成、最大5問の適応型診断、結果表示、iPadクライアントは実装されています。実回答データによる有効性検証と、診断結果からの学習スケジュール生成は未完了です。'],fact:'「実装済み」はコードとして動作することを示します。教育効果や推定精度が人を対象に実証済みという意味ではありません。'}
 ]} next={{href:'/topics/diagnosis/',label:'質問数を少なくする技術'}}/>}
