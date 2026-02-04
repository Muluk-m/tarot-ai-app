/**
 * SVG Card System Index
 * 塔罗牌 SVG 组件主入口
 */

// Configuration
export { SUIT_COLORS, CARD_DIMENSIONS } from './config';
export type { SVGSize, SVGDimensions } from './types';

// Card Frame
export { CardFrame } from './CardFrame';

// Major Arcana (22 cards)
export { MAJOR_ARCANA_COMPONENTS, getMajorArcanaComponent } from './MajorArcana';

// Minor Arcana (56 cards)
export { MinorArcanaCard, type MinorArcanaRank } from './MinorArcana';
export {
  SuitSymbol,
  getSuitColor,
  getSuitElement,
  NumberLayout,
  CourtFigure,
  type Suit,
  type CourtRank,
} from './MinorArcana';

// Unified Card Renderer
export { TarotCardSVG } from './TarotCardSVG';
