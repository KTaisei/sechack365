import { TopicDetail } from '../topic-detail';

type Section = {id:string;label:string;title:string;paragraphs:string[];bullets?:string[];fact?:string};
export function FirstFlyerDetail({number,title,lead,sections,next}:{number:string;title:string;lead:string;sections:Section[];next:{href:string;label:string}}) {
  return <TopicDetail number={number} title={title} lead={lead} sections={sections} next={next} document="FIRST EXHIBITION FLYER" backHref="/first-flyer/" nextContext="次のチラシ項目"/>;
}
