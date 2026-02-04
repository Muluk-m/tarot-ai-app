/**
 * TarotCardSVG - Unified Card Renderer
 * 统一的塔罗牌 SVG 渲染组件
 * 根据卡牌 ID 自动选择渲染大阿卡纳或小阿卡纳
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getMajorArcanaComponent } from './MajorArcana';
import { MinorArcanaCard, type MinorArcanaRank, type Suit } from './MinorArcana';
import { CardFrame } from './CardFrame';
import { CARD_SIZES, type CardSize } from './config';
import type { CardSVGProps } from './types';

interface TarotCardSVGProps extends CardSVGProps {
  cardId: number; // 0-77
  showFrame?: boolean;
}

// 将卡牌 ID (0-77) 转换为花色和等级
const parseMinorArcanaId = (id: number): { suit: Suit; rank: MinorArcanaRank } | null => {
  if (id < 22 || id > 77) return null;

  const minorId = id - 22; // 0-55
  const suitIndex = Math.floor(minorId / 14);
  const rankIndex = minorId % 14;

  const suits: Suit[] = ['wands', 'cups', 'swords', 'pentacles'];
  const ranks: MinorArcanaRank[] = [
    'ace',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'page',
    'knight',
    'queen',
    'king',
  ];

  return {
    suit: suits[suitIndex],
    rank: ranks[rankIndex],
  };
};

// 根据尺寸名称获取宽高
const getSizeValues = (size?: CardSize): { width: number; height: number } => {
  if (!size) return CARD_SIZES.medium;
  return CARD_SIZES[size];
};

export const TarotCardSVG: React.FC<TarotCardSVGProps> = ({
  cardId,
  width,
  height,
  size = 'medium',
  showFrame = false,
  showNumber = true,
  animated = false,
}) => {
  const sizeValues = getSizeValues(size);
  const finalWidth = width || sizeValues.width;
  const finalHeight = height || sizeValues.height;

  const svgProps: CardSVGProps = {
    width: finalWidth,
    height: finalHeight,
    size,
    showNumber,
    animated,
  };

  // Major Arcana (0-21)
  if (cardId >= 0 && cardId <= 21) {
    const MajorArcanaComponent = getMajorArcanaComponent(cardId);
    if (!MajorArcanaComponent) {
      console.warn(`Major Arcana card ${cardId} not found`);
      return null;
    }

    if (showFrame) {
      return (
        <View style={[styles.container, { width: finalWidth, height: finalHeight }]}>
          <CardFrame width={finalWidth} height={finalHeight}>
            <MajorArcanaComponent {...svgProps} />
          </CardFrame>
        </View>
      );
    }

    return <MajorArcanaComponent {...svgProps} />;
  }

  // Minor Arcana (22-77)
  if (cardId >= 22 && cardId <= 77) {
    const minorData = parseMinorArcanaId(cardId);
    if (!minorData) {
      console.warn(`Minor Arcana card ${cardId} not found`);
      return null;
    }

    if (showFrame) {
      return (
        <View style={[styles.container, { width: finalWidth, height: finalHeight }]}>
          <CardFrame width={finalWidth} height={finalHeight}>
            <MinorArcanaCard suit={minorData.suit} rank={minorData.rank} {...svgProps} />
          </CardFrame>
        </View>
      );
    }

    return <MinorArcanaCard suit={minorData.suit} rank={minorData.rank} {...svgProps} />;
  }

  console.warn(`Invalid card ID: ${cardId}`);
  return null;
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default TarotCardSVG;
