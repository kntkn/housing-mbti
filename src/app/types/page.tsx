'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { housingTypes } from '@/data/types';
import TypeIllustration from '@/components/TypeIllustration';

const typeGroups = [
  {
    title: 'Flow × Feel（住み替え × 感性）',
    description: '身軽さ重視、感性で選ぶタイプ',
    types: ['F-L-N-K', 'F-L-N-U', 'F-L-C-K', 'F-L-C-U'],
  },
  {
    title: 'Flow × Spec（住み替え × 条件）',
    description: '身軽さ重視、条件で選ぶタイプ',
    types: ['F-S-N-K', 'F-S-N-U', 'F-S-C-K', 'F-S-C-U'],
  },
  {
    title: 'Anchor × Feel（拠点 × 感性）',
    description: '拠点重視、感性で選ぶタイプ',
    types: ['A-L-N-K', 'A-L-N-U', 'A-L-C-K', 'A-L-C-U'],
  },
  {
    title: 'Anchor × Spec（拠点 × 条件）',
    description: '拠点重視、条件で選ぶタイプ',
    types: ['A-S-N-K', 'A-S-N-U', 'A-S-C-K', 'A-S-C-U'],
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
            全16タイプ
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
              住まいMBTI 全16タイプ
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
              4つの軸の組み合わせで、16タイプに分類されます
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
                <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                  {group.title}
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {group.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {group.types.map((typeKey, i) => {
                  const typeData = housingTypes[typeKey];
                  if (!typeData) return null;

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
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded"
                              style={{ background: 'var(--color-accent)', color: 'white' }}
                            >
                              {typeKey}
                            </span>
                          </div>
                          <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--color-text)' }}>
                            {typeData.name}
                          </h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                            {typeData.oneLiner}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {typeData.values.slice(0, 3).map((value, vi) => (
                              <span
                                key={vi}
                                className="text-xs px-2 py-1 rounded-full"
                                style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-subtle)' }}
                              >
                                {value}
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
              32問の診断であなたの住まいMBTIを発見しよう
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
            © 2024 住まいMBTI診断
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
