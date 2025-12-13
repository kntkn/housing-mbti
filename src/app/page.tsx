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

// 動物キャラクターのサンプル表示用
const sampleAnimals = ['🦊', '🐰', '🐧', '🦉', '🐨', '🦎', '🐹', '🐶'];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFBF7 50%, #F8F6FF 100%)' }}>
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: 'rgba(255, 248, 240, 0.9)' }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
            🏠 お部屋MBTI
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/types" className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
              全24タイプ
            </Link>
          </nav>
        </div>
      </header>

      {/* ヒーロー */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={stagger}
        className="pt-28 pb-16 px-6 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* キャッチーなバッジ */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span
              className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
              }}
            >
              ⚡ たった1分で診断！
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--color-text)' }}
          >
            あなたの
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              住まい性格
            </span>
            、
            <br />
            動物でわかる🐾
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            15問のカンタン診断で、あなたにピッタリの
            <br className="hidden md:block" />
            <strong>24種類の動物タイプ</strong>を発見しよう！
          </motion.p>

          {/* 動物キャラクターのプレビュー */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex justify-center gap-2 mb-8 flex-wrap"
          >
            {sampleAnimals.map((animal, i) => (
              <motion.span
                key={i}
                className="text-3xl md:text-4xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
              >
                {animal}
              </motion.span>
            ))}
            <motion.span
              className="text-xl md:text-2xl flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              style={{ color: 'var(--color-text-muted)' }}
            >
              ...など全24種類！
            </motion.span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/test"
              className="text-lg px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                color: 'white',
                boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)'
              }}
            >
              🎯 今すぐ診断する
            </Link>
            <Link
              href="/types"
              className="text-lg px-8 py-4 rounded-full font-medium transition-all hover:scale-105"
              style={{
                background: 'white',
                color: 'var(--color-text)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
              }}
            >
              全24タイプを見る 👀
            </Link>
          </motion.div>

          {/* 補足テキスト */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-sm"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            ✨ 登録不要・完全無料 ✨
          </motion.p>
        </div>

        {/* デコレーション */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #FFE66D 0%, #FF6B6B 100%)' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-60 left-0 w-56 h-56 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)' }}
        />
      </motion.section>

      {/* どんな診断？ */}
      <section className="py-16 px-6" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-4xl mb-4 block">🤔</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              どんな診断なの？
            </h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              あなたの住まい選びの"クセ"を動物キャラで診断！
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '🎯',
                title: '15問だけ！',
                description: 'サクサク答えて約1分。直感でポンポン選ぶだけ！',
                color: '#FF6B6B',
              },
              {
                emoji: '🐾',
                title: '24種の動物タイプ',
                description: 'キツネ🦊、ウサギ🐰、ペンギン🐧...あなたはどれ？',
                color: '#4ECDC4',
              },
              {
                emoji: '📊',
                title: '傾向グラフ付き',
                description: '「都心 vs 郊外」「コスパ vs 広さ」など、あなたの傾向を可視化',
                color: '#FFE66D',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl text-center"
                style={{
                  background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}05 100%)`,
                  border: `2px solid ${item.color}30`
                }}
              >
                <span className="text-5xl mb-4 block">{item.emoji}</span>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* タイプ紹介 */}
      <section className="py-16 px-6" style={{ background: 'linear-gradient(180deg, #F8F6FF 0%, #FFF8F0 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-4xl mb-4 block">✨</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              こんなタイプがいるよ！
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '🦊', name: 'ネオン節約キツネ', desc: '都心コスパ派' },
              { emoji: '🐰', name: 'ひだまりバニー', desc: '日当たり重視' },
              { emoji: '🐧', name: 'セーフティペンギン', desc: '安全第一' },
              { emoji: '😼', name: 'ネオンナイトキャット', desc: '夜型クリエイター' },
              { emoji: '🦉', name: '夜ふかしフクロウ', desc: '静かに集中' },
              { emoji: '🐨', name: 'スローライフコアラ', desc: 'のびのび派' },
              { emoji: '🐹', name: 'ミニマルハムスター', desc: 'シンプル主義' },
              { emoji: '🐶', name: 'ペットファーストドッグ', desc: 'ペット最優先' },
            ].map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-2xl text-center"
                style={{ background: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
              >
                <span className="text-4xl block mb-2">{type.emoji}</span>
                <p className="font-bold text-sm mb-1" style={{ color: 'var(--color-text)' }}>{type.name}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{type.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              href="/types"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--color-accent)' }}
            >
              全24タイプを見る →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 診断の流れ */}
      <section className="py-16 px-6" style={{ background: 'white' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-4xl mb-4 block">📝</span>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              カンタン3ステップ
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { step: '1', emoji: '💭', title: '15問に答える', desc: '直感でサクサク選ぶだけ！悩まなくてOK' },
              { step: '2', emoji: '🎉', title: '結果発表！', desc: 'あなたの動物タイプと傾向グラフが表示' },
              { step: '3', emoji: '📤', title: 'シェアして比較', desc: '友達と結果を比べると超盛り上がる！' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 p-6 rounded-2xl"
                style={{ background: 'var(--color-bg-subtle)' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                    color: 'white'
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{item.emoji}</span>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{item.title}</h3>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFE66D 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-6xl block mb-6">🏠</span>
          <h2 className="text-2xl md:text-4xl font-bold mb-4" style={{ color: 'white' }}>
            あなたは何タイプ？
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.9)' }}>
            たった1分で、住まい選びの"本当の自分"がわかる！
          </p>
          <Link
            href="/test"
            className="inline-block text-lg px-12 py-5 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'white',
              color: '#FF6B6B',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
            }}
          >
            🎯 無料で診断スタート！
          </Link>
        </motion.div>
      </section>

      {/* フッター */}
      <footer className="py-8 px-6" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
            © 2024 お部屋MBTI診断
          </p>
          <div className="flex items-center gap-6">
            <Link href="/types" className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
              全24タイプ
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
