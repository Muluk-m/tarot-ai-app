/**
 * The Star (XVII) - 星星
 * 极简线条风格
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const TheStar: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;
  const water = CARD_COLORS.elements.water;

  // 八芒星路径
  const starPath = (size: number) => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45 - 90) * Math.PI / 180;
      const r = i % 2 === 0 ? size : size * 0.4;
      points.push(`${r * Math.cos(angle)},${r * Math.sin(angle)}`);
    }
    return `M${points.join(' L')} Z`;
  };

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="star-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#star-bg)" />
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {/* 大八芒星（中央） */}
      <G transform="translate(60, 30)">
        <Path d={starPath(18)} stroke={gold} strokeWidth={2} fill="none" />
        {/* 内部光晕 */}
        <Circle cx="0" cy="0" r="8" fill={gold} opacity={0.15} />
      </G>

      {/* 七颗小星星 */}
      <G transform="translate(25, 20)">
        <Path d={starPath(5)} stroke={gold} strokeWidth={1} fill="none" />
      </G>
      <G transform="translate(95, 20)">
        <Path d={starPath(5)} stroke={gold} strokeWidth={1} fill="none" />
      </G>
      <G transform="translate(20, 45)">
        <Path d={starPath(4)} stroke={gold} strokeWidth={1} fill="none" />
      </G>
      <G transform="translate(100, 45)">
        <Path d={starPath(4)} stroke={gold} strokeWidth={1} fill="none" />
      </G>
      <G transform="translate(35, 55)">
        <Path d={starPath(4)} stroke={gold} strokeWidth={1} fill="none" />
      </G>
      <G transform="translate(85, 55)">
        <Path d={starPath(4)} stroke={gold} strokeWidth={1} fill="none" />
      </G>
      <G transform="translate(60, 55)">
        <Path d={starPath(3)} stroke={gold} strokeWidth={1} fill="none" />
      </G>

      {/* 裸体女性跪在水边 */}
      <G transform="translate(55, 85)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="7" fill="none" stroke={stroke.white} strokeWidth={1.5} />

        {/* 身体 */}
        <Path d="M0 7 L0 35" stroke={stroke.white} strokeWidth={1.5} fill="none" />

        {/* 跪着的姿势 */}
        <Path d="M0 35 L-10 50 L-15 60" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 35 L10 50 L5 60" stroke={stroke.white} strokeWidth={1.5} fill="none" />

        {/* 右手倒水到水池 */}
        <Path d="M0 15 L20 25" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 水壶 */}
        <Circle cx="25" cy="28" r="5" fill="none" stroke={gold} strokeWidth={1} />
        {/* 倾倒的水 */}
        <Path d="M28 32 Q35 40, 30 55" stroke={water} strokeWidth={2} fill="none" opacity={0.7} />
        <Path d="M26 33 Q32 45, 28 55" stroke={water} strokeWidth={1.5} fill="none" opacity={0.5} />

        {/* 左手倒水到地上 */}
        <Path d="M0 15 L-20 20" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 水壶 */}
        <Circle cx="-25" cy="23" r="5" fill="none" stroke={gold} strokeWidth={1} />
        {/* 倾倒的水（五道水流） */}
        <Path d="M-28 27 L-35 45" stroke={water} strokeWidth={1.5} fill="none" opacity={0.6} />
        <Path d="M-26 28 L-30 50" stroke={water} strokeWidth={1} fill="none" opacity={0.5} />
        <Path d="M-24 28 L-25 48" stroke={water} strokeWidth={1} fill="none" opacity={0.4} />
      </G>

      {/* 水池 */}
      <G transform="translate(85, 135)">
        <Path d="M-15 0 Q0 8, 15 0 Q0 -8, -15 0" stroke={water} strokeWidth={1} fill="none" opacity={0.5} />
        {/* 涟漪 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={water} strokeWidth={0.5} opacity={0.3} />
      </G>

      {/* 地面（绿地） */}
      <Path d="M10 145 Q60 150, 110 145" stroke={CARD_COLORS.elements.earth} strokeWidth={1} fill="none" opacity={0.4} />

      {/* 远处的山 */}
      <Path d="M85 125 L95 110 L105 125" stroke={stroke.silver} strokeWidth={1} fill="none" opacity={0.3} />

      {/* 小鸟（灵魂象征） */}
      <G transform="translate(100, 100)">
        <Path d="M-5 0 Q0 -3, 5 0 Q0 -1, -5 0" stroke={stroke.white} strokeWidth={1} fill="none" opacity={0.6} />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="9" fontWeight="700" fill={gold}>XVII</SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheStar;
