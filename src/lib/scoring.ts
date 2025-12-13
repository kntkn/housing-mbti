import { aggregateTags } from '@/data/questions';
import { housingTypes, typeOrder } from '@/data/types';

// 回答の型（質問ID → 選択肢ID）
export type Answers = Record<number, string>;

// スコア結果
export interface ScoreResult {
  typeId: string;
  scores: Record<string, number>;
  userTags: {
    location: string[];
    cost: string[];
    lifestyle: string[];
    building: string[];
    security: string[];
    screening: string[];
  };
}

// タグのマッチング重み
const TAG_WEIGHTS = {
  location: 20,      // 立地は重要
  cost: 15,          // コストも重要
  lifestyle: 8,      // ライフスタイルは複数あるため個別重みは低め
  building: 10,      // 建物タイプ
  security: 5,       // セキュリティ
  screening: 5,      // 審査
};

// 立地のマッチング（Midは両方に部分マッチ）
function matchLocation(userLocs: string[], typeLoc: string): number {
  if (userLocs.length === 0) return 0.5; // デフォルト

  // 直接マッチ
  if (userLocs.includes(typeLoc)) return 1;

  // Midは万能（Urban/Quietどちらにも部分マッチ）
  if (userLocs.includes('Mid')) return 0.7;
  if (typeLoc === 'Mid') return 0.7;

  return 0;
}

// コストのマッチング
function matchCost(userCosts: string[], typeCost: string): number {
  if (userCosts.length === 0) return 0.5;
  if (userCosts.includes(typeCost)) return 1;
  return 0.3;
}

// ライフスタイルタグのマッチング（配列同士）
function matchLifestyle(userTags: string[], typeTags: string[]): number {
  if (userTags.length === 0) return 0.3;
  if (typeTags.length === 0) return 0.3;

  let matches = 0;
  typeTags.forEach((tag) => {
    if (userTags.includes(tag)) matches++;
  });

  // マッチ率を返す（ボーナス込み）
  const matchRate = matches / typeTags.length;
  return matchRate;
}

// 建物タグのマッチング
function matchBuilding(userTags: string[], typeTags: string[]): number {
  if (userTags.length === 0) return 0.5;
  if (typeTags.length === 0) return 0.5;

  let matches = 0;
  typeTags.forEach((tag) => {
    if (userTags.includes(tag)) matches++;
  });

  return matches / typeTags.length;
}

// セキュリティのマッチング
function matchSecurity(userSec: string[], typeSec: string): number {
  if (userSec.length === 0) return 0.5;
  if (userSec.includes(typeSec)) return 1;

  // High要求でNormalだと低い、Normal要求でHighは許容
  if (userSec.includes('High') && typeSec === 'Normal') return 0.3;
  if (userSec.includes('Normal') && typeSec === 'High') return 0.8;

  return 0.5;
}

// 審査のマッチング
function matchScreening(userScr: string[], typeScr: string): number {
  if (userScr.length === 0) return 0.5;
  if (userScr.includes(typeScr)) return 1;

  // 近いレベルは部分マッチ
  const levels = ['Low', 'Mid', 'High'];
  const userLevel = levels.findIndex((l) => userScr.includes(l));
  const typeLevel = levels.indexOf(typeScr);

  if (userLevel === -1) return 0.5;

  const diff = Math.abs(userLevel - typeLevel);
  if (diff === 1) return 0.6;
  return 0.3;
}

// 各タイプのスコアを計算
function calculateTypeScore(
  userTags: ReturnType<typeof aggregateTags>,
  typeId: string
): number {
  const typeData = housingTypes[typeId];
  if (!typeData) return 0;

  const { tags } = typeData;

  let score = 0;

  // 立地
  score += matchLocation(userTags.location, tags.location) * TAG_WEIGHTS.location;

  // コスト
  score += matchCost(userTags.cost, tags.cost) * TAG_WEIGHTS.cost;

  // ライフスタイル
  score += matchLifestyle(userTags.lifestyle, tags.lifestyle) * TAG_WEIGHTS.lifestyle * tags.lifestyle.length;

  // 建物
  score += matchBuilding(userTags.building, tags.building) * TAG_WEIGHTS.building;

  // セキュリティ
  score += matchSecurity(userTags.security, tags.security) * TAG_WEIGHTS.security;

  // 審査
  score += matchScreening(userTags.screening, tags.screening) * TAG_WEIGHTS.screening;

  return score;
}

// メインのスコア計算関数
export function calculateScore(answers: Answers): ScoreResult {
  // 回答からタグを集計
  const userTags = aggregateTags(answers);

  // 各タイプのスコアを計算
  const scores: Record<string, number> = {};
  typeOrder.forEach((typeId) => {
    scores[typeId] = calculateTypeScore(userTags, typeId);
  });

  // 最高スコアのタイプを取得
  let bestTypeId = typeOrder[0];
  let bestScore = scores[typeOrder[0]];

  typeOrder.forEach((typeId) => {
    if (scores[typeId] > bestScore) {
      bestScore = scores[typeId];
      bestTypeId = typeId;
    }
  });

  return {
    typeId: bestTypeId,
    scores,
    userTags,
  };
}

// 結果IDの生成（URLパラメータ用）
export function generateResultId(answers: Answers): string {
  const sortedKeys = Object.keys(answers).map(Number).sort((a, b) => a - b);
  const answerString = sortedKeys.map((k) => answers[k]).join('');

  let hash = 0;
  for (let i = 0; i < answerString.length; i++) {
    const char = answerString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString(36);
}

// 回答のエンコード（短縮URL用）
export function encodeAnswers(answers: Answers): string {
  const sortedKeys = Object.keys(answers).map(Number).sort((a, b) => a - b);
  // 各選択肢をa=0, b=1, c=2としてエンコード
  const encoded = sortedKeys.map((k) => {
    const val = answers[k];
    if (val === 'a') return '0';
    if (val === 'b') return '1';
    if (val === 'c') return '2';
    return '0';
  }).join('');

  // 3進数を16進数に変換
  let result = '';
  for (let i = 0; i < encoded.length; i += 3) {
    const chunk = encoded.slice(i, i + 3).padEnd(3, '0');
    const num = parseInt(chunk[0]) * 9 + parseInt(chunk[1]) * 3 + parseInt(chunk[2]);
    result += num.toString(16).padStart(2, '0');
  }

  return result;
}

// 回答のデコード
export function decodeAnswers(encoded: string): Answers | null {
  try {
    const answers: Answers = {};
    let questionIndex = 1;

    for (let i = 0; i < encoded.length; i += 2) {
      const hex = encoded.slice(i, i + 2);
      const num = parseInt(hex, 16);

      // 3桁の3進数に変換
      const d0 = Math.floor(num / 9);
      const d1 = Math.floor((num % 9) / 3);
      const d2 = num % 3;

      [d0, d1, d2].forEach((d) => {
        if (questionIndex <= 15) {
          answers[questionIndex] = d === 0 ? 'a' : d === 1 ? 'b' : 'c';
          questionIndex++;
        }
      });
    }

    return answers;
  } catch {
    return null;
  }
}

// 上位N件のマッチタイプを取得
export function getTopMatches(scores: Record<string, number>, n: number = 3): string[] {
  return typeOrder
    .slice()
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, n);
}
