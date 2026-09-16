import { FirstFlyerDetail } from '../../first-flyer/detail';
export const dynamic = 'force-static';
export default function Page(){return <FirstFlyerDetail number="01" title="学ぶ順番を地図にする" lead="第一回展示では、Web上の情報を集めて知識のつながりを整理する構想を紹介しました。" sections={[
 {id:'idea',label:'FIRST EXHIBITION',title:'ナレッジグラフとは',paragraphs:['チラシでいう「地図」は、学ぶ概念をノード、概念間の前提関係を矢印で表したナレッジグラフです。どこから始め、何を理解してから次へ進むかを見える形にします。']},
 {id:'collect',label:'COLLECTION',title:'関連情報を集める',paragraphs:['in_collecterでは学びたいテーマからWikipediaの候補を集め、学習に役立つ語を絞り込みます。Google Trendsの検索傾向も補助情報として取得します。第一回チラシの「Web上の情報をAIが集める」という説明を、現在は入力解析・候補収集・グラフ生成の段階に分けて実装しています。']},
 {id:'boundary',label:'CURRENT POSITION',title:'集めたリンクだけで学習順序は決めない',paragraphs:['現在の主パイプラインでは、候補情報をローカルGemmaに渡し、学習できる概念と教育的な前提関係をJSONへ整理します。Wikipediaのリンクは調査の入口であり、教育的な依存関係を自動的に保証するものではありません。']}
 ]} next={{href:'/topics/first-order/',label:'地図を完璧にする'}}/>}
