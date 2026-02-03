/**
 * The Hermit (IX) - 隐士
 * 极简线条风格
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const TheHermit: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="hermit-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#hermit-bg)" />
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {/* 隐士 */}
      <G transform="translate(55, 40)">
        {/* 头部（带兜帽） */}
        <Path d="M-10 0 Q-12 -15, 0 -18 Q12 -15, 10 0" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Circle cx="0" cy="0" r="7" fill="none" stroke={stroke.white} strokeWidth={1.5} />

        {/* 胡子 */}
        <Path d="M-4 5 Q0 15, 4 5" stroke={stroke.silver} strokeWidth={1} fill="none" />

        {/* 右手持灯 */}
        <Path d="M5 15 L25 5" stroke={stroke.white} strokeWidth={1.5} fill="none" />

        {/* 灯笼 */}
        <G transform="translate(30, 0)">
          {/* 灯框 */}
          <Rect x="-8" y="-10" width="16" height="20" fill="none" stroke={gold} strokeWidth={1.5} rx={2} />
          {/* 六芒星（内部光源） */}
          <G transform="translate(0, 0)">
            <Path d="M0 -5 L4 3 L-4 3 Z" stroke={gold} strokeWidth={1} fill="none" />
            <Path d="M0 5 L4 -3 L-4 -3 Z" stroke={gold} strokeWidth={1} fill="none" />
          </G>
          {/* 光芒 */}
          <Circle cx="0" cy="0" r="12" fill="none" stroke={gold} strokeWidth={0.5} opacity={0.3} />
          <Circle cx="0" cy="0" r="16" fill="none" stroke={gold} strokeWidth={0.5} opacity={0.2} />
        </G>

        {/* 长袍 */}
        <Path d="M-10 10 Q-15 40, -20 90 L20 90 Q15 40, 10 10" stroke={stroke.white} strokeWidth={1.5} fill="none" />

        {/* 左手持杖 */}
        <Path d="M-5 15 L-18 25" stroke={stroke.white} strokeWidth={1.5} fill="none" />

        {/* 权杖 */}
        <Line x1="-20" y1="20" x2="-20" y2="95" stroke={stroke.silver} strokeWidth={2} />
        {/* 杖顶 */}
        <Circle cx="-20" cy="18" r="3" fill="none" stroke={stroke.silver} strokeWidth={1} />
      </G>

      {/* 山峰 */}
      <G transform="translate(60, 145)" opacity={0.4}>
        <Path d="M-40 20 L-25 0 L-10 20" stroke={stroke.silver} strokeWidth={1} fill="none" />
        <Path d="M-20 20 L0 -5 L20 20" stroke={stroke.silver} strokeWidth={1} fill="none" />
        <Path d="M10 20 L25 5 L40 20" stroke={stroke.silver} strokeWidth={1} fill="none" />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="12" fontWeight="700" fill={gold}>IX</SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheHermit;
