import { DocumentMap } from '../document-map';
export const dynamic='force-static';
const areas=[
 {href:'/topics/diagnosis/',no:'01',title:'答えるたびに理解度を更新する仕組み',style:{left:'3.6%',top:'7.4%',width:'92.8%',height:'20%'}},{href:'/topics/giad-model/',no:'02',title:'使用技術と、開発したモデルの内部',style:{left:'3.6%',top:'27.8%',width:'92.8%',height:'27.5%'}},{href:'/topics/experiment/',no:'03',title:'予備実験のデータと今後',style:{left:'3.6%',top:'55.7%',width:'92.8%',height:'42.8%'}},
];
export default function Page(){return <DocumentMap kind="FLYER / A4" title="技術詳細チラシ" description="実際のA4チラシ全体を表示しています。01〜03の各セクションを直接選択できます。" image="/exhibits/research-flyer.png" pdf="/exhibits/research-flyer.pdf" areas={areas} minWidth="620px"/>}
