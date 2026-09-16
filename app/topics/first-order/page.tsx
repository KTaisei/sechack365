import { FirstFlyerDetail } from '../../first-flyer/detail';
export const dynamic = 'force-static';
export default function Page(){return <FirstFlyerDetail number="02" title="地図を完璧にする" lead="第一回チラシでは、AI生成の理解度テストを使って知識の順序を修正する構想を示しました。" sections={[
 {id:'first',label:'FIRST EXHIBITION',title:'テストから順序を見直す構想',paragraphs:['当時の構想は、生成したグラフから理解度テストを作り、その結果を手がかりにノード間の順序を正しく推定し直すことです。チラシの「トポロジカルソート」は、前提関係に沿ってノードを並べる処理を指します。'],fact:'チラシで説明した理解度テストによる自動改善を、第一回展示の完成機能として扱わないでください。'},
 {id:'implementation',label:'IN_COLLECTER',title:'初期コードにある階層付け',paragraphs:['in_collecterの初期グラフ生成コードでは、関係を有向グラフにし、循環する関係を除外したうえで、トポロジカル順序から前提ノードの階層を計算します。これは既に与えられた関係を並べる処理で、テストから教育的に正しい関係を証明するものではありません。']},
 {id:'current',label:'CURRENT POSITION',title:'現在は教育用グラフ生成を別方式で行う',paragraphs:['現在の主パイプラインはGemmaが学習可能な概念と前提関係をJSONで生成します。順序の教育的妥当性は、プログラムの形式検証だけで保証できないため、専門家による確認が今後必要です。']}
 ]} next={{href:'/topics/first-diagnosis/',label:'つまずきのサインを読む'}}/>}
