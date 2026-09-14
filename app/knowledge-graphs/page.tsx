import type { Metadata } from 'next';
import { PageHero, Site } from '../site';
import { KnowledgeGraphViewer } from './viewer';
import cryptography from './data/cryptographic-communication.json';
import differentiation from './data/differentiation.json';
import trigonometry from './data/trigonometry.json';

export const dynamic = 'force-static';
export const metadata: Metadata = { title: 'ナレッジグラフサンプル' };

export default function KnowledgeGraphsPage(){
 const basePath=process.env.PAGES_BASE_PATH ?? '';
 const graphs=[
  {key:'differentiation',shortTitle:'微分',download:`${basePath}/data/knowledge-graphs/differentiation.json`,data:differentiation},
  {key:'trigonometry',shortTitle:'三角関数',download:`${basePath}/data/knowledge-graphs/trigonometry.json`,data:trigonometry},
  {key:'cryptography',shortTitle:'暗号通信',download:`${basePath}/data/knowledge-graphs/cryptographic-communication.json`,data:cryptography},
 ];
 return <Site><main><PageHero eyebrow="KNOWLEDGE GRAPH SAMPLES" title="生成された学習マップを読む" lead="in_collecterが生成したJSONを、学習段階・前提知識・依存関係ごとに整理して閲覧できます。"/><section className="section alt"><div className="container"><p className="graph-note">各カードを選ぶと、その知識の説明と前後のつながりを確認できます。レイヤー番号が小さいほど、先に学ぶ基礎的な知識です。</p><KnowledgeGraphViewer graphs={graphs}/></div></section></main></Site>;
}
