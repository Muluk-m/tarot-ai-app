/**
 * Suit Symbols - 花色符号组件
 * 权杖(Wands)、圣杯(Cups)、宝剑(Swords)、金币(Pentacles)
 */

import React from 'react';
import { G, Path, Circle, Line, Rect } from 'react-native-svg';
import { CARD_COLORS } from '../../config';

export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';

interface SuitSymbolProps {
  suit: Suit;
  size?: number;
  x?: number;
  y?: number;
}

// 权杖 - 火元素
const WandSymbol: React.FC<{ size: number }> = ({ size }) => {
  const color = CARD_COLORS.elements.fire;
  const scale = size / 20;

  return (
    <G transform={`scale(${scale})`}>
      {/* 权杖主体 */}
      <Line x1="0" y1="-10" x2="0" y2="10" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      {/* 叶子装饰 */}
      <Path d="M0 -10 Q-4 -14, 0 -18 Q4 -14, 0 -10" stroke={color} strokeWidth={1} fill="none" />
      <Path d="M-3 -5 Q-7 -5, -5 -8" stroke={color} strokeWidth={1} fill="none" />
      <Path d="M3 -5 Q7 -5, 5 -8" stroke={color} strokeWidth={1} fill="none" />
      <Path d="M-3 2 Q-6 2, -4 -1" stroke={color} strokeWidth={1} fill="none" />
      <Path d="M3 2 Q6 2, 4 -1" stroke={color} strokeWidth={1} fill="none" />
    </G>
  );
};

// 圣杯 - 水元素
const CupSymbol: React.FC<{ size: number }> = ({ size }) => {
  const color = CARD_COLORS.elements.water;
  const scale = size / 20;

  return (
    <G transform={`scale(${scale})`}>
      {/* 杯身 */}
      <Path d="M-8 -8 Q-10 0, -6 8 L6 8 Q10 0, 8 -8 Z" stroke={color} strokeWidth={1.5} fill="none" />
      {/* 杯脚 */}
      <Line x1="0" y1="8" x2="0" y2="12" stroke={color} strokeWidth={1.5} />
      {/* 底座 */}
      <Path d="M-5 12 L5 12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      {/* 杯内装饰 */}
      <Path d="M-4 -4 Q0 -2, 4 -4" stroke={color} strokeWidth={0.8} fill="none" opacity={0.6} />
    </G>
  );
};

// 宝剑 - 风元素
const SwordSymbol: React.FC<{ size: number }> = ({ size }) => {
  const color = CARD_COLORS.elements.air;
  const gold = CARD_COLORS.elements.spirit;
  const scale = size / 20;

  return (
    <G transform={`scale(${scale})`}>
      {/* 剑身 */}
      <Line x1="0" y1="-12" x2="0" y2="8" stroke={color} strokeWidth={2} />
      {/* 剑尖 */}
      <Path d="M-2 -12 L0 -15 L2 -12" stroke={color} strokeWidth={1.5} fill="none" />
      {/* 护手 */}
      <Line x1="-6" y1="6" x2="6" y2="6" stroke={gold} strokeWidth={2} strokeLinecap="round" />
      {/* 剑柄 */}
      <Rect x="-2" y="8" width="4" height="6" stroke={gold} strokeWidth={1} fill="none" rx={1} />
    </G>
  );
};

// 金币/五芒星 - 土元素
const PentacleSymbol: React.FC<{ size: number }> = ({ size }) => {
  const color = CARD_COLORS.elements.earth;
  const gold = CARD_COLORS.elements.spirit;
  const scale = size / 20;

  // 五芒星路径
  const pentagramPath = () => {
    const r = 8;
    const points = [];
    for (let i = 0; i < 5; i++) {
      const angle = ((i * 144 - 90) * Math.PI) / 180;
      points.push(`${r * Math.cos(angle)},${r * Math.sin(angle)}`);
    }
    return `M${points.join(' L')} Z`;
  };

  return (
    <G transform={`scale(${scale})`}>
      {/* 外圆 */}
      <Circle cx="0" cy="0" r="10" stroke={gold} strokeWidth={1.5} fill="none" />
      {/* 五芒星 */}
      <Path d={pentagramPath()} stroke={color} strokeWidth={1.2} fill="none" />
    </G>
  );
};

export const SuitSymbol: React.FC<SuitSymbolProps> = ({ suit, size = 20, x = 0, y = 0 }) => {
  return (
    <G transform={`translate(${x}, ${y})`}>
      {suit === 'wands' && <WandSymbol size={size} />}
      {suit === 'cups' && <CupSymbol size={size} />}
      {suit === 'swords' && <SwordSymbol size={size} />}
      {suit === 'pentacles' && <PentacleSymbol size={size} />}
    </G>
  );
};

// 获取花色对应的颜色
export const getSuitColor = (suit: Suit): string => {
  switch (suit) {
    case 'wands':
      return CARD_COLORS.elements.fire;
    case 'cups':
      return CARD_COLORS.elements.water;
    case 'swords':
      return CARD_COLORS.elements.air;
    case 'pentacles':
      return CARD_COLORS.elements.earth;
  }
};

// 获取花色对应的元素
export const getSuitElement = (suit: Suit): string => {
  switch (suit) {
    case 'wands':
      return 'fire';
    case 'cups':
      return 'water';
    case 'swords':
      return 'air';
    case 'pentacles':
      return 'earth';
  }
};

export default SuitSymbol;
