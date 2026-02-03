/**
 * The Tower (XVI) - 塔
 * 极简线条风格
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const TheTower: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;
  const fire = CARD_COLORS.elements.fire;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="tower-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#tower-bg)" />
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {/* 闪电 */}
      <Path
        d="M90 15 L70 35 L80 35 L55 65 L65 65 L40 95"
        stroke={gold}
        strokeWidth={3}
        fill="none"
      />
      {/* 闪电光晕 */}
      <Path
        d="M90 15 L70 35 L80 35 L55 65 L65 65 L40 95"
        stroke={gold}
        strokeWidth={6}
        fill="none"
        opacity={0.2}
      />

      {/* 塔 */}
      <G transform="translate(60, 50)">
        {/* 塔身 */}
        <Path d="M-20 0 L-15 95 L15 95 L20 0" stroke={stroke.silver} strokeWidth={2} fill="none" />

        {/* 塔冠（被击落） */}
        <G transform="translate(25, -10) rotate(30)">
          <Path d="M-8 0 L0 -15 L8 0" stroke={gold} strokeWidth={1.5} fill="none" />
          {/* 火焰 */}
          <Path d="M-5 0 Q0 5, 5 0" stroke={fire} strokeWidth={1} fill="none" />
        </G>

        {/* 塔顶裂缝 */}
        <Path d="M-5 0 L0 -5 L5 0" stroke={stroke.silver} strokeWidth={1.5} fill="none" />
        <Line x1="0" y1="0" x2="0" y2="15" stroke={fire} strokeWidth={1.5} />

        {/* 窗户 */}
        <Rect x="-8" y="25" width="6" height="8" fill="none" stroke={stroke.silver} strokeWidth={1} />
        <Rect x="2" y="25" width="6" height="8" fill="none" stroke={stroke.silver} strokeWidth={1} />
        <Rect x="-8" y="45" width="6" height="8" fill="none" stroke={stroke.silver} strokeWidth={1} />
        <Rect x="2" y="45" width="6" height="8" fill="none" stroke={stroke.silver} strokeWidth={1} />
        <Rect x="-8" y="65" width="6" height="8" fill="none" stroke={stroke.silver} strokeWidth={1} />
        <Rect x="2" y="65" width="6" height="8" fill="none" stroke={stroke.silver} strokeWidth={1} />

        {/* 火焰从窗口冒出 */}
        <Path d="M-5 23 Q-3 18, -1 23" stroke={fire} strokeWidth={1} fill="none" />
        <Path d="M5 23 Q7 18, 9 23" stroke={fire} strokeWidth={1} fill="none" />
      </G>

      {/* 坠落的人物1（左） */}
      <G transform="translate(25, 85) rotate(-45)">
        <Circle cx="0" cy="0" r="5" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="0" y1="5" x2="0" y2="18" stroke={stroke.white} strokeWidth={1.5} />
        <Path d="M0 8 L-8 15" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 8 L8 15" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 18 L-5 28" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 18 L5 28" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 坠落的人物2（右） */}
      <G transform="translate(95, 100) rotate(25)">
        <Circle cx="0" cy="0" r="5" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="0" y1="5" x2="0" y2="18" stroke={stroke.white} strokeWidth={1.5} />
        <Path d="M0 8 L-8 12" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 8 L8 12" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 18 L-5 28" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 18 L5 28" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 火焰碎片 */}
      <Circle cx="30" cy="60" r="2" fill={fire} opacity={0.7} />
      <Circle cx="85" cy="75" r="2" fill={fire} opacity={0.7} />
      <Circle cx="20" cy="110" r="1.5" fill={fire} opacity={0.5} />
      <Circle cx="100" cy="120" r="1.5" fill={fire} opacity={0.5} />

      {/* 22个火焰球（简化表示） */}
      <Circle cx="15" cy="70" r="1" fill={gold} opacity={0.4} />
      <Circle cx="105" cy="65" r="1" fill={gold} opacity={0.4} />
      <Circle cx="25" cy="95" r="1" fill={gold} opacity={0.4} />
      <Circle cx="95" cy="90" r="1" fill={gold} opacity={0.4} />

      {/* 岩石基座 */}
      <Path d="M30 145 Q60 140, 90 145" stroke={stroke.silver} strokeWidth={1} fill="none" opacity={0.5} />

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill={gold}>XVI</SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheTower;
