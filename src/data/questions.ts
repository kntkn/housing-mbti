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

export const questions: Question[] = [
  // Q1-Q18: Flow ↔ Anchor
  { id: 1, axis: 'FLOW_ANCHOR', choiceA: '合わなければ数年で引っ越す前提で選ぶ', choiceB: '長く住み続ける未来が見えないと決めにくい', scoreA: 'F', scoreB: 'A' },
  { id: 2, axis: 'FLOW_ANCHOR', choiceA: '住まいは「いつでも変えられる道具」', choiceB: '住まいは「積み上げる拠点」', scoreA: 'F', scoreB: 'A' },
  { id: 3, axis: 'FLOW_ANCHOR', choiceA: '家具も荷物も軽くしておきたい', choiceB: 'モノが増えても"育つ暮らし"が好き', scoreA: 'F', scoreB: 'A' },
  { id: 4, axis: 'FLOW_ANCHOR', choiceA: '契約更新や引越しの手間は許容できる', choiceB: '手間が増えるなら最初から腰を据えたい', scoreA: 'F', scoreB: 'A' },
  { id: 5, axis: 'FLOW_ANCHOR', choiceA: 'その街に飽きる可能性を前提に選ぶ', choiceB: 'その街で歳を重ねる可能性を前提に選ぶ', scoreA: 'F', scoreB: 'A' },
  { id: 6, axis: 'FLOW_ANCHOR', choiceA: '今の自分に最適なら十分', choiceB: '将来の自分にも合うかが重要', scoreA: 'F', scoreB: 'A' },
  { id: 7, axis: 'FLOW_ANCHOR', choiceA: '「一旦住んでみる」が正解になりがち', choiceB: '「最初から当たりを引きたい」', scoreA: 'F', scoreB: 'A' },
  { id: 8, axis: 'FLOW_ANCHOR', choiceA: '変化の余白（転職・同棲など）を残したい', choiceB: '変化が来ても崩れない土台を作りたい', scoreA: 'F', scoreB: 'A' },
  { id: 9, axis: 'FLOW_ANCHOR', choiceA: '住まいに強い"意味"は要らない', choiceB: '住まいに"自分の物語"が欲しい', scoreA: 'F', scoreB: 'A' },
  { id: 10, axis: 'FLOW_ANCHOR', choiceA: '短期の満足を取りにいく', choiceB: '長期の納得を取りにいく', scoreA: 'F', scoreB: 'A' },
  { id: 11, axis: 'FLOW_ANCHOR', choiceA: '引っ越しや模様替えで気分転換したい', choiceB: '同じ場所を整えて気分を作りたい', scoreA: 'F', scoreB: 'A' },
  { id: 12, axis: 'FLOW_ANCHOR', choiceA: '今の生活圏が変わっても対応できる方がいい', choiceB: '生活圏を固定して深めたい', scoreA: 'F', scoreB: 'A' },
  { id: 13, axis: 'FLOW_ANCHOR', choiceA: '家は「選択肢の一つ」でしかない', choiceB: '家は「人生の基盤」', scoreA: 'F', scoreB: 'A' },
  { id: 14, axis: 'FLOW_ANCHOR', choiceA: '住まい選びで"決め切らない"余白が欲しい', choiceB: '住まい選びで"決め切る"安心が欲しい', scoreA: 'F', scoreB: 'A' },
  { id: 15, axis: 'FLOW_ANCHOR', choiceA: '住まいへのコミットは低めでもいい', choiceB: '住まいへのコミットは高い方がいい', scoreA: 'F', scoreB: 'A' },
  { id: 16, axis: 'FLOW_ANCHOR', choiceA: '住まいは乗り換えるのが自然', choiceB: '住まいは根を張るのが自然', scoreA: 'F', scoreB: 'A' },
  { id: 17, axis: 'FLOW_ANCHOR', choiceA: '今の気分と生活に合えばOK', choiceB: 'ライフイベントまで見越したい', scoreA: 'F', scoreB: 'A' },
  { id: 18, axis: 'FLOW_ANCHOR', choiceA: '住まいは軽く持ちたい', choiceB: '住まいは強く持ちたい', scoreA: 'F', scoreB: 'A' },

  // Q19-Q36: Feel ↔ Spec
  { id: 19, axis: 'FEEL_SPEC', choiceA: '内見は体感がすべて', choiceB: '内見は確認作業（条件でほぼ決まっている）', scoreA: 'L', scoreB: 'S' },
  { id: 20, axis: 'FEEL_SPEC', choiceA: '写真や間取りより「現地の空気」で決める', choiceB: '現地に行く前に条件で絞り切る', scoreA: 'L', scoreB: 'S' },
  { id: 21, axis: 'FEEL_SPEC', choiceA: '日当たり・匂い・音で好き嫌いが決まる', choiceB: '築年・面積・駅距離で合否が決まる', scoreA: 'L', scoreB: 'S' },
  { id: 22, axis: 'FEEL_SPEC', choiceA: '言語化できない"良さ"を信じる', choiceB: '比較できる指標を信じる', scoreA: 'L', scoreB: 'S' },
  { id: 23, axis: 'FEEL_SPEC', choiceA: '「なんか良い」で決断できる', choiceB: '「なぜ良いか」を説明できないと不安', scoreA: 'L', scoreB: 'S' },
  { id: 24, axis: 'FEEL_SPEC', choiceA: '条件が少し悪くても雰囲気が勝つ', choiceB: '雰囲気が良くても条件が悪いと落ちる', scoreA: 'L', scoreB: 'S' },
  { id: 25, axis: 'FEEL_SPEC', choiceA: '直感で候補を決めてから整合性を見る', choiceB: '条件で候補を決めてから好みを見る', scoreA: 'L', scoreB: 'S' },
  { id: 26, axis: 'FEEL_SPEC', choiceA: '住まいは"感情の回復"が最重要', choiceB: '住まいは"機能の充足"が最重要', scoreA: 'L', scoreB: 'S' },
  { id: 27, axis: 'FEEL_SPEC', choiceA: '間取り図を見てもピンとこない', choiceB: '間取り図でほぼ判断できる', scoreA: 'L', scoreB: 'S' },
  { id: 28, axis: 'FEEL_SPEC', choiceA: '現地でテンションが上がったら強い', choiceB: '現地でテンションが上がっても冷静に戻す', scoreA: 'L', scoreB: 'S' },
  { id: 29, axis: 'FEEL_SPEC', choiceA: '「唯一無二」に弱い', choiceB: '「同条件比較」に強い', scoreA: 'L', scoreB: 'S' },
  { id: 30, axis: 'FEEL_SPEC', choiceA: '音や光の"質"が気になる', choiceB: '設備や仕様の"条件"が気になる', scoreA: 'L', scoreB: 'S' },
  { id: 31, axis: 'FEEL_SPEC', choiceA: '選び方は"感性のフィット"', choiceB: '選び方は"最適解の計算"', scoreA: 'L', scoreB: 'S' },
  { id: 32, axis: 'FEEL_SPEC', choiceA: '好き嫌いが先、理由は後', choiceB: '理由が先、好き嫌いは後', scoreA: 'L', scoreB: 'S' },
  { id: 33, axis: 'FEEL_SPEC', choiceA: '生活のイメージが湧けば決めやすい', choiceB: '数字と条件が揃えば決めやすい', scoreA: 'L', scoreB: 'S' },
  { id: 34, axis: 'FEEL_SPEC', choiceA: '多少の欠点は「味」になる', choiceB: '欠点は欠点（再現性が落ちる）', scoreA: 'L', scoreB: 'S' },
  { id: 35, axis: 'FEEL_SPEC', choiceA: '部屋の"空気感"にお金を払う', choiceB: '部屋の"スペック"にお金を払う', scoreA: 'L', scoreB: 'S' },
  { id: 36, axis: 'FEEL_SPEC', choiceA: '直感は重要なデータ', choiceB: '直感はノイズになりうる', scoreA: 'L', scoreB: 'S' },

  // Q37-Q54: Nest ↔ City
  { id: 37, axis: 'NEST_CITY', choiceA: '家にいる時間が一番大事', choiceB: '外（街）にいる時間が一番大事', scoreA: 'N', scoreB: 'C' },
  { id: 38, axis: 'NEST_CITY', choiceA: '家が充実すると人生が整う', choiceB: '街が充実すると人生が整う', scoreA: 'N', scoreB: 'C' },
  { id: 39, axis: 'NEST_CITY', choiceA: '家の中で趣味や休息を完結させたい', choiceB: '街の店や施設で完結させたい', scoreA: 'N', scoreB: 'C' },
  { id: 40, axis: 'NEST_CITY', choiceA: '多少不便でも家が良ければ耐えられる', choiceB: '多少狭くても立地が良ければ耐えられる', scoreA: 'N', scoreB: 'C' },
  { id: 41, axis: 'NEST_CITY', choiceA: '家の快適さに投資したい', choiceB: 'アクセスの良さに投資したい', scoreA: 'N', scoreB: 'C' },
  { id: 42, axis: 'NEST_CITY', choiceA: '帰宅後に「家が最高」だと幸福', choiceB: '外出がスムーズだと幸福', scoreA: 'N', scoreB: 'C' },
  { id: 43, axis: 'NEST_CITY', choiceA: '家の中の導線や居心地が気になる', choiceB: '徒歩圏の選択肢（店・ジム等）が気になる', scoreA: 'N', scoreB: 'C' },
  { id: 44, axis: 'NEST_CITY', choiceA: '家は"世界"', choiceB: '街は"世界"', scoreA: 'N', scoreB: 'C' },
  { id: 45, axis: 'NEST_CITY', choiceA: '休日は家で回復したい', choiceB: '休日は街で刺激を得たい', scoreA: 'N', scoreB: 'C' },
  { id: 46, axis: 'NEST_CITY', choiceA: '在宅作業が捗る家が欲しい', choiceB: '外作業が捗る街が欲しい', scoreA: 'N', scoreB: 'C' },
  { id: 47, axis: 'NEST_CITY', choiceA: '家に人を呼べる余白が欲しい', choiceB: '人とは外で会えばいい', scoreA: 'N', scoreB: 'C' },
  { id: 48, axis: 'NEST_CITY', choiceA: '眺望や静けさは家でこだわる', choiceB: '眺望や静けさは外で取りにいく', scoreA: 'N', scoreB: 'C' },
  { id: 49, axis: 'NEST_CITY', choiceA: '家のサイズは満足度に直結する', choiceB: '家のサイズは最低限でいい', scoreA: 'N', scoreB: 'C' },
  { id: 50, axis: 'NEST_CITY', choiceA: '家の中の体験を作り込みたい', choiceB: '街の中の体験を使い倒したい', scoreA: 'N', scoreB: 'C' },
  { id: 51, axis: 'NEST_CITY', choiceA: '家に"居場所"が必要', choiceB: '街に"居場所"が必要', scoreA: 'N', scoreB: 'C' },
  { id: 52, axis: 'NEST_CITY', choiceA: '家の中の気分転換が重要', choiceB: '街で気分転換できることが重要', scoreA: 'N', scoreB: 'C' },
  { id: 53, axis: 'NEST_CITY', choiceA: '生活は家中心で組みたい', choiceB: '生活は街中心で組みたい', scoreA: 'N', scoreB: 'C' },
  { id: 54, axis: 'NEST_CITY', choiceA: '家は長く居る場所', choiceB: '家は戻る場所', scoreA: 'N', scoreB: 'C' },

  // Q55-Q72: Calm ↔ Upgrade
  { id: 55, axis: 'CALM_UPGRADE', choiceA: '面倒ごとは極力避けたい', choiceB: '多少の手間は改善のためならOK', scoreA: 'K', scoreB: 'U' },
  { id: 56, axis: 'CALM_UPGRADE', choiceA: 'トラブルが起きにくい方が正義', choiceB: 'トラブルを解決して前に進むのも嫌いじゃない', scoreA: 'K', scoreB: 'U' },
  { id: 57, axis: 'CALM_UPGRADE', choiceA: '管理規約・近隣・騒音は徹底的に避けたい', choiceB: '多少の癖は運用で吸収できる', scoreA: 'K', scoreB: 'U' },
  { id: 58, axis: 'CALM_UPGRADE', choiceA: '住まいは"疲れない"が最重要', choiceB: '住まいは"伸びる余地"が重要', scoreA: 'K', scoreB: 'U' },
  { id: 59, axis: 'CALM_UPGRADE', choiceA: '手間より安心を買いたい', choiceB: '安心は自分で作れる', scoreA: 'K', scoreB: 'U' },
  { id: 60, axis: 'CALM_UPGRADE', choiceA: '現状維持で満足できる', choiceB: '改善して満足を上げたい', scoreA: 'K', scoreB: 'U' },
  { id: 61, axis: 'CALM_UPGRADE', choiceA: '変化より安定が好き', choiceB: '安定より成長が好き', scoreA: 'K', scoreB: 'U' },
  { id: 62, axis: 'CALM_UPGRADE', choiceA: '設備が壊れる・直すのが嫌', choiceB: '直す・整えるのは嫌いじゃない', scoreA: 'K', scoreB: 'U' },
  { id: 63, axis: 'CALM_UPGRADE', choiceA: '余計な選択肢は少ない方がいい', choiceB: '選択肢が多い方が楽しい', scoreA: 'K', scoreB: 'U' },
  { id: 64, axis: 'CALM_UPGRADE', choiceA: 'シンプルで手間の少ない暮らしが理想', choiceB: '試行錯誤がある暮らしが理想', scoreA: 'K', scoreB: 'U' },
  { id: 65, axis: 'CALM_UPGRADE', choiceA: '家のことに時間を使いたくない', choiceB: '家のことに時間を使ってもいい', scoreA: 'K', scoreB: 'U' },
  { id: 66, axis: 'CALM_UPGRADE', choiceA: 'DIYや模様替えはストレスになりがち', choiceB: 'DIYや模様替えは楽しい', scoreA: 'K', scoreB: 'U' },
  { id: 67, axis: 'CALM_UPGRADE', choiceA: '運用コスト（手間）が増えるならNO', choiceB: '運用コストが増えても価値が上がるならYES', scoreA: 'K', scoreB: 'U' },
  { id: 68, axis: 'CALM_UPGRADE', choiceA: '生活は"守り"が強いほど良い', choiceB: '生活は"攻め"があるほど面白い', scoreA: 'K', scoreB: 'U' },
  { id: 69, axis: 'CALM_UPGRADE', choiceA: '想定外が起きると消耗する', choiceB: '想定外が起きると学びになる', scoreA: 'K', scoreB: 'U' },
  { id: 70, axis: 'CALM_UPGRADE', choiceA: 'とにかく平穏がほしい', choiceB: 'ときどき刺激がほしい', scoreA: 'K', scoreB: 'U' },
  { id: 71, axis: 'CALM_UPGRADE', choiceA: '住まいは完成されたものを買いたい', choiceB: '住まいは完成に向けて作っていきたい', scoreA: 'K', scoreB: 'U' },
  { id: 72, axis: 'CALM_UPGRADE', choiceA: '住まいで守りを固めたい', choiceB: '住まいで挑戦を支えたい', scoreA: 'K', scoreB: 'U' },
];

// ページごとの見出し
export const pageHeadings: Record<number, string> = {
  1: '住み替え派？拠点派？',
  2: '住み替え派？拠点派？',
  3: '感性？条件？',
  4: '感性？条件？',
  5: '家派？街派？',
  6: '家派？街派？',
  7: '安定？改善？',
  8: 'ラスト2問！',
};
