'use client';
import { useMemo, useState } from 'react';

type Node={node_id:string;label:string;type:string;layer:number;description:string;prerequisites:string[]};
type Edge={source_id:string;target_id:string;relationship:string;description:string;weight:number};
type GraphData={graph_id:string;topic:string;created_at:string;nodes:Node[];edges:Edge[]};
type Graph={key:string;shortTitle:string;download:string;data:GraphData};
const layerNames=['基礎知識','基本概念','中核知識','応用・発展'];
const typeNames:Record<string,string>={FOUNDATIONAL:'基礎',BASIC:'基本',CORE:'中核',APPLICATION:'応用'};

export function KnowledgeGraphViewer({graphs}:{graphs:Graph[]}){
 const [graphKey,setGraphKey]=useState(graphs[0].key);
 const [query,setQuery]=useState('');
 const graph=graphs.find(item=>item.key===graphKey) ?? graphs[0];
 const [selectedId,setSelectedId]=useState(graph.data.nodes[0].node_id);
 const selected=graph.data.nodes.find(node=>node.node_id===selectedId) ?? graph.data.nodes[0];
 const nodeById=useMemo(()=>new Map(graph.data.nodes.map(node=>[node.node_id,node])),[graph]);
 const filtered=graph.data.nodes.filter(node=>(node.label+node.description).toLowerCase().includes(query.toLowerCase()));
 const incoming=graph.data.edges.filter(edge=>edge.target_id===selected.node_id);
 const outgoing=graph.data.edges.filter(edge=>edge.source_id===selected.node_id);
 const changeGraph=(key:string)=>{const next=graphs.find(item=>item.key===key) ?? graphs[0];setGraphKey(key);setSelectedId(next.data.nodes[0].node_id);setQuery('')};
 return <div className="graph-viewer">
  <div className="graph-controls"><fieldset className="graph-picker"><legend>表示する学習マップ</legend>{graphs.map(item=><button type="button" key={item.key} aria-pressed={item.key===graph.key} onClick={()=>changeGraph(item.key)}>{item.shortTitle}</button>)}</fieldset><div className="graph-search"><label htmlFor="graph-search">知識を検索</label><input id="graph-search" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="例：極限、公開鍵"/></div></div>
  <div className="graph-meta"><article><b>{graph.data.nodes.length}</b><span>知識ノード</span></article><article><b>{graph.data.edges.length}</b><span>依存関係</span></article><article><b>{new Set(graph.data.nodes.map(node=>node.layer)).size}</b><span>学習レイヤー</span></article><article><b>{new Date(graph.data.created_at).toLocaleDateString('ja-JP')}</b><span>生成日</span></article></div>
  <div className="graph-workspace"><div className="graph-layers">{layerNames.map((name,layer)=>{const nodes=filtered.filter(node=>node.layer===layer);return <section className="graph-layer" key={name}><div className="graph-layer-head"><h2>レイヤー {layer}：{name}</h2><span>{nodes.length}件</span></div>{nodes.length?<div className="graph-nodes">{nodes.map(node=><button type="button" className="graph-node" key={node.node_id} aria-pressed={node.node_id===selected.node_id} onClick={()=>setSelectedId(node.node_id)}><small>{node.node_id} / {typeNames[node.type] ?? node.type}</small>{node.label}</button>)}</div>:<div className="graph-empty">該当する知識はありません</div>}</section>})}</div>
   <aside className="graph-detail" aria-live="polite"><span className="node-type">{selected.node_id} / LAYER {selected.layer} / {typeNames[selected.type] ?? selected.type}</span><h2>{selected.label}</h2><p>{selected.description}</p><ConnectionList title="この知識の前提" edges={incoming} getLabel={edge=>nodeById.get(edge.source_id)?.label}/><ConnectionList title="この知識からつながる項目" edges={outgoing} getLabel={edge=>nodeById.get(edge.target_id)?.label}/></aside>
  </div><div className="graph-downloads"><a href={graph.download} download>表示中のJSONをダウンロード</a>{graphs.filter(item=>item.key!==graph.key).map(item=><a key={item.key} href={item.download} download>{item.shortTitle} JSON</a>)}</div>
 </div>;
}

function ConnectionList({title,edges,getLabel}:{title:string;edges:Edge[];getLabel:(edge:Edge)=>string|undefined}){
 return <div><h3>{title}</h3>{edges.length?<ul>{edges.map(edge=><li key={`${edge.source_id}-${edge.target_id}`}><b>{getLabel(edge) ?? '不明なノード'}</b><br/>{edge.relationship}：{edge.description}</li>)}</ul>:<p>該当する接続はありません。</p>}</div>;
}
