import { DocumentMap } from '../document-map';

export const dynamic = 'force-static';

const areas = [
  {href:'/topics/problem/',no:'課題',title:'解決したい課題',style:{left:'9.1%',top:'8.8%',width:'40.6%',height:'11.3%'}},
  {href:'/topics/goal/',no:'ゴール',title:'プロジェクトのゴール',style:{left:'49.7%',top:'8.8%',width:'40.8%',height:'11.3%'}},
  {href:'/topics/first-map/',no:'01',title:'学ぶ順番を地図にする',style:{left:'2.5%',top:'25.4%',width:'24.2%',height:'15.2%'}},
  {href:'/topics/first-order/',no:'02',title:'地図を完璧にする',style:{left:'26.7%',top:'25.4%',width:'26.7%',height:'15.2%'}},
  {href:'/topics/first-diagnosis/',no:'03',title:'つまずきのサインを読む',style:{left:'53.4%',top:'25.4%',width:'23.5%',height:'15.2%'}},
  {href:'/topics/first-status/',no:'開発',title:'第一回展示時点の開発状況',style:{left:'23.5%',top:'41.6%',width:'74%',height:'15.7%'}},
  {href:'/topics/first-roadmap/',no:'計画',title:'これからできるようにすること',style:{left:'2.5%',top:'58.8%',width:'68%',height:'17.5%'}},
  {href:'/topics/first-demo/',no:'デモ',title:'ナレッジグラフ生成デモ',style:{left:'2.2%',top:'78.3%',width:'95.2%',height:'17.8%'}},
];

export default function Page() {
  return <DocumentMap kind="FIRST EXHIBITION / A4" title="第一回展示のチラシ" description="第一回展示で使った紙面です。8つの区画を選ぶと、当時の説明と現在の研究との関係を確認できます。" image="/exhibits/first-flyer.png" pdf="/exhibits/first-flyer.pdf" areas={areas} minWidth="680px"/>;
}
