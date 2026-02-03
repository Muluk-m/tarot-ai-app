/**
 * SVG Card Type Definitions
 */

import type { CardSize } from './config';

// SVG卡牌组件通用属性
export interface CardSVGProps {
  width?: number;
  height?: number;
  size?: CardSize;
  showFrame?: boolean;
  showNumber?: boolean;
  animated?: boolean;
}

// 卡牌框架属性
export interface CardFrameProps {
  width: number;
  height: number;
  backgroundColor?: string;
  borderColor?: string;
  glowColor?: string;
  showGlow?: boolean;
  children?: React.ReactNode;
}

// 大阿卡纳卡牌组件
export interface MajorArcanaCardProps extends CardSVGProps {
  cardNumber: number; // 0-21
}

// 小阿卡纳卡牌组件
export interface MinorArcanaCardProps extends CardSVGProps {
  suit: 'wands' | 'cups' | 'swords' | 'pentacles';
  rank: 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'page' | 'knight' | 'queen' | 'king';
}

// 花色符号属性
export interface SuitSymbolProps {
  suit: 'wands' | 'cups' | 'swords' | 'pentacles';
  size?: number;
  color?: string;
  x?: number;
  y?: number;
}

// 数字牌布局属性
export interface NumberLayoutProps {
  count: number; // 1-10
  suit: 'wands' | 'cups' | 'swords' | 'pentacles';
  width: number;
  height: number;
}

// 宫廷牌人物属性
export interface CourtFigureProps {
  type: 'page' | 'knight' | 'queen' | 'king';
  suit: 'wands' | 'cups' | 'swords' | 'pentacles';
  width: number;
  height: number;
}

// 卡牌渲染器映射
export type MajorArcanaKey =
  | 'the-fool'
  | 'the-magician'
  | 'the-high-priestess'
  | 'the-empress'
  | 'the-emperor'
  | 'the-hierophant'
  | 'the-lovers'
  | 'the-chariot'
  | 'strength'
  | 'the-hermit'
  | 'wheel-of-fortune'
  | 'justice'
  | 'the-hanged-man'
  | 'death'
  | 'temperance'
  | 'the-devil'
  | 'the-tower'
  | 'the-star'
  | 'the-moon'
  | 'the-sun'
  | 'judgement'
  | 'the-world';

// 大阿卡纳编号到名称的映射
export const MAJOR_ARCANA_NAMES: Record<number, { key: MajorArcanaKey; name: string; numeral: string }> = {
  0: { key: 'the-fool', name: 'The Fool', numeral: '0' },
  1: { key: 'the-magician', name: 'The Magician', numeral: 'I' },
  2: { key: 'the-high-priestess', name: 'The High Priestess', numeral: 'II' },
  3: { key: 'the-empress', name: 'The Empress', numeral: 'III' },
  4: { key: 'the-emperor', name: 'The Emperor', numeral: 'IV' },
  5: { key: 'the-hierophant', name: 'The Hierophant', numeral: 'V' },
  6: { key: 'the-lovers', name: 'The Lovers', numeral: 'VI' },
  7: { key: 'the-chariot', name: 'The Chariot', numeral: 'VII' },
  8: { key: 'strength', name: 'Strength', numeral: 'VIII' },
  9: { key: 'the-hermit', name: 'The Hermit', numeral: 'IX' },
  10: { key: 'wheel-of-fortune', name: 'Wheel of Fortune', numeral: 'X' },
  11: { key: 'justice', name: 'Justice', numeral: 'XI' },
  12: { key: 'the-hanged-man', name: 'The Hanged Man', numeral: 'XII' },
  13: { key: 'death', name: 'Death', numeral: 'XIII' },
  14: { key: 'temperance', name: 'Temperance', numeral: 'XIV' },
  15: { key: 'the-devil', name: 'The Devil', numeral: 'XV' },
  16: { key: 'the-tower', name: 'The Tower', numeral: 'XVI' },
  17: { key: 'the-star', name: 'The Star', numeral: 'XVII' },
  18: { key: 'the-moon', name: 'The Moon', numeral: 'XVIII' },
  19: { key: 'the-sun', name: 'The Sun', numeral: 'XIX' },
  20: { key: 'judgement', name: 'Judgement', numeral: 'XX' },
  21: { key: 'the-world', name: 'The World', numeral: 'XXI' },
};
