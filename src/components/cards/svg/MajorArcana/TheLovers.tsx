/**
 * The Lovers (VI) - 恋人
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

export const TheLovers: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="lovers-bg" x1="0" y1="0" x2="0" y2="1">
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
        fill="url(#lovers-bg)"
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

      {/* 天使 */}
      <G transform="translate(60, 25)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={gold} strokeWidth={1.5} />
        {/* 翅膀 */}
        <Path d="M-8 5 Q-25 -5, -20 15 Q-15 5, -8 8" stroke={gold} strokeWidth={1} fill="none" />
        <Path d="M8 5 Q25 -5, 20 15 Q15 5, 8 8" stroke={gold} strokeWidth={1} fill="none" />
        {/* 光芒 */}
        <Circle cx="0" cy="0" r="12" fill="none" stroke={gold} strokeWidth={0.5} opacity={0.5} />
      </G>

      {/* 左边人物（女性） */}
      <G transform="translate(35, 80)">
        {/* 头 */}
        <Circle cx="0" cy="0" r="7" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 身体 */}
        <Path d="M0 7 L0 35" stroke={stroke.white} strokeWidth={2} fill="none" />
        {/* 手臂伸向对方 */}
        <Path d="M0 15 L15 20" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 腿 */}
        <Path d="M0 35 L-8 55" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 35 L8 55" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 右边人物（男性） */}
      <G transform="translate(85, 80)">
        {/* 头 */}
        <Circle cx="0" cy="0" r="7" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 身体 */}
        <Path d="M0 7 L0 35" stroke={stroke.white} strokeWidth={2} fill="none" />
        {/* 手臂伸向对方 */}
        <Path d="M0 15 L-15 20" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 腿 */}
        <Path d="M0 35 L-8 55" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 35 L8 55" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 心形连接 */}
      <Path
        d="M55 95 Q60 88, 65 95 Q60 105, 55 95"
        stroke={CARD_COLORS.elements.fire}
        strokeWidth={1.5}
        fill="none"
      />

      {/* 树（左边 - 知识之树） */}
      <G transform="translate(20, 115)">
        <Line x1="0" y1="0" x2="0" y2="25" stroke={stroke.silver} strokeWidth={1.5} />
        <Circle cx="0" cy="-5" r="8" fill="none" stroke={stroke.silver} strokeWidth={1} />
        {/* 苹果/果实 */}
        <Circle cx="0" cy="-5" r="2" fill={CARD_COLORS.elements.fire} />
      </G>

      {/* 树（右边 - 生命之树） */}
      <G transform="translate(100, 115)">
        <Line x1="0" y1="0" x2="0" y2="25" stroke={stroke.silver} strokeWidth={1.5} />
        {/* 火焰叶子 */}
        <Path
          d="M-6 -8 Q0 -18, 6 -8 Q0 0, -6 -8"
          stroke={CARD_COLORS.elements.fire}
          strokeWidth={1}
          fill="none"
        />
      </G>

      {/* 山 */}
      <Path
        d="M50 150 L60 130 L70 150"
        stroke={stroke.silver}
        strokeWidth={1}
        fill="none"
        opacity={0.5}
      />

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="12" fontWeight="700" fill={gold}>
            VI
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheLovers;
