/**
 * Death (XIII) - 死神
 * 极简线条风格
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const Death: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="death-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#death-bg)" />
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {/* 远处的太阳（象征重生） */}
      <G transform="translate(95, 25)">
        <Circle cx="0" cy="0" r="12" fill="none" stroke={gold} strokeWidth={1.5} />
        {/* 光芒 */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <Line
            key={i}
            x1={14 * Math.cos(angle * Math.PI / 180)}
            y1={14 * Math.sin(angle * Math.PI / 180)}
            x2={18 * Math.cos(angle * Math.PI / 180)}
            y2={18 * Math.sin(angle * Math.PI / 180)}
            stroke={gold}
            strokeWidth={1}
          />
        ))}
      </G>

      {/* 两座塔（远方） */}
      <Rect x="70" y="35" width="8" height="25" fill="none" stroke={stroke.silver} strokeWidth={1} opacity={0.4} />
      <Rect x="82" y="40" width="6" height="20" fill="none" stroke={stroke.silver} strokeWidth={1} opacity={0.4} />

      {/* 死神骑士 */}
      <G transform="translate(45, 50)">
        {/* 骷髅头 */}
        <Circle cx="0" cy="0" r="10" fill="none" stroke={stroke.white} strokeWidth={2} />
        {/* 眼窝 */}
        <Circle cx="-3" cy="-2" r="2" fill="none" stroke={stroke.white} strokeWidth={1} />
        <Circle cx="3" cy="-2" r="2" fill="none" stroke={stroke.white} strokeWidth={1} />
        {/* 鼻子 */}
        <Path d="M0 1 L-1 4 L1 4 Z" stroke={stroke.white} strokeWidth={0.5} fill="none" />
        {/* 牙齿 */}
        <Path d="M-4 7 L4 7" stroke={stroke.white} strokeWidth={1} />

        {/* 头盔 */}
        <Path d="M-12 -5 Q-15 -15, 0 -18 Q15 -15, 12 -5" stroke={stroke.silver} strokeWidth={1.5} fill="none" />

        {/* 身体（盔甲） */}
        <Rect x="-10" y="10" width="20" height="30" fill="none" stroke={stroke.silver} strokeWidth={1.5} rx={2} />

        {/* 持镰刀的手 */}
        <Path d="M10 20 L25 15" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 镰刀 */}
      <G transform="translate(75, 35)">
        {/* 镰刀杆 */}
        <Line x1="0" y1="0" x2="0" y2="60" stroke={stroke.silver} strokeWidth={2} />
        {/* 镰刀刃 */}
        <Path d="M0 0 Q-15 -10, -25 5 Q-20 15, 0 10" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 马（简化） */}
      <G transform="translate(45, 100)">
        {/* 马头 */}
        <Path d="M-25 -20 Q-30 -30, -20 -35 Q-10 -30, -15 -20" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 马身 */}
        <Path d="M-15 -15 Q0 -20, 15 -15 Q25 -10, 20 5 L-20 5 Q-25 -10, -15 -15" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 马腿 */}
        <Line x1="-15" y1="5" x2="-18" y2="30" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="-5" y1="5" x2="-2" y2="30" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="5" y1="5" x2="8" y2="30" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="15" y1="5" x2="18" y2="30" stroke={stroke.white} strokeWidth={1.5} />
      </G>

      {/* 旗帜（五瓣玫瑰） */}
      <G transform="translate(20, 30)">
        <Line x1="0" y1="0" x2="0" y2="50" stroke={stroke.silver} strokeWidth={1.5} />
        <Rect x="-12" y="0" width="12" height="20" fill="none" stroke={stroke.white} strokeWidth={1} />
        {/* 玫瑰花 */}
        <Circle cx="-6" cy="10" r="4" fill="none" stroke={stroke.white} strokeWidth={1} />
      </G>

      {/* 地面人物剪影（简化） */}
      <G transform="translate(85, 125)" opacity={0.4}>
        <Circle cx="0" cy="0" r="4" fill="none" stroke={stroke.silver} strokeWidth={1} />
        <Line x1="0" y1="4" x2="0" y2="15" stroke={stroke.silver} strokeWidth={1} />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill={gold}>XIII</SvgText>
        </G>
      )}
    </Svg>
  );
};

export default Death;
