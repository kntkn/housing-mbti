'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { housingTypes, tagLabels } from '@/data/types';
import TypeIllustration from '@/components/TypeIllustration';

// 24タイプを4グループに分類
const typeGroups = [
  {
    title: 'コスパ戦略派',
    description: '家賃・初期費用を賢く抑えるタイプ',
    emoji: '💰',
    types: ['neon-fox', 'survive-tanuki', 'minimal-hamster', 'initial-marmot', 'share-rat', 'screening-panda'],
  },
  {
    title: '環境・空間派',
    description: '日当たり・静けさ・広さを重視するタイプ',
    emoji: '🌿',
    types: ['hidamari-bunny', 'hinatabokko-deer', 'slowlife-koala', 'mypace-sloth', 'luggage-capybara', 'lowstress-armadillo'],
  },
  {
    title: '設備・構造派',
    description: '築浅・設備・デザイン・構造にこだわるタイプ',
    emoji: '🏗️',
    types: ['check-beaver', 'retro-bear', 'smart-gorilla', 'interior-squirrel', 'safety-penguin', 'mobility-ferret'],
  },
  {
    title: 'ライフスタイル派',
    description: '独自の生活スタイルを大切にするタイプ',
    emoji: '✨',
    types: ['neon-cat', 'night-owl', 'freelance-chameleon', 'ventilation-rabbit', 'pet-dog', 'creative-goat'],
  },
];

export default function TypesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-50" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
            ← トップへ
          </Link>
          <span className="font-bold" style={{ color: 'var(--color-text)' }}>
            全24タイプ
          </span>
          <Link href="/test" className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
            診断する
          </Link>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* タイトル */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              お部屋MBTI 全24タイプ
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
              24種類の動物キャラクターで、あなたの住まい選びの傾向がわかります
            </p>
          </motion.div>

          {/* タイプグループ */}
          {typeGroups.map((group, groupIndex) => (
            <motion.section
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="mb-12"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-1 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                  <span className="text-2xl">{group.emoji}</span>
                  {group.title}
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {group.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.types.map((typeKey, i) => {
                  const typeData = housingTypes[typeKey];
                  if (!typeData) return null;

                  // タグのラベルを取得（最大3つ）
                  const displayTags = [
                    tagLabels[typeData.tags.location] || typeData.tags.location,
                    tagLabels[typeData.tags.cost] || typeData.tags.cost,
                    ...(typeData.tags.lifestyle.slice(0, 1).map(t => tagLabels[t] || t)),
                  ].slice(0, 3);

                  return (
                    <Link key={typeKey} href={`/types/${typeKey}`}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: groupIndex * 0.1 + i * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className="card p-5 cursor-pointer h-full"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <TypeIllustration typeCode={typeKey} size="sm" animate={false} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--color-text)' }}>
                              {typeData.emoji} {typeData.name}
                            </h3>
                            <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                              {typeData.subtitle}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {displayTags.map((tag, ti) => (
                                <span
                                  key={ti}
                                  className="text-xs px-2 py-1 rounded-full"
                                  style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-subtle)' }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.section>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="section-divider" />
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              あなたはどのタイプ？
            </h3>
            <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
              15問の診断であなたのお部屋MBTIを発見しよう
            </p>
            <Link href="/test" className="btn-primary">
              診断をはじめる
            </Link>
          </motion.div>
        </div>
      </main>

      {/* フッター */}
      <footer className="py-8 px-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
            © 2024 お部屋MBTI診断
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
              トップ
            </Link>
            <Link href="/test" className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
              診断する
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
