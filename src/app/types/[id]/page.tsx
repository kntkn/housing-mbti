'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { housingTypes, tagLabels } from '@/data/types';
import TypeIllustration from '@/components/TypeIllustration';

export default function TypeDetailPage() {
  const params = useParams();
  const typeCode = params.id as string;
  const typeData = housingTypes[typeCode];

  if (!typeData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            タイプが見つかりません
          </h1>
          <Link href="/types" className="btn-primary">
            タイプ一覧へ
          </Link>
        </div>
      </div>
    );
  }

  // タグ一覧を生成
  const allTags = [
    tagLabels[typeData.tags.location] || typeData.tags.location,
    tagLabels[typeData.tags.cost] || typeData.tags.cost,
    ...typeData.tags.lifestyle.map(t => tagLabels[t] || t),
    ...typeData.tags.building.map(t => tagLabels[t] || t),
  ];

  // 相性の良いタイプ・悪いタイプの情報を取得
  const goodTypes = typeData.compatibility.good.map(id => housingTypes[id]).filter(Boolean);
  const badTypes = typeData.compatibility.bad.map(id => housingTypes[id]).filter(Boolean);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-50" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/types" className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
            ← タイプ一覧
          </Link>
          <span className="font-bold" style={{ color: 'var(--color-text)' }}>
            {typeData.emoji} {typeData.name}
          </span>
          <Link href="/test" className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
            診断する
          </Link>
        </div>
      </header>

      <main className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* ヒーローセクション */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            {/* イラスト */}
            <div className="flex justify-center mb-6">
              <TypeIllustration typeCode={typeCode} size="lg" />
            </div>

            {/* タイプ名 */}
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              {typeData.emoji} {typeData.name}
            </h1>

            {/* サブタイトル */}
            <p className="text-lg md:text-xl mb-6" style={{ color: 'var(--color-text-muted)' }}>
              {typeData.subtitle}
            </p>

            {/* タグバッジ */}
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.slice(0, 5).map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-subtle)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.section>

          {/* プロフィール */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div
              className="card p-6 md:p-8"
              style={{ background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg-subtle) 100%)' }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                <span className="text-2xl">📖</span>
                プロフィール
              </h2>
              <div className="space-y-3">
                {typeData.profile.map((line, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 傾向グラフ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">📊</span>
              傾向グラフ
            </h2>
            <div className="space-y-6">
              {/* 立地傾向 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>立地傾向</span>
                  <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {typeData.orientation.location.label}
                  </span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-subtle)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${typeData.orientation.location.value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-secondary))' }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-subtle)' }}>
                  <span>郊外</span>
                  <span>都心</span>
                </div>
              </div>

              {/* コスト傾向 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>コスト傾向</span>
                  <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {typeData.orientation.cost.label}
                  </span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-subtle)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${typeData.orientation.cost.value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--color-secondary), var(--color-accent))' }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-subtle)' }}>
                  <span>広さ重視</span>
                  <span>コスパ重視</span>
                </div>
              </div>

              {/* ライフスタイル傾向 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>生活リズム</span>
                  <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {typeData.orientation.lifestyle.label}
                  </span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-subtle)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${typeData.orientation.lifestyle.value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #6366f1, #f59e0b)' }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-subtle)' }}>
                  <span>夜型</span>
                  <span>朝型</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 5つの特徴 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">✨</span>
              このタイプの5つの特徴
            </h2>
            <div className="grid gap-3">
              {typeData.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: 'var(--color-bg-subtle)' }}
                >
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'var(--color-secondary)', color: 'white' }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--color-text)' }}>{feature}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* メッセージ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6 md:p-8 mb-6"
            style={{ background: 'linear-gradient(135deg, var(--color-accent)08 0%, var(--color-secondary)08 100%)' }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">💬</span>
              あなたへのメッセージ
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-text)' }}
            >
              {typeData.message}
            </p>
          </motion.section>

          {/* 相性 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6 md:p-8 mb-8"
          >
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">🤝</span>
              タイプ相性
            </h2>

            {/* 相性の良いタイプ */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--color-secondary)' }}>
                💚 相性の良いタイプ
              </h3>
              <div className="grid gap-3">
                {goodTypes.map((type) => (
                  <Link key={type.id} href={`/types/${type.id}`}>
                    <div
                      className="flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-[1.02]"
                      style={{ background: 'var(--color-bg-subtle)' }}
                    >
                      <span className="text-2xl">{type.emoji}</span>
                      <div>
                        <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                          {type.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {type.subtitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 相性の悪いタイプ */}
            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--color-accent)' }}>
                💔 ちょっと苦手なタイプ
              </h3>
              <div className="grid gap-3">
                {badTypes.map((type) => (
                  <Link key={type.id} href={`/types/${type.id}`}>
                    <div
                      className="flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-[1.02]"
                      style={{ background: 'var(--color-bg-subtle)' }}
                    >
                      <span className="text-2xl">{type.emoji}</span>
                      <div>
                        <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                          {type.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {type.subtitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="section-divider" />
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              あなたもこのタイプ？
            </h3>
            <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
              15問の診断であなたのお部屋MBTIを発見しよう
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/test" className="btn-primary">
                診断をはじめる
              </Link>
              <Link href="/types" className="btn-secondary">
                他のタイプを見る
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
