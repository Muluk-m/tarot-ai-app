/**
 * Temperance (XIV) - 节制
 * 极简线条风格
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const Temperance: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="temperance-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#temperance-bg)" />
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {/* 远山和太阳 */}
      <G transform="translate(60, 25)">
        {/* 太阳/王冠 */}
        <Circle cx="0" cy="-5" r="8" fill="none" stroke={gold} strokeWidth={1.5} />
        {/* 光芒 */}
        <Path d="M0 -15 L0 -20" stroke={gold} strokeWidth={1} />
        <Path d="M-8 -10 L-12 -14" stroke={gold} strokeWidth={1} />
        <Path d="M8 -10 L12 -14" stroke={gold} strokeWidth={1} />
      </G>

      {/* 远处的山 */}
      <Path d="M70 35 L85 20 L100 35" stroke={stroke.silver} strokeWidth={1} fill="none" opacity={0.4} />

      {/* 天使 */}
      <G transform="translate(60, 55)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />

        {/* 太阳符号在额头 */}
        <Circle cx="0" cy="-3" r="2" fill={gold} opacity={0.5} />

        {/* 翅膀 */}
        <G opacity={0.8}>
          {/* 左翼 */}
          <Path d="M-8 5 Q-30 -10, -35 15 Q-25 10, -20 20 Q-15 10, -8 12" stroke={stroke.white} strokeWidth={1} fill="none" />
          {/* 右翼 */}
          <Path d="M8 5 Q30 -10, 35 15 Q25 10, 20 20 Q15 10, 8 12" stroke={stroke.white} strokeWidth={1} fill="none" />
        </G>

        {/* 身体 */}
        <Path d="M0 8 L0 45" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 长袍 */}
        <Path d="M-12 30 Q-18 50, -15 75 L15 75 Q18 50, 12 30" stroke={stroke.white} strokeWidth={1.5} fill="none" />

        {/* 三角形符号（胸前） */}
        <Path d="M-5 20 L0 12 L5 20 Z" stroke={gold} strokeWidth={1} fill="none" />

        {/* 左手持杯 */}
        <Path d="M0 25 L-25 35" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 左杯 */}
        <G transform="translate(-30, 38)">
          <Path d="M-5 0 L-3 10 L3 10 L5 0" stroke={gold} strokeWidth={1.5} fill="none" />
        </G>

        {/* 右手持杯 */}
        <Path d="M0 25 L25 45" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 右杯 */}
        <G transform="translate(30, 48)">
          <Path d="M-5 0 L-3 10 L3 10 L5 0" stroke={gold} strokeWidth={1.5} fill="none" />
        </G>

        {/* 水流（杯间流动） */}
        <Path d="M-25 45 Q0 60, 25 55" stroke={CARD_COLORS.elements.water} strokeWidth={1.5} fill="none" opacity={0.7} />
      </G>

      {/* 一只脚在水中，一只脚在陆地 */}
      <G transform="translate(60, 135)">
        {/* 左脚（陆地） */}
        <Path d="M-10 0 L-15 15" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 石头/陆地 */}
        <Path d="M-25 15 Q-15 10, -5 15" stroke={stroke.silver} strokeWidth={1} fill="none" />

        {/* 右脚（水中） */}
        <Path d="M10 0 L15 15" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 水波 */}
        <Path d="M5 18 Q15 15, 25 18 Q35 21, 45 18" stroke={CARD_COLORS.elements.water} strokeWidth={1} fill="none" opacity={0.5} />
      </G>

      {/* 路径通向远方 */}
      <Path d="M55 145 Q60 130, 65 145" stroke={gold} strokeWidth={0.5} fill="none" opacity={0.3} />

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill={gold}>XIV</SvgText>
        </G>
      )}
    </Svg>
  );
};

export default Temperance;
