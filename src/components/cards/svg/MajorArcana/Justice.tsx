/**
 * Justice (XI) - 正义
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

export const Justice: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="justice-bg" x1="0" y1="0" x2="0" y2="1">
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
        fill="url(#justice-bg)"
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

      {/* 两根柱子 */}
      <Rect
        x="15"
        y="20"
        width="8"
        height="120"
        fill="none"
        stroke={stroke.silver}
        strokeWidth={1}
        rx={2}
      />
      <Rect
        x="97"
        y="20"
        width="8"
        height="120"
        fill="none"
        stroke={stroke.silver}
        strokeWidth={1}
        rx={2}
      />

      {/* 帷幕 */}
      <Path d="M23 20 Q60 35, 97 20" stroke={gold} strokeWidth={1} fill="none" opacity={0.5} />

      {/* 正义女神 */}
      <G transform="translate(60, 50)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />
        {/* 王冠 */}
        <Path
          d="M-8 -8 L-6 -15 L-3 -10 L0 -16 L3 -10 L6 -15 L8 -8"
          stroke={gold}
          strokeWidth={1.5}
          fill="none"
        />

        {/* 身体 */}
        <Path d="M0 8 L0 50" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 右手持剑 */}
        <Path d="M0 20 L20 10" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 剑 */}
        <G transform="translate(25, 5)">
          <Line x1="0" y1="15" x2="0" y2="-25" stroke={stroke.silver} strokeWidth={2} />
          {/* 剑柄 */}
          <Line x1="-5" y1="10" x2="5" y2="10" stroke={gold} strokeWidth={2} />
          <Circle cx="0" cy="15" r="3" fill="none" stroke={gold} strokeWidth={1} />
        </G>

        {/* 左手持天平 */}
        <Path d="M0 20 L-20 15" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 天平 */}
        <G transform="translate(-25, 10)">
          {/* 横杆 */}
          <Line x1="-15" y1="0" x2="15" y2="0" stroke={gold} strokeWidth={1.5} />
          {/* 中心 */}
          <Circle cx="0" cy="0" r="2" fill={gold} />
          {/* 左托盘 */}
          <Line x1="-15" y1="0" x2="-15" y2="15" stroke={gold} strokeWidth={1} />
          <Path d="M-22 15 Q-15 20, -8 15" stroke={gold} strokeWidth={1} fill="none" />
          {/* 右托盘 */}
          <Line x1="15" y1="0" x2="15" y2="15" stroke={gold} strokeWidth={1} />
          <Path d="M8 15 Q15 20, 22 15" stroke={gold} strokeWidth={1} fill="none" />
        </G>

        {/* 长袍 */}
        <Path
          d="M-15 35 Q-18 55, -15 80 L15 80 Q18 55, 15 35"
          stroke={stroke.white}
          strokeWidth={1.5}
          fill="none"
        />
        {/* 披风细节 */}
        <Path d="M-10 35 L-12 60" stroke={gold} strokeWidth={0.5} fill="none" opacity={0.5} />
        <Path d="M10 35 L12 60" stroke={gold} strokeWidth={0.5} fill="none" opacity={0.5} />
      </G>

      {/* 宝座 */}
      <Rect
        x="40"
        y="130"
        width="40"
        height="10"
        fill="none"
        stroke={gold}
        strokeWidth={1}
        rx={2}
      />

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="12" fontWeight="700" fill={gold}>
            XI
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default Justice;
