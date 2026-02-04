/**
 * Minor Arcana Card Component
 * 小阿卡纳通用卡牌组件
 * 根据花色和等级渲染对应的卡牌
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, SUIT_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';
import { NumberLayout, CourtFigure, SuitSymbol, getSuitColor, type Suit, type CourtRank } from './shared';

export type MinorArcanaRank = 'ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'page' | 'knight' | 'queen' | 'king';

interface MinorArcanaCardProps extends CardSVGProps {
  suit: Suit;
  rank: MinorArcanaRank;
}

// 将 rank 转换为数字
const rankToNumber = (rank: MinorArcanaRank): number | null => {
  if (rank === 'ace') return 1;
  const num = parseInt(rank, 10);
  if (!isNaN(num)) return num;
  return null; // 宫廷牌
};

// 判断是否为宫廷牌
const isCourtCard = (rank: MinorArcanaRank): rank is CourtRank => {
  return ['page', 'knight', 'queen', 'king'].includes(rank);
};

// 获取显示的等级文本
const getRankDisplay = (rank: MinorArcanaRank): string => {
  const displays: Record<MinorArcanaRank, string> = {
    ace: 'A',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10',
    page: 'P',
    knight: 'Kn',
    queen: 'Q',
    king: 'K',
  };
  return displays[rank];
};

export const MinorArcanaCard: React.FC<MinorArcanaCardProps> = ({
  suit,
  rank,
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const suitColor = getSuitColor(suit);
  const gradientColors = SUIT_GRADIENTS[suit];
  const number = rankToNumber(rank);

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id={`${suit}-${rank}-bg`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={gradientColors[0]} />
          <Stop offset="1" stopColor={gradientColors[1]} />
        </LinearGradient>
      </Defs>

      {/* 背景 */}
      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill={`url(#${suit}-${rank}-bg)`} />

      {/* 边框 */}
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={suitColor} strokeWidth={1} opacity={0.5} />

      {/* 内容 */}
      {number !== null ? (
        // 数字牌 (Ace - 10)
        <NumberLayout suit={suit} count={number} />
      ) : isCourtCard(rank) ? (
        // 宫廷牌
        <CourtFigure rank={rank} suitColor={suitColor} />
      ) : null}

      {/* 角落显示等级和花色 */}
      {showNumber && (
        <G>
          {/* 左上角 */}
          <G transform="translate(12, 20)">
            <SvgText x="0" y="0" fontSize="10" fontWeight="700" fill={suitColor} textAnchor="middle">
              {getRankDisplay(rank)}
            </SvgText>
            <G transform="translate(0, 10)">
              <SuitSymbol suit={suit} size={10} />
            </G>
          </G>

          {/* 右下角（倒置） */}
          <G transform="translate(108, 160) rotate(180)">
            <SvgText x="0" y="0" fontSize="10" fontWeight="700" fill={suitColor} textAnchor="middle">
              {getRankDisplay(rank)}
            </SvgText>
            <G transform="translate(0, 10)">
              <SuitSymbol suit={suit} size={10} />
            </G>
          </G>
        </G>
      )}
    </Svg>
  );
};

export default MinorArcanaCard;
