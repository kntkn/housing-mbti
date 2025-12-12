'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { housingTypes, axisLabels } from '@/data/types';
import TypeIllustration from '@/components/TypeIllustration';

// タイプコードから軸情報を取得
const getAxisInfo = (typeCode: string) => {
  const [a1, a2, a3, a4] = typeCode.split('-');
  return [
    { axis: 'FLOW_ANCHOR', value: a1, label: a1 === 'F' ? axisLabels.FLOW_ANCHOR.left : axisLabels.FLOW_ANCHOR.right, short: a1 === 'F' ? 'F' : 'A', color: a1 === 'F' ? 'var(--color-flow)' : 'var(--color-anchor)' },
    { axis: 'FEEL_SPEC', value: a2, label: a2 === 'L' ? axisLabels.FEEL_SPEC.left : axisLabels.FEEL_SPEC.right, short: a2 === 'L' ? 'L' : 'S', color: a2 === 'L' ? 'var(--color-feel)' : 'var(--color-spec)' },
    { axis: 'NEST_CITY', value: a3, label: a3 === 'N' ? axisLabels.NEST_CITY.left : axisLabels.NEST_CITY.right, short: a3 === 'N' ? 'N' : 'C', color: a3 === 'N' ? 'var(--color-nest)' : 'var(--color-city)' },
    { axis: 'CALM_UPGRADE', value: a4, label: a4 === 'K' ? axisLabels.CALM_UPGRADE.left : axisLabels.CALM_UPGRADE.right, short: a4 === 'K' ? 'K' : 'U', color: a4 === 'K' ? 'var(--color-calm)' : 'var(--color-upgrade)' },
  ];
};

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

  const axisInfo = getAxisInfo(typeCode);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-50" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/types" className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
            ← タイプ一覧
          </Link>
          <span className="font-bold" style={{ color: 'var(--color-text)' }}>
            {typeCode}
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

            {/* タイプコード */}
            <span
              className="inline-block px-4 py-1.5 rounded-full text-lg font-bold mb-4"
              style={{ background: 'var(--color-accent)', color: 'white' }}
            >
              {typeCode}
            </span>

            {/* タイプ名 */}
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              {typeData.name}
            </h1>

            {/* キャッチコピー */}
            <p className="text-lg md:text-xl mb-6" style={{ color: 'var(--color-text-muted)' }}>
              {typeData.oneLiner}
            </p>

            {/* 4軸バッジ */}
            <div className="flex flex-wrap justify-center gap-2">
              {axisInfo.map((info) => (
                <span
                  key={info.axis}
                  className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ background: `${info.color}15`, color: info.color }}
                >
                  {info.short}: {info.label}
                </span>
              ))}
            </div>
          </motion.section>

          {/* 特徴カード */}
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
                <span className="text-2xl">🎯</span>
                このタイプの特徴
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {typeData.decisionStyle}
              </p>
            </div>
          </motion.section>

          {/* 価値観 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">💎</span>
              大切にしている価値観
            </h2>
            <div className="grid gap-3">
              {typeData.values.map((value, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: 'var(--color-bg-subtle)' }}
                >
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'var(--color-accent)', color: 'white' }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--color-text)' }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 内見チェックポイント */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">👀</span>
              内見で見るべき3つのポイント
            </h2>
            <div className="space-y-4">
              {typeData.viewingChecks.map((check, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{ background: 'var(--color-secondary)', color: 'white' }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 pt-2">
                    <p style={{ color: 'var(--color-text)' }}>{check}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 地雷（要注意） */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6 md:p-8 mb-6"
            style={{ background: 'rgba(199, 91, 57, 0.05)', borderColor: 'rgba(199, 91, 57, 0.2)' }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
              <span className="text-2xl">⚠️</span>
              やりがちな失敗（地雷）
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
              {typeData.pitfall}
            </p>
          </motion.section>

          {/* 相性のいい住まい条件 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">🏠</span>
              相性のいい住まい条件
            </h2>
            <div className="flex flex-wrap gap-2">
              {typeData.housingTemplate.map((template, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                >
                  {template}
                </span>
              ))}
            </div>
          </motion.section>

          {/* 暮らし方のヒント */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">🔄</span>
              相性のいい暮らし方
            </h2>
            <div className="space-y-3">
              {typeData.livingOps.map((op, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: 'var(--color-secondary)' }}>✓</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{op}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* このタイプの口癖 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card p-6 md:p-8 mb-8"
          >
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">💬</span>
              このタイプがよく言うセリフ
            </h2>
            <div className="space-y-4">
              {typeData.quotes.map((quote, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl"
                  style={{ background: 'var(--color-bg-subtle)' }}
                >
                  <p
                    className="text-lg italic"
                    style={{ color: 'var(--color-text)' }}
                  >
                    「{quote}」
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="section-divider" />
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              あなたもこのタイプ？
            </h3>
            <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
              32問の診断であなたの住まいMBTIを発見しよう
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
