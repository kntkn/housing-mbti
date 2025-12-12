'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { housingTypes, axisLabels } from '@/data/types';
import { decodeAnswers, calculateScore, ScoreResult, Answers } from '@/lib/scoring';

// サンプル結果用のダミーデータ
const sampleAnswers: Answers = Object.fromEntries(
  Array.from({ length: 72 }, (_, i) => [i + 1, Math.random() > 0.5 ? 'A' : 'B'] as [number, 'A' | 'B'])
);

export default function ResultPage() {
  const params = useParams();
  const id = params.id as string;
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id === 'sample') {
      // サンプル結果
      setResult(calculateScore(sampleAnswers));
    } else {
      // エンコードされた回答をデコード
      const answers = decodeAnswers(id);
      if (answers) {
        setResult(calculateScore(answers));
      }
    }
  }, [id]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-t-transparent rounded-full mx-auto mb-4" style={{ borderColor: 'var(--color-accent)' }} />
          <p style={{ color: 'var(--color-text-muted)' }}>結果を読み込み中...</p>
        </div>
      </div>
    );
  }

  const typeData = housingTypes[result.typeCode];

  const handleShare = () => {
    const text = `住まいMBTI：${result.typeCode}（${typeData?.name || '不明'}）
4軸：F${result.percentages.flowAnchor.left}% A${result.percentages.flowAnchor.right}% / L${result.percentages.feelSpec.left}% S${result.percentages.feelSpec.right}% / N${result.percentages.nestCity.left}% C${result.percentages.nestCity.right}% / K${result.percentages.calmUpgrade.left}% U${result.percentages.calmUpgrade.right}%
#住まいMBTI診断`;

    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const axisData = [
    {
      key: 'flowAnchor',
      ...axisLabels.FLOW_ANCHOR,
      leftValue: result.percentages.flowAnchor.left,
      rightValue: result.percentages.flowAnchor.right,
      leftColor: 'var(--color-flow)',
      rightColor: 'var(--color-anchor)',
    },
    {
      key: 'feelSpec',
      ...axisLabels.FEEL_SPEC,
      leftValue: result.percentages.feelSpec.left,
      rightValue: result.percentages.feelSpec.right,
      leftColor: 'var(--color-feel)',
      rightColor: 'var(--color-spec)',
    },
    {
      key: 'nestCity',
      ...axisLabels.NEST_CITY,
      leftValue: result.percentages.nestCity.left,
      rightValue: result.percentages.nestCity.right,
      leftColor: 'var(--color-nest)',
      rightColor: 'var(--color-city)',
    },
    {
      key: 'calmUpgrade',
      ...axisLabels.CALM_UPGRADE,
      leftValue: result.percentages.calmUpgrade.left,
      rightValue: result.percentages.calmUpgrade.right,
      leftColor: 'var(--color-calm)',
      rightColor: 'var(--color-upgrade)',
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-50" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
            ← トップへ
          </Link>
          <span className="font-bold" style={{ color: 'var(--color-text)' }}>
            診断結果
          </span>
          <Link href="/test" className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
            もう一度診断
          </Link>
        </div>
      </header>

      <main className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* 結果ヘッダー */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
              あなたの住まいMBTIは…
            </p>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-5xl md:text-6xl font-bold" style={{ color: 'var(--color-accent)' }}>
                {result.typeCode}
              </span>
            </motion.div>

            {typeData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2" style={{ color: 'var(--color-text)' }}>
                  {typeData.emoji} {typeData.name}
                </h1>
                <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
                  {typeData.oneLiner}
                </p>
              </motion.div>
            )}
          </motion.section>

          {/* 4軸チャート */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 mb-8"
          >
            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--color-text)' }}>
              4軸の割合
            </h2>

            <div className="space-y-6">
              {axisData.map((axis, i) => (
                <motion.div
                  key={axis.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="font-medium" style={{ color: axis.leftColor }}>
                      {axis.leftShort} {axis.leftValue}%
                    </span>
                    <span className="font-medium" style={{ color: axis.rightColor }}>
                      {axis.rightValue}% {axis.rightShort}
                    </span>
                  </div>
                  <div className="relative h-4 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${axis.leftValue}%` }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-0 h-full rounded-l-full"
                      style={{ background: `linear-gradient(90deg, ${axis.leftColor}, ${axis.leftColor}88)` }}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${axis.rightValue}%` }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-0 h-full rounded-r-full"
                      style={{ background: `linear-gradient(270deg, ${axis.rightColor}, ${axis.rightColor}88)` }}
                    />
                  </div>
                  <p className="text-xs text-center mt-1" style={{ color: 'var(--color-text-subtle)' }}>
                    {axis.left} ↔ {axis.right}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-center mt-6" style={{ color: 'var(--color-text-subtle)' }}>
              ※ %はこの診断内の相対値です
            </p>
          </motion.section>

          {/* タイプ詳細 */}
          {typeData && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              {/* 価値観 */}
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  💎 価値観（何を優先するか）
                </h3>
                <ul className="space-y-2">
                  {typeData.values.map((value, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: 'var(--color-accent)' }}>•</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 決め方 */}
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  🧭 決め方（判断プロセス）
                </h3>
                <p style={{ color: 'var(--color-text-muted)' }}>{typeData.decisionStyle}</p>
              </div>

              {/* 内見チェック */}
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  👀 内見で見るべき3点
                </h3>
                <ul className="space-y-3">
                  {typeData.viewingChecks.map((check, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'var(--color-secondary)', color: 'white' }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: 'var(--color-text-muted)' }}>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 地雷 */}
              <div className="card p-6" style={{ background: 'rgba(199, 91, 57, 0.05)', borderColor: 'rgba(199, 91, 57, 0.2)' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
                  ⚠️ 地雷（やりがちな失敗）
                </h3>
                <p style={{ color: 'var(--color-text)' }}>{typeData.pitfall}</p>
              </div>

              {/* 住まい条件テンプレ */}
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  🏠 相性のいい住まい条件
                </h3>
                <div className="flex flex-wrap gap-2">
                  {typeData.housingTemplate.map((template, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-sm"
                      style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)' }}
                    >
                      {template}
                    </span>
                  ))}
                </div>
              </div>

              {/* 運用スタイル */}
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  🔄 相性のいい暮らし方（運用）
                </h3>
                <ul className="space-y-2">
                  {typeData.livingOps.map((op, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: 'var(--color-secondary)' }}>✓</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 口癖 */}
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  💬 このタイプの口癖
                </h3>
                <div className="space-y-3">
                  {typeData.quotes.map((quote, i) => (
                    <p
                      key={i}
                      className="pl-4 border-l-2 italic"
                      style={{ borderColor: 'var(--color-accent)', color: 'var(--color-text-muted)' }}
                    >
                      「{quote}」
                    </p>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* シェア導線 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              結果をシェアする
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleShare} className="share-btn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                結果をシェア（X）
              </button>
              <button
                onClick={handleCopyLink}
                className="btn-secondary"
              >
                {copied ? '✓ コピーしました' : '🔗 リンクをコピー'}
              </button>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 text-center"
          >
            <div className="section-divider" />
            <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
              友達と比べると面白い！
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/test" className="btn-primary">
                もう一度診断する
              </Link>
              <Link href="/types" className="btn-secondary">
                全16タイプを見る
              </Link>
            </div>
          </motion.section>
        </div>
      </main>

      {/* フッター */}
      <footer className="py-8 px-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
            © 2024 住まいMBTI診断
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
              トップ
            </Link>
            <Link href="/types" className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
              タイプ一覧
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
