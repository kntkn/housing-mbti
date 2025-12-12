'use client';

import { motion } from 'framer-motion';

interface TypeIllustrationProps {
  typeCode: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

// タイプコードに基づいてイラストの特徴を決定
const getIllustrationConfig = (typeCode: string) => {
  const [axis1, axis2, axis3, axis4] = typeCode.split('-');

  // 基本の家の形（Flow/Anchor）
  const houseStyle = axis1 === 'F' ? 'mobile' : 'rooted';
  // 屋根の装飾（Feel/Spec）
  const roofStyle = axis2 === 'L' ? 'heart' : 'gear';
  // 周囲の環境（Nest/City）
  const envStyle = axis3 === 'N' ? 'garden' : 'buildings';
  // 煙突/装飾（Calm/Upgrade）
  const chimneyStyle = axis4 === 'K' ? 'smoke' : 'star';

  return { houseStyle, roofStyle, envStyle, chimneyStyle };
};

// サイズマップ
const sizeMap = {
  sm: { width: 80, height: 80 },
  md: { width: 120, height: 120 },
  lg: { width: 180, height: 180 },
};

export default function TypeIllustration({ typeCode, size = 'md', animate = true }: TypeIllustrationProps) {
  const config = getIllustrationConfig(typeCode);
  const { width, height } = sizeMap[size];

  // 色の設定
  const colors = {
    house: config.houseStyle === 'mobile' ? '#E8B86D' : '#6B8E6B',
    roof: config.roofStyle === 'heart' ? '#B784A7' : '#5B8FA8',
    accent: config.chimneyStyle === 'smoke' ? '#A8C5A8' : '#C9A0DC',
    env: config.envStyle === 'garden' ? '#D4A574' : '#7B9EBF',
  };

  const svgContent = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 背景円 */}
      <circle cx="50" cy="50" r="48" fill={`${colors.house}15`} />

      {/* 環境要素 */}
      {config.envStyle === 'garden' ? (
        // 庭・植物
        <g>
          <ellipse cx="20" cy="78" rx="8" ry="4" fill={colors.env} opacity="0.6" />
          <ellipse cx="80" cy="78" rx="8" ry="4" fill={colors.env} opacity="0.6" />
          <circle cx="18" cy="72" r="6" fill={colors.env} opacity="0.8" />
          <circle cx="22" cy="70" r="5" fill={colors.env} opacity="0.7" />
          <circle cx="78" cy="72" r="6" fill={colors.env} opacity="0.8" />
          <circle cx="82" cy="70" r="5" fill={colors.env} opacity="0.7" />
        </g>
      ) : (
        // ビル・街
        <g>
          <rect x="10" y="60" width="12" height="22" rx="2" fill={colors.env} opacity="0.5" />
          <rect x="78" y="55" width="12" height="27" rx="2" fill={colors.env} opacity="0.5" />
          <rect x="12" y="63" width="3" height="3" fill="white" opacity="0.8" />
          <rect x="17" y="63" width="3" height="3" fill="white" opacity="0.8" />
          <rect x="12" y="70" width="3" height="3" fill="white" opacity="0.8" />
          <rect x="80" y="58" width="3" height="3" fill="white" opacity="0.8" />
          <rect x="85" y="58" width="3" height="3" fill="white" opacity="0.8" />
          <rect x="80" y="65" width="3" height="3" fill="white" opacity="0.8" />
        </g>
      )}

      {/* 地面 */}
      <ellipse cx="50" cy="82" rx="35" ry="6" fill={colors.house} opacity="0.2" />

      {/* 家本体 */}
      {config.houseStyle === 'mobile' ? (
        // モバイルハウス（車輪付き）
        <g>
          <rect x="28" y="45" width="44" height="32" rx="4" fill={colors.house} />
          <circle cx="35" cy="80" r="5" fill="#333" />
          <circle cx="35" cy="80" r="3" fill="#666" />
          <circle cx="65" cy="80" r="5" fill="#333" />
          <circle cx="65" cy="80" r="3" fill="#666" />
          {/* 窓 */}
          <rect x="34" y="52" width="12" height="10" rx="2" fill="white" opacity="0.9" />
          <rect x="54" y="52" width="12" height="10" rx="2" fill="white" opacity="0.9" />
          {/* ドア */}
          <rect x="46" y="58" width="8" height="17" rx="2" fill={`${colors.house}cc`} />
          <circle cx="52" cy="68" r="1.5" fill="#333" />
        </g>
      ) : (
        // 固定の家
        <g>
          <rect x="30" y="48" width="40" height="34" rx="2" fill={colors.house} />
          {/* 窓 */}
          <rect x="35" y="55" width="10" height="10" rx="1" fill="white" opacity="0.9" />
          <rect x="55" y="55" width="10" height="10" rx="1" fill="white" opacity="0.9" />
          {/* 窓枠 */}
          <line x1="40" y1="55" x2="40" y2="65" stroke={colors.house} strokeWidth="1" />
          <line x1="35" y1="60" x2="45" y2="60" stroke={colors.house} strokeWidth="1" />
          <line x1="60" y1="55" x2="60" y2="65" stroke={colors.house} strokeWidth="1" />
          <line x1="55" y1="60" x2="65" y2="60" stroke={colors.house} strokeWidth="1" />
          {/* ドア */}
          <rect x="45" y="62" width="10" height="18" rx="1" fill={`${colors.house}cc`} />
          <circle cx="53" cy="72" r="1.5" fill="#333" />
          {/* 基礎 */}
          <rect x="28" y="80" width="44" height="4" rx="1" fill={`${colors.house}88`} />
        </g>
      )}

      {/* 屋根 */}
      <path
        d={config.houseStyle === 'mobile'
          ? "M25 48 L50 28 L75 48 Z"
          : "M26 50 L50 26 L74 50 Z"
        }
        fill={colors.roof}
      />

      {/* 屋根の装飾 */}
      {config.roofStyle === 'heart' ? (
        // ハートマーク
        <path
          d="M50 38 C47 35 42 35 42 40 C42 44 50 48 50 48 C50 48 58 44 58 40 C58 35 53 35 50 38"
          fill="white"
          opacity="0.9"
        />
      ) : (
        // 歯車マーク
        <g transform="translate(50, 40)">
          <circle r="5" fill="white" opacity="0.9" />
          <circle r="2" fill={colors.roof} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="-1.5"
              y="-7"
              width="3"
              height="4"
              rx="0.5"
              fill="white"
              opacity="0.9"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>
      )}

      {/* 煙突 / 装飾 */}
      {config.chimneyStyle === 'smoke' ? (
        // 煙突と煙
        <g>
          <rect x="58" y="28" width="8" height="14" rx="1" fill={`${colors.house}88`} />
          <circle cx="62" cy="22" r="3" fill={colors.accent} opacity="0.6" />
          <circle cx="65" cy="18" r="2.5" fill={colors.accent} opacity="0.4" />
          <circle cx="60" cy="16" r="2" fill={colors.accent} opacity="0.3" />
        </g>
      ) : (
        // キラキラ星
        <g>
          <path
            d="M62 22 L63.5 25 L67 25.5 L64.5 28 L65 31.5 L62 30 L59 31.5 L59.5 28 L57 25.5 L60.5 25 Z"
            fill={colors.accent}
          />
          <circle cx="38" cy="26" r="2" fill={colors.accent} opacity="0.8" />
          <circle cx="75" cy="42" r="1.5" fill={colors.accent} opacity="0.6" />
        </g>
      )}
    </svg>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {svgContent}
      </motion.div>
    );
  }

  return svgContent;
}
