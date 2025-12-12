export type Axis = 'FLOW_ANCHOR' | 'FEEL_SPEC' | 'NEST_CITY' | 'CALM_UPGRADE';
export type Pole = 'F' | 'A' | 'L' | 'S' | 'N' | 'C' | 'K' | 'U';

export interface Question {
  id: number;
  axis: Axis;
  choiceA: string;
  choiceB: string;
  scoreA: Pole;
  scoreB: Pole;
}

// 32問に厳選（各軸8問）- すべて「住まい選び」に明確フォーカス
export const questions: Question[] = [
  // Q1-Q8: Flow ↔ Anchor（住み替え派 vs 拠点派）
  { id: 1, axis: 'FLOW_ANCHOR', choiceA: '合わなければ数年で引っ越す前提で選ぶ', choiceB: '長く住み続ける未来が見えないと決めにくい', scoreA: 'F', scoreB: 'A' },
  { id: 2, axis: 'FLOW_ANCHOR', choiceA: '契約更新や引越しの手間は許容できる', choiceB: '手間が増えるなら最初から腰を据えたい', scoreA: 'F', scoreB: 'A' },
  { id: 3, axis: 'FLOW_ANCHOR', choiceA: 'その街に飽きる可能性を前提に部屋を選ぶ', choiceB: 'その街で長く暮らす可能性を前提に部屋を選ぶ', scoreA: 'F', scoreB: 'A' },
  { id: 4, axis: 'FLOW_ANCHOR', choiceA: '「一旦住んでみる」で決めることが多い', choiceB: '「最初から当たりを引きたい」と考える', scoreA: 'F', scoreB: 'A' },
  { id: 5, axis: 'FLOW_ANCHOR', choiceA: '転職・結婚などに備えて住み替えやすさを重視', choiceB: 'ライフイベントがあっても住み続けられる家を選ぶ', scoreA: 'F', scoreB: 'A' },
  { id: 6, axis: 'FLOW_ANCHOR', choiceA: '引っ越しで気分転換するのは良いこと', choiceB: '同じ場所で暮らしを整えるのが好き', scoreA: 'F', scoreB: 'A' },
  { id: 7, axis: 'FLOW_ANCHOR', choiceA: '今の生活に合えば十分', choiceB: '5年後・10年後も見越して選びたい', scoreA: 'F', scoreB: 'A' },
  { id: 8, axis: 'FLOW_ANCHOR', choiceA: '住まいは軽く構えたい', choiceB: '住まいはしっかり構えたい', scoreA: 'F', scoreB: 'A' },

  // Q9-Q16: Feel ↔ Spec（感性派 vs 条件派）
  { id: 9, axis: 'FEEL_SPEC', choiceA: '内見は体感がすべて', choiceB: '内見は確認作業（条件でほぼ決まっている）', scoreA: 'L', scoreB: 'S' },
  { id: 10, axis: 'FEEL_SPEC', choiceA: '写真や間取りより「現地の空気」で決める', choiceB: '現地に行く前に条件で絞り切る', scoreA: 'L', scoreB: 'S' },
  { id: 11, axis: 'FEEL_SPEC', choiceA: '日当たり・匂い・音などの印象で好き嫌いが決まる', choiceB: '築年・面積・駅距離など数値で合否が決まる', scoreA: 'L', scoreB: 'S' },
  { id: 12, axis: 'FEEL_SPEC', choiceA: '「なんか良い」で決断できる', choiceB: '「なぜ良いか」を説明できないと不安', scoreA: 'L', scoreB: 'S' },
  { id: 13, axis: 'FEEL_SPEC', choiceA: '条件が少し悪くても雰囲気が良ければ選ぶ', choiceB: '雰囲気が良くても条件が悪いと候補から外す', scoreA: 'L', scoreB: 'S' },
  { id: 14, axis: 'FEEL_SPEC', choiceA: '間取り図だけではピンとこない', choiceB: '間取り図でほぼ判断できる', scoreA: 'L', scoreB: 'S' },
  { id: 15, axis: 'FEEL_SPEC', choiceA: '内見でテンションが上がったら即決もあり', choiceB: '内見でテンションが上がっても冷静に比較する', scoreA: 'L', scoreB: 'S' },
  { id: 16, axis: 'FEEL_SPEC', choiceA: '生活のイメージが湧くかどうかが決め手', choiceB: '条件と数字が揃っているかが決め手', scoreA: 'L', scoreB: 'S' },

  // Q17-Q24: Nest ↔ City（家派 vs 街派）
  { id: 17, axis: 'NEST_CITY', choiceA: '家にいる時間を充実させたい', choiceB: '外（街）で過ごす時間を充実させたい', scoreA: 'N', scoreB: 'C' },
  { id: 18, axis: 'NEST_CITY', choiceA: '多少不便でも家が広い・快適な方がいい', choiceB: '多少狭くても駅近・立地が良い方がいい', scoreA: 'N', scoreB: 'C' },
  { id: 19, axis: 'NEST_CITY', choiceA: '家の快適さにお金をかけたい', choiceB: 'アクセスの良さにお金をかけたい', scoreA: 'N', scoreB: 'C' },
  { id: 20, axis: 'NEST_CITY', choiceA: '家の中の導線や居心地が気になる', choiceB: '徒歩圏の店・施設の充実度が気になる', scoreA: 'N', scoreB: 'C' },
  { id: 21, axis: 'NEST_CITY', choiceA: '休日は家でゆっくり過ごしたい', choiceB: '休日は街に出かけたい', scoreA: 'N', scoreB: 'C' },
  { id: 22, axis: 'NEST_CITY', choiceA: '家に人を呼べる余裕が欲しい', choiceB: '人とは外で会えばいいので家は最低限でOK', scoreA: 'N', scoreB: 'C' },
  { id: 23, axis: 'NEST_CITY', choiceA: '部屋の広さは満足度に直結する', choiceB: '部屋は寝られれば十分、外に出やすいのが大事', scoreA: 'N', scoreB: 'C' },
  { id: 24, axis: 'NEST_CITY', choiceA: '生活は家中心で組みたい', choiceB: '生活は街中心で組みたい', scoreA: 'N', scoreB: 'C' },

  // Q25-Q32: Calm ↔ Upgrade（安定派 vs 改善派）
  { id: 25, axis: 'CALM_UPGRADE', choiceA: '住まいのトラブル（騒音・設備故障など）は絶対避けたい', choiceB: '多少のトラブルは運用で対処できる', scoreA: 'K', scoreB: 'U' },
  { id: 26, axis: 'CALM_UPGRADE', choiceA: '管理がしっかりした物件が安心', choiceB: '自分で工夫できる余地がある物件が楽しい', scoreA: 'K', scoreB: 'U' },
  { id: 27, axis: 'CALM_UPGRADE', choiceA: '住まいは「疲れない」ことが最重要', choiceB: '住まいは「もっと良くできる」余地が欲しい', scoreA: 'K', scoreB: 'U' },
  { id: 28, axis: 'CALM_UPGRADE', choiceA: '今のままで十分満足できる', choiceB: '住みながら改善していきたい', scoreA: 'K', scoreB: 'U' },
  { id: 29, axis: 'CALM_UPGRADE', choiceA: '設備が壊れたり直したりは面倒', choiceB: '直したり整えたりするのは嫌いじゃない', scoreA: 'K', scoreB: 'U' },
  { id: 30, axis: 'CALM_UPGRADE', choiceA: '家のことにあまり時間を使いたくない', choiceB: '家のことに時間をかけるのも悪くない', scoreA: 'K', scoreB: 'U' },
  { id: 31, axis: 'CALM_UPGRADE', choiceA: 'DIYや模様替えは面倒に感じる', choiceB: 'DIYや模様替えは楽しい', scoreA: 'K', scoreB: 'U' },
  { id: 32, axis: 'CALM_UPGRADE', choiceA: '完成された物件をそのまま使いたい', choiceB: '自分好みにカスタマイズしていきたい', scoreA: 'K', scoreB: 'U' },
];

// ページごとの見出し（32問 = 8問×4ページ）
export const pageHeadings: Record<number, string> = {
  1: '住み替え派？それとも拠点派？',
  2: '感性で選ぶ？条件で選ぶ？',
  3: '家が大事？街が大事？',
  4: '安定重視？改善したい？',
};
