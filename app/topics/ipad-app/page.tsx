import { TopicDetail } from '../../topic-detail';
export const dynamic='force-static';
export default function Page(){return <TopicDetail number="04" title="iPadアプリの実装" lead="Pythonバックエンドと接続し、グラフ選択から診断結果までを操作できるSwiftUIクライアントです。" sections={[
 {id:'environment',label:'IMPLEMENTATION',title:'iPadOS 17以上・横向き専用',paragraphs:['SwiftUIで実装し、研究用PythonバックエンドへHTTPで接続します。既定のAPIはlocalhost:8000で、実機では同一Wi-Fi上のMacのIPアドレスを設定します。Ollamaの生成を待つため、通信タイムアウトは標準180秒です。']},
 {id:'flow',label:'USER FLOW',title:'グラフ選択から診断結果まで',paragraphs:[],bullets:['in_collecterが生成したJSONを読み込む','学習者プロフィールと対象グラフを選ぶ','穴埋め・コード補完・記述式の問題へ回答する','現在の出題ノードと接続関係をグラフ上で確認する','理解済み・推定中・要復習・未推定を色分けして確認する']},
 {id:'result',label:'RESULT VIEW',title:'数値だけでなく判断根拠も表示する',paragraphs:['結果画面には出題数、推定ノード数、理解済みスキル、要復習スキル、ナレッジグラフを表示します。回答分析の根拠を展開して確認でき、理解度マップはSVG、セッション全体はJSONとして保存できます。']},
 {id:'boundary',label:'SYSTEM BOUNDARY',title:'アプリ自身はグラフを生成しない',paragraphs:['iPadアプリは既に生成されたグラフを選び、理解度推定に利用します。ナレッジグラフ生成はin_collecter、問題生成と回答分析はPythonバックエンドとOllamaが担当します。学習スケジュール作成ボタンは画面にありますが、生成機能は今後の接続対象です。']}
 ]} next={{href:'/topics/next-step/',label:'今後の展開'}}/>}
