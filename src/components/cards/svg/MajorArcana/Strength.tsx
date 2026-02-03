/**
 * Strength (VIII) - 力量
 * 极简线条风格
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const Strength: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="strength-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#strength-bg)" />
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {/* 无限符号（头顶） */}
      <G transform="translate(60, 25)">
        <Path d="M-10 0 Q-10 -8, 0 0 Q10 8, 10 0 Q10 -8, 0 0 Q-10 8, -10 0" stroke={gold} strokeWidth={1.5} fill="none" />
      </G>

      {/* 女性人物 */}
      <G transform="translate(55, 55)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />
        {/* 花环头饰 */}
        <Path d="M-8 -3 Q-10 -8, -5 -10 Q0 -12, 5 -10 Q10 -8, 8 -3" stroke={gold} strokeWidth={1} fill="none" />
        {/* 身体 */}
        <Path d="M0 8 L0 45" stroke={stroke.white} strokeWidth={2} fill="none" />
        {/* 手臂抚摸狮子 */}
        <Path d="M0 20 L20 35" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 25 L25 25" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 长裙 */}
        <Path d="M-12 35 Q-15 55, -10 75 L10 75 Q15 55, 12 35" stroke={stroke.white} strokeWidth={1} fill="none" />
      </G>

      {/* 狮子 */}
      <G transform="translate(75, 85)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="12" fill="none" stroke={gold} strokeWidth={1.5} />
        {/* 鬃毛 */}
        <Path d="M-12 -5 Q-18 -8, -15 0 Q-18 8, -12 5" stroke={gold} strokeWidth={1} fill="none" />
        <Path d="M-10 -10 Q-8 -18, 0 -15 Q8 -18, 10 -10" stroke={gold} strokeWidth={1} fill="none" />
        <Path d="M12 -5 Q18 -8, 15 0 Q18 8, 12 5" stroke={gold} strokeWidth={1} fill="none" />
        {/* 眼睛 */}
        <Circle cx="-4" cy="-2" r="1.5" fill={gold} />
        <Circle cx="4" cy="-2" r="1.5" fill={gold} />
        {/* 嘴巴（张开） */}
        <Path d="M-5 5 Q0 10, 5 5" stroke={gold} strokeWidth={1} fill="none" />
        {/* 身体 */}
        <Path d="M-10 12 Q-15 25, -8 40 L8 40 Q15 25, 10 12" stroke={gold} strokeWidth={1} fill="none" />
        {/* 前腿 */}
        <Line x1="-5" y1="40" x2="-8" y2="55" stroke={gold} strokeWidth={1.5} />
        <Line x1="5" y1="40" x2="8" y2="55" stroke={gold} strokeWidth={1.5} />
        {/* 尾巴 */}
        <Path d="M10 30 Q20 25, 25 35 Q22 40, 18 38" stroke={gold} strokeWidth={1} fill="none" />
      </G>

      {/* 地面花朵装饰 */}
      <G transform="translate(25, 145)" opacity={0.6}>
        <Circle cx="0" cy="0" r="3" fill="none" stroke={stroke.silver} strokeWidth={1} />
        <Circle cx="-5" cy="5" r="2" fill="none" stroke={stroke.silver} strokeWidth={0.5} />
        <Circle cx="5" cy="5" r="2" fill="none" stroke={stroke.silver} strokeWidth={0.5} />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill={gold}>VIII</SvgText>
        </G>
      )}
    </Svg>
  );
};

export default Strength;
