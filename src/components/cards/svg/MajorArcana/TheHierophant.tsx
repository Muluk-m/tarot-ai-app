/**
 * The Hierophant (V) - 教皇
 * 极简线条风格
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const TheHierophant: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="hierophant-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#hierophant-bg)" />
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {/* 两根柱子 */}
      <Rect x="15" y="30" width="10" height="100" fill="none" stroke={stroke.silver} strokeWidth={1} rx={2} />
      <Rect x="95" y="30" width="10" height="100" fill="none" stroke={stroke.silver} strokeWidth={1} rx={2} />

      {/* 教皇 */}
      <G transform="translate(60, 55)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />
        {/* 三重冠 */}
        <Path d="M-8 -10 L-6 -20 L0 -15 L6 -20 L8 -10" stroke={gold} strokeWidth={1.5} fill="none" />
        <Line x1="-6" y1="-16" x2="6" y2="-16" stroke={gold} strokeWidth={1} />
        <Circle cx="0" cy="-22" r="2" fill={gold} />

        {/* 身体 */}
        <Path d="M0 8 L0 45" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 祝福手势 - 右手 */}
        <Path d="M0 20 L18 15" stroke={stroke.white} strokeWidth={2} fill="none" />
        <G transform="translate(22, 13)">
          <Line x1="0" y1="0" x2="0" y2="-8" stroke={stroke.white} strokeWidth={1.5} />
          <Line x1="3" y1="0" x2="5" y2="-6" stroke={stroke.white} strokeWidth={1.5} />
        </G>

        {/* 左手持权杖 */}
        <Path d="M0 20 L-15 25" stroke={stroke.white} strokeWidth={2} fill="none" />
        <G transform="translate(-18, 28)">
          <Line x1="0" y1="0" x2="0" y2="-35" stroke={gold} strokeWidth={2} />
          {/* 三重十字 */}
          <Line x1="-8" y1="-30" x2="8" y2="-30" stroke={gold} strokeWidth={1.5} />
          <Line x1="-6" y1="-25" x2="6" y2="-25" stroke={gold} strokeWidth={1.5} />
          <Line x1="-4" y1="-20" x2="4" y2="-20" stroke={gold} strokeWidth={1.5} />
        </G>

        {/* 长袍 */}
        <Path d="M-15 25 Q-20 45, -18 70 L0 75 L18 70 Q20 45, 15 25" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 两个跪拜者 */}
      <G transform="translate(35, 125)">
        <Circle cx="0" cy="0" r="5" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        <Path d="M0 5 L0 15 L-5 25" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>
      <G transform="translate(85, 125)">
        <Circle cx="0" cy="0" r="5" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        <Path d="M0 5 L0 15 L5 25" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 交叉钥匙 */}
      <G transform="translate(60, 145)" opacity={0.5}>
        <Path d="M-8 -5 L8 5" stroke={gold} strokeWidth={1.5} />
        <Path d="M8 -5 L-8 5" stroke={stroke.silver} strokeWidth={1.5} />
        <Circle cx="-10" cy="-7" r="3" fill="none" stroke={gold} strokeWidth={1} />
        <Circle cx="10" cy="-7" r="3" fill="none" stroke={stroke.silver} strokeWidth={1} />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="12" fontWeight="700" fill={gold}>V</SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheHierophant;
