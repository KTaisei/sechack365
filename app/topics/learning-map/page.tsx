import { TopicDetail } from '../../topic-detail';
export const dynamic='force-static';
export default function Page(){return <TopicDetail number="01" title="ナレッジグラフを作る技術" lead="自然な文章で入力した学習目標を、15〜25個の学習可能な知識と前提関係へ整理します。" sections={[
 {id:'input',label:'INPUT',title:'学びたいことを文章で受け取る',paragraphs:['単語だけでなく、「Pythonでデータ分析を学び、前提となる統計も理解したい」のような文章を入力できます。ローカルのGemmaが学習意図を読み、代表題名、最終目標、調査観点、Wikipediaで調べる5〜10個の検索語へ分解します。']},
 {id:'collect',label:'COLLECTION',title:'Wikipedia候補を広く集めて絞る',paragraphs:['最大8個の検索語から、それぞれ最大35件の候補を取得します。本文量、候補間の被リンク数、入力テーマとのTF-IDF類似度を使って絞り込み、地名・大学・人物など学習スキルになりにくい項目を除外します。Google Trendsは日本・過去12か月の検索傾向を5件ずつ取得します。'],fact:'Google Trendsの値は収集していますが、現在のGemma中心の生成では補助情報です。最終的な知識構成を検索量だけで決めているわけではありません。'},
 {id:'build',label:'EDUCATIONAL DESIGN',title:'AIが教育的な依存関係へ変換する',paragraphs:['収集候補をGemmaへ渡し、学習して習得できる概念だけを選びます。ノードは前提・基礎・中核・応用の4レイヤーに分類し、「AがなければBを学べない」という教育的な関係だけを前提から学習先の向きで接続します。'],bullets:['ノード数：15〜25個','レイヤー：0〜3','関係の強さ：0〜1','人物名、書籍名、URL、識別子などは除外']},
 {id:'output',label:'OUTPUT',title:'検証可能なJSONとして保存する',paragraphs:['結果はノード、エッジ、生成日時、調査計画を含むJSONとして保存されます。Web画面では生成済みグラフの切り替え、ノード検索、レイヤー別表示、ノード詳細の確認ができます。このJSONを理解度推定システムとiPadアプリが読み込みます。']},
 {id:'limits',label:'LIMITATION',title:'AI生成なので専門家確認が必要',paragraphs:['JSON形式、値域、ノードIDはプログラムで検証・正規化しますが、依存関係の教育的妥当性まで自動的に保証するものではありません。分野ごとの専門家評価と、生成の再現性評価が今後必要です。']}
 ]} next={{href:'/topics/system/',label:'システム全体のつながり'}}/>}
