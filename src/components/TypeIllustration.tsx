'use client';

import { motion } from 'framer-motion';
import { housingTypes } from '@/data/types';

interface TypeIllustrationProps {
  typeCode: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

// タイプIDごとの背景色テーマ
const typeColors: Record<string, { bg: string; accent: string }> = {
  'neon-fox': { bg: '#FFF3E0', accent: '#FF9800' },
  'survive-tanuki': { bg: '#EFEBE9', accent: '#795548' },
  'hidamari-bunny': { bg: '#FFF8E1', accent: '#FFC107' },
  'hinatabokko-deer': { bg: '#F1F8E9', accent: '#8BC34A' },
  'check-beaver': { bg: '#E3F2FD', accent: '#2196F3' },
  'retro-bear': { bg: '#FBE9E7', accent: '#FF5722' },
  'neon-cat': { bg: '#F3E5F5', accent: '#9C27B0' },
  'night-owl': { bg: '#EDE7F6', accent: '#673AB7' },
  'safety-penguin': { bg: '#E1F5FE', accent: '#03A9F4' },
  'slowlife-koala': { bg: '#E8F5E9', accent: '#4CAF50' },
  'freelance-chameleon': { bg: '#E0F2F1', accent: '#009688' },
  'mypace-sloth': { bg: '#FFF3E0', accent: '#FF9800' },
  'smart-gorilla': { bg: '#ECEFF1', accent: '#607D8B' },
  'minimal-hamster': { bg: '#FCE4EC', accent: '#E91E63' },
  'luggage-capybara': { bg: '#FFF8E1', accent: '#FFC107' },
  'initial-marmot': { bg: '#F3E5F5', accent: '#9C27B0' },
  'interior-squirrel': { bg: '#FFEBEE', accent: '#F44336' },
  'ventilation-rabbit': { bg: '#E8F5E9', accent: '#4CAF50' },
  'mobility-ferret': { bg: '#FFF3E0', accent: '#FF9800' },
  'lowstress-armadillo': { bg: '#E0F7FA', accent: '#00BCD4' },
  'pet-dog': { bg: '#FBE9E7', accent: '#FF5722' },
  'creative-goat': { bg: '#F3E5F5', accent: '#9C27B0' },
  'share-rat': { bg: '#ECEFF1', accent: '#607D8B' },
  'screening-panda': { bg: '#FAFAFA', accent: '#424242' },
};

// サイズマップ
const sizeMap = {
  sm: { width: 80, height: 80, fontSize: 40 },
  md: { width: 120, height: 120, fontSize: 60 },
  lg: { width: 180, height: 180, fontSize: 90 },
};

export default function TypeIllustration({ typeCode, size = 'md', animate = true }: TypeIllustrationProps) {
  const typeData = housingTypes[typeCode];
  const colors = typeColors[typeCode] || { bg: '#F5F5F5', accent: '#9E9E9E' };
  const { width, height, fontSize } = sizeMap[size];

  const emoji = typeData?.emoji || '🏠';

  const content = (
    <div
      style={{
        width,
        height,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.accent}22 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 4px 20px ${colors.accent}33`,
      }}
    >
      {/* 装飾サークル */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: colors.accent,
          opacity: 0.1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: colors.accent,
          opacity: 0.08,
        }}
      />

      {/* 絵文字 */}
      <span
        style={{
          fontSize,
          lineHeight: 1,
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
        }}
        role="img"
        aria-label={typeData?.name || 'タイプ'}
      >
        {emoji}
      </span>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
