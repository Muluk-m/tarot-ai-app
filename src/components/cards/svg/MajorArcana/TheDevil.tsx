/**
 * The Devil (XV) - 恶魔
 * 极简线条风格
 */

import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  G,
  Path,
  Circle,
  Line,
  Text as SvgText,
} from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const TheDevil: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="devil-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect
        x="0"
        y="0"
        width="120"
        height="180"
        rx={SVG_CONFIG.borderRadius}
        fill="url(#devil-bg)"
      />
      <Rect
        x="3"
        y="3"
        width="114"
        height="174"
        rx={SVG_CONFIG.borderRadius - 1}
        fill="none"
        stroke={gold}
        strokeWidth={1}
        opacity={0.5}
      />

      {/* 恶魔 */}
      <G transform="translate(60, 45)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="12" fill="none" stroke={stroke.white} strokeWidth={2} />

        {/* 山羊角 */}
        <Path d="M-10 -8 Q-15 -20, -8 -25" stroke={stroke.white} strokeWidth={2} fill="none" />
        <Path d="M10 -8 Q15 -20, 8 -25" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 眼睛 */}
        <Circle cx="-4" cy="-2" r="2" fill={CARD_COLORS.elements.fire} />
        <Circle cx="4" cy="-2" r="2" fill={CARD_COLORS.elements.fire} />

        {/* 倒五芒星（额头） */}
        <G transform="translate(0, -5)">
          <Path
            d="M0 3 L2 -1 L5 -1 L3 2 L4 6 L0 4 L-4 6 L-3 2 L-5 -1 L-2 -1 Z"
            stroke={gold}
            strokeWidth={0.5}
            fill="none"
            opacity={0.7}
          />
        </G>

        {/* 蝙蝠翅膀 */}
        <G opacity={0.8}>
          {/* 左翼 */}
          <Path
            d="M-12 5 Q-35 -5, -40 25 Q-30 15, -25 30 Q-20 15, -12 15"
            stroke={stroke.silver}
            strokeWidth={1.5}
            fill="none"
          />
          {/* 右翼 */}
          <Path
            d="M12 5 Q35 -5, 40 25 Q30 15, 25 30 Q20 15, 12 15"
            stroke={stroke.silver}
            strokeWidth={1.5}
            fill="none"
          />
        </G>

        {/* 身体 */}
        <Path d="M0 12 L0 40" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 右手举火把 */}
        <Path d="M0 25 L15 15" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 火把 */}
        <G transform="translate(18, 10)">
          <Line x1="0" y1="5" x2="0" y2="-5" stroke={stroke.silver} strokeWidth={2} />
          {/* 火焰 */}
          <Path
            d="M-3 -5 Q0 -15, 3 -5"
            stroke={CARD_COLORS.elements.fire}
            strokeWidth={1.5}
            fill="none"
          />
        </G>

        {/* 座位/立方体 */}
        <G transform="translate(0, 45)">
          <Rect
            x="-20"
            y="0"
            width="40"
            height="25"
            fill="none"
            stroke={stroke.silver}
            strokeWidth={1.5}
            rx={2}
          />
          {/* 铁环 */}
          <Circle cx="-15" cy="15" r="3" fill="none" stroke={stroke.silver} strokeWidth={1} />
          <Circle cx="15" cy="15" r="3" fill="none" stroke={stroke.silver} strokeWidth={1} />
        </G>
      </G>

      {/* 左边被锁住的人 */}
      <G transform="translate(30, 125)">
        {/* 头 */}
        <Circle cx="0" cy="0" r="5" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 小角 */}
        <Path d="M-3 -5 L-2 -8" stroke={stroke.white} strokeWidth={1} fill="none" />
        <Path d="M3 -5 L2 -8" stroke={stroke.white} strokeWidth={1} fill="none" />
        {/* 身体 */}
        <Line x1="0" y1="5" x2="0" y2="18" stroke={stroke.white} strokeWidth={1.5} />
        {/* 尾巴 */}
        <Path d="M0 18 Q-5 25, -2 30" stroke={stroke.white} strokeWidth={1} fill="none" />
        {/* 锁链 */}
        <Path
          d="M0 -2 Q10 -5, 15 5"
          stroke={stroke.silver}
          strokeWidth={1}
          fill="none"
          strokeDasharray="2,2"
        />
      </G>

      {/* 右边被锁住的人 */}
      <G transform="translate(90, 125)">
        {/* 头 */}
        <Circle cx="0" cy="0" r="5" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 小角 */}
        <Path d="M-3 -5 L-2 -8" stroke={stroke.white} strokeWidth={1} fill="none" />
        <Path d="M3 -5 L2 -8" stroke={stroke.white} strokeWidth={1} fill="none" />
        {/* 身体 */}
        <Line x1="0" y1="5" x2="0" y2="18" stroke={stroke.white} strokeWidth={1.5} />
        {/* 尾巴（火焰） */}
        <Path
          d="M0 18 Q5 22, 3 28"
          stroke={CARD_COLORS.elements.fire}
          strokeWidth={1}
          fill="none"
        />
        {/* 锁链 */}
        <Path
          d="M0 -2 Q-10 -5, -15 5"
          stroke={stroke.silver}
          strokeWidth={1}
          fill="none"
          strokeDasharray="2,2"
        />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill={gold}>
            XV
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheDevil;
