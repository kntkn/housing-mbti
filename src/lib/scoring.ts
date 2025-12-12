import { questions, Pole } from '@/data/questions';

export type Answers = Record<number, 'A' | 'B'>;

export interface ScoreResult {
  flow: number;
  anchor: number;
  feel: number;
  spec: number;
  nest: number;
  city: number;
  calm: number;
  upgrade: number;
  typeCode: string;
  percentages: {
    flowAnchor: { left: number; right: number };
    feelSpec: { left: number; right: number };
    nestCity: { left: number; right: number };
    calmUpgrade: { left: number; right: number };
  };
}

export function calculateScore(answers: Answers): ScoreResult {
  let flow = 0, anchor = 0;
  let feel = 0, spec = 0;
  let nest = 0, city = 0;
  let calm = 0, upgrade = 0;

  questions.forEach((q) => {
    const answer = answers[q.id];
    if (!answer) return;

    const pole: Pole = answer === 'A' ? q.scoreA : q.scoreB;

    switch (pole) {
      case 'F': flow++; break;
      case 'A': anchor++; break;
      case 'L': feel++; break;
      case 'S': spec++; break;
      case 'N': nest++; break;
      case 'C': city++; break;
      case 'K': calm++; break;
      case 'U': upgrade++; break;
    }
  });

  // タイプコード生成
  const axis1 = flow >= anchor ? 'F' : 'A';
  const axis2 = feel >= spec ? 'L' : 'S';
  const axis3 = nest >= city ? 'N' : 'C';
  const axis4 = calm >= upgrade ? 'K' : 'U';
  const typeCode = `${axis1}-${axis2}-${axis3}-${axis4}`;

  // パーセンテージ計算
  const percentages = {
    flowAnchor: {
      left: Math.round((flow / 18) * 100),
      right: Math.round((anchor / 18) * 100),
    },
    feelSpec: {
      left: Math.round((feel / 18) * 100),
      right: Math.round((spec / 18) * 100),
    },
    nestCity: {
      left: Math.round((nest / 18) * 100),
      right: Math.round((city / 18) * 100),
    },
    calmUpgrade: {
      left: Math.round((calm / 18) * 100),
      right: Math.round((upgrade / 18) * 100),
    },
  };

  return {
    flow, anchor, feel, spec, nest, city, calm, upgrade,
    typeCode,
    percentages,
  };
}

export function generateResultId(answers: Answers): string {
  const sortedKeys = Object.keys(answers).map(Number).sort((a, b) => a - b);
  const answerString = sortedKeys.map(k => answers[k]).join('');

  // シンプルなハッシュ生成
  let hash = 0;
  for (let i = 0; i < answerString.length; i++) {
    const char = answerString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString(36);
}

export function encodeAnswers(answers: Answers): string {
  const sortedKeys = Object.keys(answers).map(Number).sort((a, b) => a - b);
  const answerString = sortedKeys.map(k => answers[k] === 'A' ? '0' : '1').join('');

  // 72文字を12文字の16進数に変換（6ビットずつ）
  let hex = '';
  for (let i = 0; i < answerString.length; i += 4) {
    const chunk = answerString.slice(i, i + 4).padEnd(4, '0');
    hex += parseInt(chunk, 2).toString(16);
  }

  return hex;
}

export function decodeAnswers(encoded: string): Answers | null {
  try {
    let binary = '';
    for (let i = 0; i < encoded.length; i++) {
      binary += parseInt(encoded[i], 16).toString(2).padStart(4, '0');
    }

    const answers: Answers = {};
    for (let i = 0; i < 72 && i < binary.length; i++) {
      answers[i + 1] = binary[i] === '0' ? 'A' : 'B';
    }

    return answers;
  } catch {
    return null;
  }
}
