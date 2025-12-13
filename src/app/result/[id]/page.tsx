'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { housingTypes, tagLabels } from '@/data/types';
import { decodeAnswers, calculateScore, ScoreResult, Answers, getTopMatches } from '@/lib/scoring';
import TypeIllustration from '@/components/TypeIllustration';

// サンプル結果用のダミーデータ（15問）
const sampleAnswers: Answers = Object.fromEntries(
  Array.from({ length: 15 }, (_, i) => [i + 1, ['a', 'b', 'c'][Math.floor(Math.random() * 3)]])
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

  const typeData = housingTypes[result.typeId];
  const topMatches = getTopMatches(result.scores, 3);

  const handleShare = () => {
    const text = `お部屋MBTI診断の結果は…
${typeData?.emoji || '🏠'} ${typeData?.name || result.typeId}
「${typeData?.subtitle || ''}」
#お部屋MBTI診断`;

    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!typeData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center">
          <p style={{ color: 'var(--color-text-muted)' }}>タイプが見つかりません</p>
          <Link href="/test" className="btn-primary mt-4">
            診断をやり直す
          </Link>
        </div>
      </div>
    );
  }

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
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
              あなたのお部屋タイプは…
            </p>

            {/* タイプイラスト */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <TypeIllustration typeCode={result.typeId} size="lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                {typeData.name}
              </h1>
              <p className="text-lg mb-4" style={{ color: 'var(--color-accent)' }}>
                {typeData.subtitle}
              </p>

              {/* タグ表示 */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)' }}
                >
                  {tagLabels[typeData.tags.location] || typeData.tags.location}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)' }}
                >
                  {tagLabels[typeData.tags.cost] || typeData.tags.cost}
                </span>
                {typeData.tags.security === 'High' && (
                  <span
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)' }}
                  >
                    {tagLabels.High}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.section>

          {/* プロフィール */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">{typeData.emoji}</span>
              プロフィール
            </h2>
            <div className="space-y-3">
              {typeData.profile.map((line, i) => (
                <p key={i} style={{ color: 'var(--color-text-muted)' }}>
                  {line}
                </p>
              ))}
            </div>
          </motion.section>

          {/* オリエンテーショングラフ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--color-text)' }}>
              傾向グラフ
            </h2>

            <div className="space-y-6">
              {/* 立地 */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>郊外</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {typeData.orientation.location.label}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>都心</span>
                </div>
                <div className="h-4 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-subtle)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${typeData.orientation.location.value}%`,
                      background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                    }}
                  />
                </div>
              </div>

              {/* コスト */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>広さ重視</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {typeData.orientation.cost.label}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>コスパ重視</span>
                </div>
                <div className="h-4 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-subtle)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${typeData.orientation.cost.value}%`,
                      background: 'linear-gradient(90deg, #9C27B0 0%, #FF9800 100%)',
                    }}
                  />
                </div>
              </div>

              {/* ライフスタイル */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>夜型</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {typeData.orientation.lifestyle.label}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>朝型</span>
                </div>
                <div className="h-4 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-subtle)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${typeData.orientation.lifestyle.value}%`,
                      background: 'linear-gradient(90deg, #673AB7 0%, #FFC107 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* 5つの特徴 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">✨</span>
              5つの特徴
            </h2>
            <ul className="space-y-3">
              {typeData.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'var(--color-secondary)', color: 'white' }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* メッセージ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-6 mb-6"
            style={{ background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg-subtle) 100%)' }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">💌</span>
              あなたへのメッセージ
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text)' }}>
              {typeData.message}
            </p>
          </motion.section>

          {/* 相性 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card p-6 mb-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">🤝</span>
              相性のいいタイプ
            </h2>
            <div className="flex flex-wrap gap-3">
              {typeData.compatibility.good.map((typeId) => {
                const compatType = housingTypes[typeId];
                if (!compatType) return null;
                return (
                  <Link
                    key={typeId}
                    href={`/types/${typeId}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
                    style={{ background: 'var(--color-bg-subtle)' }}
                  >
                    <span className="text-xl">{compatType.emoji}</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {compatType.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            <h3 className="text-lg font-bold mt-6 mb-3" style={{ color: 'var(--color-accent)' }}>
              注意が必要なタイプ
            </h3>
            <div className="flex flex-wrap gap-3">
              {typeData.compatibility.bad.map((typeId) => {
                const compatType = housingTypes[typeId];
                if (!compatType) return null;
                return (
                  <Link
                    key={typeId}
                    href={`/types/${typeId}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
                    style={{ background: 'rgba(199, 91, 57, 0.1)' }}
                  >
                    <span className="text-xl">{compatType.emoji}</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {compatType.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.section>

          {/* 他の候補タイプ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="card p-6 mb-8"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">🎯</span>
              あなたに近いタイプ
            </h2>
            <div className="grid gap-3">
              {topMatches.slice(1).map((typeId, i) => {
                const matchType = housingTypes[typeId];
                if (!matchType) return null;
                return (
                  <Link
                    key={typeId}
                    href={`/types/${typeId}`}
                    className="flex items-center gap-4 p-3 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: 'var(--color-bg-subtle)' }}
                  >
                    <span className="text-3xl">{matchType.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold" style={{ color: 'var(--color-text)' }}>
                        {matchType.name}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {matchType.subtitle}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--color-surface)', color: 'var(--color-text-subtle)' }}>
                      #{i + 2}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.section>

          {/* シェア導線 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
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
                全24タイプを見る
              </Link>
            </div>
          </motion.section>
        </div>
      </main>

      {/* フッター */}
      <footer className="py-8 px-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
            © 2024 お部屋MBTI診断
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
