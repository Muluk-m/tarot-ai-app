/**
 * Wheel of Fortune (X) - 命运之轮
 * 极简线条风格
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const WheelOfFortune: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="wheel-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#wheel-bg)" />
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {/* 命运之轮 */}
      <G transform="translate(60, 80)">
        {/* 外圈 */}
        <Circle cx="0" cy="0" r="45" fill="none" stroke={gold} strokeWidth={2} />
        {/* 中圈 */}
        <Circle cx="0" cy="0" r="32" fill="none" stroke={gold} strokeWidth={1.5} />
        {/* 内圈 */}
        <Circle cx="0" cy="0" r="18" fill="none" stroke={gold} strokeWidth={1} />

        {/* 八条辐条 */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <Line
            key={i}
            x1={18 * Math.cos(angle * Math.PI / 180)}
            y1={18 * Math.sin(angle * Math.PI / 180)}
            x2={45 * Math.cos(angle * Math.PI / 180)}
            y2={45 * Math.sin(angle * Math.PI / 180)}
            stroke={gold}
            strokeWidth={1}
          />
        ))}

        {/* T-A-R-O 字母位置（简化为符号） */}
        <SvgText x="0" y="-36" textAnchor="middle" fontSize="8" fontWeight="600" fill={stroke.white}>T</SvgText>
        <SvgText x="36" y="3" textAnchor="middle" fontSize="8" fontWeight="600" fill={stroke.white}>A</SvgText>
        <SvgText x="0" y="40" textAnchor="middle" fontSize="8" fontWeight="600" fill={stroke.white}>R</SvgText>
        <SvgText x="-36" y="3" textAnchor="middle" fontSize="8" fontWeight="600" fill={stroke.white}>O</SvgText>

        {/* 中心符号 */}
        <Circle cx="0" cy="0" r="5" fill={gold} opacity={0.3} />
      </G>

      {/* 狮身人面像（顶部） */}
      <G transform="translate(60, 25)">
        <Circle cx="0" cy="0" r="6" fill="none" stroke={gold} strokeWidth={1.5} />
        <Path d="M-8 5 L-6 10 L6 10 L8 5" stroke={gold} strokeWidth={1} fill="none" />
        {/* 剑 */}
        <Line x1="8" y1="-5" x2="15" y2="-12" stroke={stroke.silver} strokeWidth={1.5} />
      </G>

      {/* 蛇（左侧下降） */}
      <G transform="translate(15, 80)">
        <Path d="M0 -25 Q-5 -15, 0 -5 Q5 5, 0 15 Q-5 25, 0 30" stroke={CARD_COLORS.elements.fire} strokeWidth={1.5} fill="none" />
        <Circle cx="0" cy="32" r="3" fill="none" stroke={CARD_COLORS.elements.fire} strokeWidth={1} />
      </G>

      {/* 阿努比斯（右侧上升） */}
      <G transform="translate(105, 80)">
        {/* 狗头 */}
        <Circle cx="0" cy="0" r="5" fill="none" stroke={stroke.silver} strokeWidth={1.5} />
        <Path d="M-3 -5 L0 -10 L3 -5" stroke={stroke.silver} strokeWidth={1} fill="none" />
        {/* 身体 */}
        <Path d="M0 5 L0 20" stroke={stroke.silver} strokeWidth={1.5} fill="none" />
      </G>

      {/* 四角神秘符号（简化） */}
      {/* 左上 - 人 */}
      <Circle cx="15" cy="25" r="4" fill="none" stroke={stroke.silver} strokeWidth={1} opacity={0.5} />
      {/* 右上 - 鹰 */}
      <Path d="M100 22 L105 18 L110 22" stroke={stroke.silver} strokeWidth={1} fill="none" opacity={0.5} />
      {/* 左下 - 牛 */}
      <Path d="M10 145 L15 140 L20 145" stroke={stroke.silver} strokeWidth={1} fill="none" opacity={0.5} />
      {/* 右下 - 狮 */}
      <Circle cx="105" cy="145" r="4" fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="12" fontWeight="700" fill={gold}>X</SvgText>
        </G>
      )}
    </Svg>
  );
};

export default WheelOfFortune;
