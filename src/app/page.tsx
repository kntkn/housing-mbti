'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: 'rgba(250, 248, 245, 0.9)' }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>
            住まいMBTI診断
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/types" className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
              タイプ一覧
            </Link>
          </nav>
        </div>
      </header>

      {/* ヒーロー */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={stagger}
        className="pt-32 pb-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* メインコピー */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{
                background: 'var(--color-bg-subtle)',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)'
              }}
            >
              32問の心理診断
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--color-text)' }}
          >
            住む家の選び方、
            <br />
            <span style={{ color: 'var(--color-accent)' }}>性格でバレる。</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            32問で&quot;住まいの本性&quot;を可視化。
            <br className="hidden md:block" />
            拠点派？身軽派？街派？巣派？
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/test" className="btn-primary text-lg px-10 py-4">
              診断をはじめる
              <span className="ml-2 opacity-70">（約3〜4分）</span>
            </Link>
            <Link href="/types" className="btn-secondary">
              全16タイプを見る
            </Link>
          </motion.div>
        </div>

        {/* デコレーション - スマホでは非表示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden md:block absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'var(--color-accent)' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="hidden md:block absolute top-40 left-10 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'var(--color-secondary)' }}
        />
      </motion.section>

      {/* 3つのベネフィット */}
      <section className="py-20 px-6" style={{ background: 'var(--color-surface)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            style={{ color: 'var(--color-text)' }}
          >
            診断で分かること
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏠',
                title: 'あなたのタイプ（16種）',
                description: '16タイプの中から、あなたの住まい選びの傾向を特定します。',
              },
              {
                icon: '📊',
                title: '4軸の割合',
                description: '「住み替え↔拠点」「感性↔条件」「巣↔街」「安定↔改善」の4軸で分析。',
              },
              {
                icon: '✓',
                title: '内見チェック＆地雷回避',
                description: 'あなたのタイプに合った内見ポイントと、避けるべき物件の特徴を提示。',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-8 text-center"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4軸の説明 */}
      <section className="py-20 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            4つの軸で住まい選びを分析
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
            style={{ color: 'var(--color-text-muted)' }}
          >
            あなたの住まい選びの傾向を4つの軸で可視化します
          </motion.p>

          <div className="grid gap-6">
            {[
              { left: 'Flow（住み替え）', right: 'Anchor（拠点）', desc: '身軽に住み替える派 vs 拠点を育てる派', colorLeft: 'var(--color-flow)', colorRight: 'var(--color-anchor)' },
              { left: 'Feel（感性）', right: 'Spec（条件）', desc: '体感・ときめきで選ぶ派 vs 条件・スペックで選ぶ派', colorLeft: 'var(--color-feel)', colorRight: 'var(--color-spec)' },
              { left: 'Nest（巣）', right: 'City（街）', desc: '家を充実させたい派 vs 街を使い倒したい派', colorLeft: 'var(--color-nest)', colorRight: 'var(--color-city)' },
              { left: 'Calm（安定）', right: 'Upgrade（改善）', desc: '平穏・安心を求める派 vs 改善・挑戦を求める派', colorLeft: 'var(--color-calm)', colorRight: 'var(--color-upgrade)' },
            ].map((axis, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold" style={{ color: axis.colorLeft }}>{axis.left}</span>
                  <span className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>↔</span>
                  <span className="font-bold" style={{ color: axis.colorRight }}>{axis.right}</span>
                </div>
                <div className="h-2 rounded-full mb-3" style={{ background: 'var(--color-border)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '50%',
                      background: `linear-gradient(90deg, ${axis.colorLeft}, ${axis.colorRight})`
                    }}
                  />
                </div>
                <p className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>{axis.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 診断のルール */}
      <section className="py-20 px-6" style={{ background: 'var(--color-surface)' }}>
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            style={{ color: 'var(--color-text)' }}
          >
            診断のルール
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <ul className="space-y-4">
              {[
                { icon: '🎯', text: 'A/Bで直感で選ぶ（悩みすぎない）' },
                { icon: '🏠', text: '住む家の話だけ（投資・利回りは除外）' },
                { icon: '💾', text: '結果は保存・共有できる' },
                { icon: '⏱️', text: '8問ごとにページ切替（全32問）' },
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-2xl">{rule.icon}</span>
                  <span className="text-lg" style={{ color: 'var(--color-text)' }}>{rule.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
            友達と比べると面白い
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
            同じ条件でも、選び方は人それぞれ。
            <br />
            あなたの&quot;住まいの本性&quot;を発見しよう。
          </p>
          <Link href="/test" className="btn-primary text-lg px-12 py-5">
            診断をはじめる
          </Link>
        </motion.div>
      </section>

      {/* フッター */}
      <footer className="py-8 px-6" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
            © 2024 住まいMBTI診断
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
              免責事項
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
