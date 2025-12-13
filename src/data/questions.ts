// 15問の診断質問データ

export interface QuestionOption {
  id: string;
  text: string;
  tags: {
    location?: string;
    cost?: string;
    lifestyle?: string[];
    building?: string[];
    security?: string;
    screening?: string;
  };
}

export interface Question {
  id: number;
  category: string;
  question: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  // Q1: 立地（都心 vs 郊外）
  {
    id: 1,
    category: 'location',
    question: '住みたいエリアは、次のうちどっち派？',
    options: [
      {
        id: 'a',
        text: '駅チカ・繁華街が近い「都心」',
        tags: { location: 'Urban' },
      },
      {
        id: 'b',
        text: '静かで落ち着いた「郊外・住宅街」',
        tags: { location: 'Quiet' },
      },
      {
        id: 'c',
        text: 'どちらでもOK、バランス派',
        tags: { location: 'Mid' },
      },
    ],
  },

  // Q2: 家賃 vs 広さ
  {
    id: 2,
    category: 'cost',
    question: '家賃と広さ、どっちを優先する？',
    options: [
      {
        id: 'a',
        text: '家賃を抑えたい！狭くても安いほうがいい',
        tags: { cost: 'Rent Strict' },
      },
      {
        id: 'b',
        text: '広さ・ゆとり優先！少し高くても余裕のある部屋がいい',
        tags: { cost: 'Size Priority' },
      },
    ],
  },

  // Q3: 初期費用
  {
    id: 3,
    category: 'lifestyle',
    question: '引越しの初期費用について、当てはまるのは？',
    options: [
      {
        id: 'a',
        text: '敷金礼金0・フリーレントが絶対条件',
        tags: { lifestyle: ['Low Initial'] },
      },
      {
        id: 'b',
        text: '初期費用より月々の家賃を重視',
        tags: {},
      },
    ],
  },

  // Q4: 生活リズム
  {
    id: 4,
    category: 'lifestyle',
    question: '自分の生活リズムは？',
    options: [
      {
        id: 'a',
        text: '朝型。朝から活動する派',
        tags: {},
      },
      {
        id: 'b',
        text: '夜型。夜に集中できる・深夜帰宅が多い',
        tags: { lifestyle: ['Night Owls'] },
      },
    ],
  },

  // Q5: 日当たり
  {
    id: 5,
    category: 'lifestyle',
    question: '日当たりの重要度は？',
    options: [
      {
        id: 'a',
        text: '超重要！日差しがないと気分が沈む',
        tags: { lifestyle: ['Sunny'] },
      },
      {
        id: 'b',
        text: 'あれば嬉しいけど、そこまでこだわらない',
        tags: {},
      },
    ],
  },

  // Q6: 風通し
  {
    id: 6,
    category: 'lifestyle',
    question: '風通し・換気について、どれが近い？',
    options: [
      {
        id: 'a',
        text: '風が通らないと息が詰まる。換気重視！',
        tags: { lifestyle: ['Ventilation Priority'] },
      },
      {
        id: 'b',
        text: '特に気にしない。エアコンがあればOK',
        tags: {},
      },
    ],
  },

  // Q7: 内装・デザイン
  {
    id: 7,
    category: 'lifestyle',
    question: '内装・デザインへのこだわりは？',
    options: [
      {
        id: 'a',
        text: 'こだわりあり！見た目・雰囲気・質感が大事',
        tags: { lifestyle: ['Design Priority'] },
      },
      {
        id: 'b',
        text: '清潔ならOK。デザインより設備を優先',
        tags: { lifestyle: ['Equipment'] },
      },
      {
        id: 'c',
        text: 'どちらも気にしない',
        tags: {},
      },
    ],
  },

  // Q8: 建物の築年数
  {
    id: 8,
    category: 'building',
    question: '建物の築年数について、許容範囲は？',
    options: [
      {
        id: 'a',
        text: '築浅・新築じゃないと不安',
        tags: { building: ['Newer'] },
      },
      {
        id: 'b',
        text: 'RC造・構造がしっかりしてれば築古でもOK',
        tags: { building: ['Retro OK'], lifestyle: ['Structure Priority'] },
      },
      {
        id: 'c',
        text: 'リノベされていれば築古でも気にならない',
        tags: { building: ['Retro OK', 'Renovation'] },
      },
    ],
  },

