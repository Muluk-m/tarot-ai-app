/**
 * SVG Card Configuration
 * 极简线条风格塔罗牌设计规范
 */

export const SVG_CONFIG = {
  // 基础尺寸
  viewBox: '0 0 120 180',
  width: 120,
  height: 180,
  aspectRatio: 2 / 3,

  // 描边规范
  stroke: {
    primary: 2, // 主要线条
    secondary: 1.5, // 次要线条
    detail: 1, // 细节线条
    thin: 0.5, // 极细线条
  },

  // 圆角
  borderRadius: 8,

  // 内边距
  padding: 8,

  // 卡牌编号区域
  numberArea: {
    y: 165,
    radius: 8,
  },
} as const;

// 颜色系统
export const CARD_COLORS = {
  // 背景
  background: {
    primary: '#0A0E1A',
    secondary: '#151B2E',
    tertiary: '#1E2638',
  },

  // 线条颜色
  stroke: {
    white: '#F8FAFC',
    gold: '#D4AF37',
    goldLight: '#F4D03F',
    silver: '#94A3B8',
  },

  // 元素/花色颜色
  elements: {
    fire: '#EF4444', // 权杖 Wands
    water: '#22D3EE', // 圣杯 Cups
    air: '#94A3B8', // 宝剑 Swords
    earth: '#10B981', // 星币 Pentacles
    spirit: '#D4AF37', // 大阿卡纳 Major
  },

  // 辅助色
  accent: {
    purple: '#8B5CF6',
    purpleLight: '#A78BFA',
    cyan: '#22D3EE',
    cyanLight: '#67E8F9',
  },
} as const;

// 大阿卡纳渐变定义
export const MAJOR_GRADIENTS = {
  background: ['#1A0E2E', '#0A0E1A'],
  accent: ['#D4AF37', '#F4D03F'],
} as const;

// 小阿卡纳渐变定义（按花色）
export const SUIT_GRADIENTS = {
  wands: ['#1A0E0E', '#0A0E1A'], // 暖色调
  cups: ['#0E1A1E', '#0A0E1A'], // 冷色调
  swords: ['#0E0E1A', '#0A0E1A'], // 中性色调
  pentacles: ['#0E1A0E', '#0A0E1A'], // 绿色调
} as const;

// 卡牌尺寸预设
export const CARD_SIZES = {
  tiny: { width: 48, height: 72 },
  small: { width: 80, height: 120 },
  medium: { width: 120, height: 180 },
  large: { width: 160, height: 240 },
  xlarge: { width: 200, height: 300 },
} as const;

export type CardSize = keyof typeof CARD_SIZES;
export type ElementType = keyof typeof CARD_COLORS.elements;
export type SuitType = 'wands' | 'cups' | 'swords' | 'pentacles';

// 获取花色对应的元素颜色
export function getSuitColor(suit: SuitType): string {
  const suitToElement: Record<SuitType, keyof typeof CARD_COLORS.elements> = {
    wands: 'fire',
    cups: 'water',
    swords: 'air',
    pentacles: 'earth',
  };
  return CARD_COLORS.elements[suitToElement[suit]];
}

// 获取花色对应的渐变
export function getSuitGradient(suit: SuitType): readonly [string, string] {
  return SUIT_GRADIENTS[suit];
}
