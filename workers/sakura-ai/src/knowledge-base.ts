export interface KnowledgeChunk {
  id: string;
  title: string;
  url: string;
  keywords: string[];
  content: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: 'problem',
    title: '解決したい課題',
    url: '/topics/problem/',
    keywords: ['課題', '目的', '背景', 'つまずき', '学び直し', '学習ルート', '個人差'],
    content: '理解済みの範囲の無駄な復習や、前提知識が抜けたまま先へ進む問題を扱う。中心課題は、学習者ごとの知識状態と知識間の前提関係を、次に学ぶ内容の決定へ反映すること。現段階は、あらゆる分野で教育効果が確認された完成サービスではない。',
  },
  {
    id: 'goal',
    title: 'プロジェクトのゴール',
    url: '/topics/goal/',
    keywords: ['ゴール', '目標', '計画', '順序', '期限', '学習時間', '成功基準'],
    content: '学びたいテーマ、現在の理解状態、期限、利用可能な学習時間から、「なぜ今これを学ぶのか」が分かる順序付き計画を作ることが目標。評価では質問数だけでなく、弱点検出F1、理解度推定MAE、回答時間、疲労感、順序の妥当性を分けて測る。',
  },
  {
    id: 'knowledge-map',
    title: 'ナレッジグラフを作る技術',
    url: '/topics/learning-map/',
    keywords: ['ナレッジグラフ', '知識グラフ', 'Wikipedia', 'TF-IDF', 'Google Trends', 'ノード', 'エッジ', 'レイヤー', 'JSON'],
    content: '自然文の学習目標を検索語へ分解し、Wikipedia候補を本文量、被リンク数、TF-IDF類似度で絞る。Gemmaが学習可能な概念を15〜25ノード選び、前提・基礎・中核・応用の4レイヤーと前提関係へ整理してJSON保存する。形式や値域は検証するが、教育的妥当性には専門家確認が必要。Google Trendsは補助情報であり、検索量だけで構成を決めない。',
  },
  {
    id: 'system',
    title: 'システム全体のつながり',
    url: '/topics/system/',
    keywords: ['システム', '構成', '流れ', 'in_collecter', 'knowleage_estimat', 'KnowledgeTracingApp', 'iPad'],
    content: 'in_collecterが入力解析、候補収集、グラフJSON生成を担当し、knowleage_estimatが出題先選択、問題生成、回答分析、グラフ伝播を担当する。iPadアプリはプロフィール設定、回答、理解度マップ、履歴を表示する。自然文入力から最大5問の診断、結果表示までは試作済みだが、実回答による有効性検証と学習スケジュール生成は未完了。',
  },
  {
    id: 'interactive-prototype',
    title: '現行の対話型プロトタイプ',
    url: '/topics/diagnosis/',
    keywords: ['現行', 'プロトタイプ', '診断', '5問', '段階式', '優先順位', 'Gemma', '回答分析', '距離減衰'],
    content: '現行の対話型試作は、未評価、応用側レイヤー、接続数の多さの優先順位から最大5ノードを一問にまとめる。IRTや期待情報利得による選択は現行コードには未実装。Gemmaが問題を生成し、回答を理解度0〜1、確かさ0〜1、根拠へ構造化する。直接評価0.7以上は前提方向、0.3以下は応用方向へ、距離減衰0.6で弱めて伝える。5問または不確かな知識がなくなれば終了する。',
  },
  {
    id: 'giad-model',
    title: '比較実験用GIADの数理モデル',
    url: '/topics/giad-model/',
    keywords: ['GIAD', '数理', 'ベイズ', '情報利得', 'エントロピー', '4PL', '理解確率', 'グラフ伝播', 'equivalent', 'similar', 'prerequisite'],
    content: '比較実験用GIADでは各知識に理解確率pを持たせ、4パラメータ型の正答確率とベイズ則で回答後の確率を更新する。同義、類似、前提関係へ明示的な規則で弱い証拠を2回伝播する。候補問題は、期待情報利得に網羅性を加点し、重複と負担を減点して選ぶ。研究評価用の数値推定はLLMではなく明示的な数式で行う。これは現行の対話型試作とは異なる実験用実装である。',
  },
  {
    id: 'experiment',
    title: '予備実験の条件と結果',
    url: '/topics/experiment/',
    keywords: ['実験', '結果', '比較', 'F1', 'MAE', '精度', '質問削減', '微分', '三角関数', '暗号通信', 'Independent CAT', '合成'],
    content: '微分、三角関数、暗号通信で各500人分の合成回答を作り、Independent CATとGIADを最大8問で比較した。Independent CATの8問時点F1にGIADは微分6問、三角関数5問、暗号通信5問で到達し、25〜37.5%の質問削減となった。一方、8問時点のMAEはGIADが微分0.385、三角関数0.402、暗号通信0.379で、すべてIndependent CATより悪かった。弱点探索には可能性があるが、理解度全体の精度との両立は示されていない。合成回答だけの予備実験であり、人への有効性は未検証。',
  },
  {
    id: 'ipad',
    title: 'iPadアプリの実装',
    url: '/topics/ipad-app/',
    keywords: ['iPad', 'iPadOS', 'SwiftUI', 'アプリ', '画面', 'localhost', 'SVG', 'タイムアウト'],
    content: 'iPadOS 17以上の横向き専用SwiftUIクライアント。PythonバックエンドへHTTP接続し、グラフ選択、回答、出題ノード確認、理解済み・推定中・要復習・未推定の色分け、結果表示を行う。理解度マップはSVG、セッションはJSON保存できる。アプリ自身はグラフを生成せず、学習スケジュール生成も未接続。',
  },
  {
    id: 'schedule',
    title: '学習スケジュール機能',
    url: '/topics/schedule/',
    keywords: ['スケジュール', '予定', '週次', 'Planner', 'Content', 'Mental', 'LangGraph', '再計画'],
    content: '目標、期限、曜日ごとの利用可能時間、診断結果、前提関係から週次計画を作り、遅れや早期理解に応じて再計画する構想。Planner、Content、Mentalの3視点を統合する設計だが、現在は設計・開発段階であり、完成済み機能ではない。',
  },
  {
    id: 'next',
    title: '今後の展開',
    url: '/topics/next-step/',
    keywords: ['今後', '将来', '次', '改善', '実回答', '二段階', '校正', '未実装'],
    content: '今後は実回答者によるF1、MAE、回答時間、疲労感の比較、弱点探索と精密測定を分ける二段階方式、実回答による係数校正を行う。診断結果と期限・利用可能時間を組み合わせた週次計画と、進捗に応じた再計画も追加予定。',
  },
];

export function retrieveKnowledge(question: string, limit = 4): KnowledgeChunk[] {
  const normalized = question.normalize('NFKC').toLowerCase();
  const scored = knowledgeBase.map((chunk, index) => {
    let score = 0;
    for (const keyword of chunk.keywords) {
      const word = keyword.normalize('NFKC').toLowerCase();
      if (normalized.includes(word)) score += Math.max(2, word.length);
    }
    if (normalized.includes(chunk.title.toLowerCase())) score += 10;
    return { chunk, score, index };
  });

  const matches = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(item => item.chunk);

  return matches.length > 0 ? matches : [knowledgeBase[0], knowledgeBase[1], knowledgeBase[3]];
}