  // Q9: ペット
  {
    id: 9,
    category: 'lifestyle',
    question: 'ペットを飼う予定はある？',
    options: [
      {
        id: 'a',
        text: 'ある！ペット可物件じゃないとダメ',
        tags: { lifestyle: ['Pets Priority'] },
      },
      {
        id: 'b',
        text: '飼わない or 飼う予定なし',
        tags: {},
      },
    ],
  },

  // Q10: 荷物の量
  {
    id: 10,
    category: 'lifestyle',
    question: '自分の荷物の量は？',
    options: [
      {
        id: 'a',
        text: '少ない！ミニマリスト寄り',
        tags: { lifestyle: ['Minimal'] },
      },
      {
        id: 'b',
        text: '多め…収納や広さがないと厳しい',
        tags: { cost: 'Size Priority' },
      },
      {
        id: 'c',
        text: '普通。特に困ってない',
        tags: {},
      },
    ],
  },

  // Q11: 静かさ・ストレス
  {
    id: 11,
    category: 'lifestyle',
    question: '騒音や周囲の環境について、どれが近い？',
    options: [
      {
        id: 'a',
        text: '騒音がストレス。静かな環境が絶対条件',
        tags: { lifestyle: ['Stress Avoidance'], location: 'Quiet' },
      },
      {
        id: 'b',
        text: '多少うるさくても気にならない',
        tags: {},
      },
    ],
  },

  // Q12: セキュリティ
  {
    id: 12,
    category: 'security',
    question: '防犯・セキュリティへのこだわりは？',
    options: [
      {
        id: 'a',
        text: 'オートロック・防犯カメラなど必須',
        tags: { security: 'High' },
      },
      {
        id: 'b',
        text: '普通でOK。治安が悪くなければ大丈夫',
        tags: { security: 'Normal' },
      },
    ],
  },

  // Q13: 移動・フットワーク
  {
    id: 13,
    category: 'lifestyle',
    question: '日常の移動について、当てはまるのは？',
    options: [
      {
        id: 'a',
        text: '移動が多い。駅近・アクセス最優先',
        tags: { lifestyle: ['Mobility Priority'], location: 'Urban' },
      },
      {
        id: 'b',
        text: '在宅多め or 移動は多くない',
        tags: {},
      },
    ],
  },

  // Q14: シェアハウス
  {
    id: 14,
    category: 'lifestyle',
    question: 'シェアハウスに住むのはアリ？',
    options: [
      {
        id: 'a',
        text: 'アリ！人と暮らすのは楽しい',
        tags: { lifestyle: ['Social'] },
      },
      {
        id: 'b',
        text: 'ナシ。一人で暮らしたい',
        tags: {},
      },
    ],
  },

  // Q15: 審査不安
  {
    id: 15,
    category: 'screening',
    question: '入居審査への不安はある？',
    options: [
      {
        id: 'a',
        text: 'ない。安定収入・保証人あり',
        tags: { screening: 'Low' },
      },
      {
        id: 'b',
        text: '少しある。転職直後・フリーランスなど',
        tags: { screening: 'Mid' },
      },
      {
        id: 'c',
        text: 'かなり不安。審査が通りやすい物件優先',
        tags: { screening: 'High' },
      },
    ],
  },
];

// ページごとの見出し（15問 = 5問×3ページ）
export const pageHeadings: Record<number, string> = {
  1: 'エリア・コスト・ライフスタイル',
  2: '住まいへのこだわり',
  3: '生活環境・審査',
};

// 回答からタグを集計する関数
export function aggregateTags(answers: Record<number, string>): {
  location: string[];
  cost: string[];
  lifestyle: string[];
  building: string[];
  security: string[];
  screening: string[];
} {
  const result = {
    location: [] as string[],
    cost: [] as string[],
    lifestyle: [] as string[],
    building: [] as string[],
    security: [] as string[],
    screening: [] as string[],
  };

  questions.forEach((q) => {
    const selectedOptionId = answers[q.id];
    if (!selectedOptionId) return;

    const selectedOption = q.options.find((opt) => opt.id === selectedOptionId);
    if (!selectedOption) return;

    const { tags } = selectedOption;

    if (tags.location) {
      result.location.push(tags.location);
    }
    if (tags.cost) {
      result.cost.push(tags.cost);
    }
    if (tags.lifestyle) {
      result.lifestyle.push(...tags.lifestyle);
    }
    if (tags.building) {
      result.building.push(...tags.building);
    }
    if (tags.security) {
      result.security.push(tags.security);
    }
    if (tags.screening) {
      result.screening.push(tags.screening);
    }
  });

  return result;
}
