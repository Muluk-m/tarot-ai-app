/**
 * Court Figure Components
 * 宫廷牌人物：侍从、骑士、皇后、国王
 */

import React from 'react';
import { G, Path, Circle, Line, Rect } from 'react-native-svg';
import { CARD_COLORS } from '../../config';

export type CourtRank = 'page' | 'knight' | 'queen' | 'king';

interface CourtFigureProps {
  rank: CourtRank;
  suitColor: string;
}

// 侍从 - 年轻站立的人物
const PageFigure: React.FC<{ color: string }> = ({ color }) => {
  const stroke = CARD_COLORS.stroke;

  return (
    <G transform="translate(60, 75)">
      {/* 头部 */}
      <Circle cx="0" cy="0" r="10" fill="none" stroke={stroke.white} strokeWidth={2} />
      {/* 帽子 */}
      <Path d="M-10 -5 Q-8 -15, 0 -12 Q8 -15, 10 -5" stroke={color} strokeWidth={1.5} fill="none" />
      <Circle cx="5" cy="-15" r="3" fill="none" stroke={color} strokeWidth={1} />

      {/* 身体 */}
      <Path d="M0 10 L0 50" stroke={stroke.white} strokeWidth={2} fill="none" />

      {/* 服装轮廓 */}
      <Path
        d="M-15 20 Q-18 40, -12 60 L12 60 Q18 40, 15 20"
        stroke={stroke.white}
        strokeWidth={1.5}
        fill="none"
      />

      {/* 手臂 */}
      <Path d="M0 20 L-20 35" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      <Path d="M0 20 L20 30" stroke={stroke.white} strokeWidth={1.5} fill="none" />

      {/* 腿 */}
      <Path d="M0 60 L-8 85" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      <Path d="M0 60 L8 85" stroke={stroke.white} strokeWidth={1.5} fill="none" />

      {/* 花色装饰（胸前） */}
      <Circle cx="0" cy="30" r="5" fill="none" stroke={color} strokeWidth={1.5} />
    </G>
  );
};

// 骑士 - 骑马的人物
const KnightFigure: React.FC<{ color: string }> = ({ color }) => {
  const stroke = CARD_COLORS.stroke;

  return (
    <G transform="translate(60, 55)">
      {/* 骑士头部 */}
      <Circle cx="-5" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />
      {/* 头盔 */}
      <Path
        d="M-13 -5 Q-10 -15, -5 -12 Q0 -15, 3 -5"
        stroke={stroke.silver}
        strokeWidth={1.5}
        fill="none"
      />
      {/* 头盔羽毛 */}
      <Path d="M-5 -12 Q0 -22, 5 -15" stroke={color} strokeWidth={1.5} fill="none" />

      {/* 骑士身体 */}
      <Path d="M-5 8 L-5 30" stroke={stroke.white} strokeWidth={2} fill="none" />
      {/* 盔甲 */}
      <Rect
        x="-15"
        y="12"
        width="20"
        height="18"
        fill="none"
        stroke={stroke.silver}
        strokeWidth={1.5}
        rx={2}
      />

      {/* 手臂持剑/杖 */}
      <Path d="M5 18 L25 10" stroke={stroke.white} strokeWidth={1.5} fill="none" />

      {/* 马 */}
      <G transform="translate(5, 50)">
        {/* 马头 */}
        <Path
          d="M-30 -15 Q-35 -25, -25 -28 Q-15 -25, -20 -15"
          stroke={stroke.white}
          strokeWidth={1.5}
          fill="none"
        />
        {/* 马身 */}
        <Path
          d="M-20 -12 Q0 -18, 20 -12 Q30 -5, 25 10 L-25 10 Q-30 -5, -20 -12"
          stroke={stroke.white}
          strokeWidth={1.5}
          fill="none"
        />
        {/* 马腿 */}
        <Line x1="-20" y1="10" x2="-25" y2="35" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="-5" y1="10" x2="0" y2="35" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="10" y1="10" x2="15" y2="35" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="20" y1="10" x2="25" y2="35" stroke={stroke.white} strokeWidth={1.5} />
        {/* 马鬃 */}
        <Path d="M-20 -18 Q-15 -22, -10 -18" stroke={color} strokeWidth={1} fill="none" />
      </G>
    </G>
  );
};

