'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, pageHeadings } from '@/data/questions';
import { calculateScore, encodeAnswers, Answers } from '@/lib/scoring';

const QUESTIONS_PER_PAGE = 5;
const TOTAL_PAGES = Math.ceil(questions.length / QUESTIONS_PER_PAGE); // 15問 ÷ 5 = 3ページ
const STORAGE_KEY = 'housing_mbti_answers_v2';

export default function TestPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // ページの質問範囲を取得
  const getPageQuestions = useCallback((page: number) => {
    const start = (page - 1) * QUESTIONS_PER_PAGE;
    const end = Math.min(start + QUESTIONS_PER_PAGE, questions.length);
    return questions.slice(start, end);
  }, []);

  const currentQuestions = getPageQuestions(currentPage);

  // localStorageから回答を復元
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Object.keys(parsed).length > 0) {
          setShowResumeModal(true);
        }
      } catch (e) {
        console.error('Failed to parse saved answers', e);
      }
    }
  }, []);

  // 回答を保存
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  const handleResume = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed);
      // 最後に回答した質問のページに移動
      const answeredIds = Object.keys(parsed).map(Number);
      const lastAnswered = Math.max(...answeredIds);
      const targetPage = Math.ceil(lastAnswered / QUESTIONS_PER_PAGE);
      setCurrentPage(targetPage);
    }
    setShowResumeModal(false);
  };

  const handleRestart = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setCurrentPage(1);
    setShowResumeModal(false);
  };

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    setShowWarning(false);
  };

  const getUnansweredCount = () => {
    return currentQuestions.filter(q => !answers[q.id]).length;
  };

  const handleNext = () => {
    const unanswered = getUnansweredCount();
    if (unanswered > 0) {
      setShowWarning(true);
      return;
    }

    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleComplete = () => {
    const totalUnanswered = questions.filter(q => !answers[q.id]).length;
    if (totalUnanswered > 0) {
      setShowWarning(true);
      return;
    }

    // スコア計算して結果ページへ
    const result = calculateScore(answers);
    const encoded = encodeAnswers(answers);
    localStorage.removeItem(STORAGE_KEY);
    router.push(`/result/${encoded}`);
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;
  const isLastPage = currentPage === TOTAL_PAGES;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* ヘッダー（固定） */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link href="/" className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
              ← 戻る
            </Link>
            <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              お部屋MBTI診断
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {answeredCount}/{questions.length}問
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="pt-24 pb-32 px-4">
        <div className="max-w-2xl mx-auto">
          {/* ページ見出し */}
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="type-badge mb-2">
              Part {currentPage} / {TOTAL_PAGES}
            </span>
            <h2 className="text-2xl font-bold mt-2" style={{ color: 'var(--color-text)' }}>
              {pageHeadings[currentPage] || '質問に答えてください'}
            </h2>
            <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
              直感で選んでください
            </p>
          </motion.div>

          {/* 質問リスト */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {currentQuestions.map((question, index) => {
                const isAnswered = !!answers[question.id];
                const selected = answers[question.id];

                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`question-card ${isAnswered ? 'selected' : ''}`}
                    style={showWarning && !isAnswered ? { borderColor: 'var(--color-accent)' } : {}}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <span
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          background: isAnswered ? 'var(--color-secondary)' : 'var(--color-bg-subtle)',
                          color: isAnswered ? 'white' : 'var(--color-text-muted)'
                        }}
                      >
                        Q{question.id}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-lg" style={{ color: 'var(--color-text)' }}>
                          {question.question}
                        </p>
                        {showWarning && !isAnswered && (
                          <span className="inline-block text-xs px-2 py-1 rounded-full mt-2" style={{ background: 'rgba(199, 91, 57, 0.1)', color: 'var(--color-accent)' }}>
                            未回答
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {question.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswer(question.id, option.id)}
                          className={`choice-btn ${selected === option.id ? 'selected' : ''}`}
                        >
                          <span className="font-bold mr-2 uppercase">{option.id}.</span>
                          {option.text}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* 警告メッセージ */}
          <AnimatePresence>
            {showWarning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 p-4 rounded-xl text-center"
                style={{ background: 'rgba(199, 91, 57, 0.1)', color: 'var(--color-accent)' }}
              >
                未回答の質問があります（あと{getUnansweredCount()}問）
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* フッターナビゲーション（固定） */}
      <footer className="fixed bottom-0 left-0 right-0 z-50" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="btn-secondary px-6"
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            ← 戻る
          </button>

          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {currentPage} / {TOTAL_PAGES}
          </span>

          {isLastPage ? (
            <button onClick={handleComplete} className="btn-primary px-6">
              診断結果を見る
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary px-6">
              次へ →
            </button>
          )}
        </div>
      </footer>

      {/* 再開モーダル */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card p-8 max-w-md w-full text-center"
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                前回の続きがあります
              </h3>
              <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
                途中までの回答がこの端末に保存されています。
                <br />
                続きから再開しますか？
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={handleResume} className="btn-primary">
                  続きから再開
                </button>
                <button onClick={handleRestart} className="btn-secondary">
                  最初からやり直す
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