// 皇后 - 坐在宝座上的女性
const QueenFigure: React.FC<{ color: string }> = ({ color }) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <G transform="translate(60, 60)">
      {/* 头部 */}
      <Circle cx="0" cy="0" r="10" fill="none" stroke={stroke.white} strokeWidth={2} />
      {/* 王冠 */}
      <Path
        d="M-10 -8 L-8 -18 L-4 -12 L0 -20 L4 -12 L8 -18 L10 -8"
        stroke={gold}
        strokeWidth={1.5}
        fill="none"
      />

      {/* 头发 */}
      <Path d="M-10 -2 Q-15 5, -12 12" stroke={stroke.white} strokeWidth={1} fill="none" />
      <Path d="M10 -2 Q15 5, 12 12" stroke={stroke.white} strokeWidth={1} fill="none" />

      {/* 身体 */}
      <Path d="M0 10 L0 45" stroke={stroke.white} strokeWidth={2} fill="none" />

      {/* 长袍 */}
      <Path
        d="M-20 25 Q-25 50, -20 80 L20 80 Q25 50, 20 25"
        stroke={stroke.white}
        strokeWidth={1.5}
        fill="none"
      />
      {/* 袍子装饰 */}
      <Path d="M-15 35 L-18 55" stroke={color} strokeWidth={0.5} fill="none" opacity={0.5} />
      <Path d="M15 35 L18 55" stroke={color} strokeWidth={0.5} fill="none" opacity={0.5} />

      {/* 手臂 */}
      <Path d="M0 20 L-20 35" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      <Path d="M0 20 L20 30" stroke={stroke.white} strokeWidth={1.5} fill="none" />

      {/* 花色符号（手持或胸前） */}
      <Circle cx="25" cy="32" r="6" fill="none" stroke={color} strokeWidth={1.5} />

      {/* 宝座（简化） */}
      <Rect
        x="-25"
        y="75"
        width="50"
        height="10"
        fill="none"
        stroke={gold}
        strokeWidth={1}
        rx={2}
      />
    </G>
  );
};

// 国王 - 坐在宝座上的男性
const KingFigure: React.FC<{ color: string }> = ({ color }) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <G transform="translate(60, 55)">
      {/* 头部 */}
      <Circle cx="0" cy="0" r="10" fill="none" stroke={stroke.white} strokeWidth={2} />
      {/* 王冠（更大更庄严） */}
      <Path
        d="M-12 -8 L-10 -22 L-5 -14 L0 -24 L5 -14 L10 -22 L12 -8"
        stroke={gold}
        strokeWidth={2}
        fill="none"
      />
      {/* 王冠顶部宝石 */}
      <Circle cx="0" cy="-24" r="2" fill={gold} />

      {/* 胡须 */}
      <Path d="M-6 8 Q0 15, 6 8" stroke={stroke.silver} strokeWidth={1} fill="none" />

      {/* 身体 */}
      <Path d="M0 10 L0 45" stroke={stroke.white} strokeWidth={2} fill="none" />

      {/* 盔甲/长袍 */}
      <Rect
        x="-15"
        y="15"
        width="30"
        height="30"
        fill="none"
        stroke={stroke.white}
        strokeWidth={1.5}
        rx={3}
      />
      {/* 披风 */}
      <Path d="M-15 15 Q-30 30, -25 60" stroke={color} strokeWidth={1} fill="none" opacity={0.7} />
      <Path d="M15 15 Q30 30, 25 60" stroke={color} strokeWidth={1} fill="none" opacity={0.7} />

      {/* 袍子下摆 */}
      <Path
        d="M-20 45 Q-22 65, -18 85 L18 85 Q22 65, 20 45"
        stroke={stroke.white}
        strokeWidth={1.5}
        fill="none"
      />

      {/* 右手持权杖 */}
      <Path d="M15 25 L30 20" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      <Line x1="32" y1="15" x2="32" y2="45" stroke={gold} strokeWidth={2} />

      {/* 左手持符号/宝球 */}
      <Path d="M-15 25 L-25 30" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      <Circle cx="-28" cy="32" r="6" fill="none" stroke={color} strokeWidth={1.5} />

      {/* 宝座 */}
      <Rect
        x="-28"
        y="80"
        width="56"
        height="12"
        fill="none"
        stroke={gold}
        strokeWidth={1.5}
        rx={2}
      />
      {/* 宝座扶手 */}
      <Rect x="-30" y="45" width="8" height="40" fill="none" stroke={gold} strokeWidth={1} rx={2} />
      <Rect x="22" y="45" width="8" height="40" fill="none" stroke={gold} strokeWidth={1} rx={2} />
    </G>
  );
};

export const CourtFigure: React.FC<CourtFigureProps> = ({ rank, suitColor }) => {
  switch (rank) {
    case 'page':
      return <PageFigure color={suitColor} />;
    case 'knight':
      return <KnightFigure color={suitColor} />;
    case 'queen':
      return <QueenFigure color={suitColor} />;
    case 'king':
      return <KingFigure color={suitColor} />;
  }
};

export default CourtFigure;
