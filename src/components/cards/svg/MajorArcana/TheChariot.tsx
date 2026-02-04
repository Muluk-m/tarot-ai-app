/**
 * The Chariot (VII) - 战车
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

export const TheChariot: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="chariot-bg" x1="0" y1="0" x2="0" y2="1">
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
        fill="url(#chariot-bg)"
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

      {/* 星星华盖 */}
      <G transform="translate(60, 20)">
        <Path d="M-30 0 Q-25 -10, 0 -15 Q25 -10, 30 0" stroke={gold} strokeWidth={1} fill="none" />
        {/* 六芒星 */}
        <G transform="translate(0, -8)">
          <Path d="M0 -5 L4 3 L-4 3 Z" stroke={gold} strokeWidth={1} fill="none" />
          <Path d="M0 5 L4 -3 L-4 -3 Z" stroke={gold} strokeWidth={1} fill="none" />
        </G>
      </G>

      {/* 驾驶者 */}
      <G transform="translate(60, 45)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />
        {/* 王冠 */}
        <Path d="M-6 -8 L-4 -14 L0 -10 L4 -14 L6 -8" stroke={gold} strokeWidth={1.5} fill="none" />
        {/* 身体/盔甲 */}
        <Rect
          x="-12"
          y="8"
          width="24"
          height="25"
          fill="none"
          stroke={stroke.white}
          strokeWidth={1.5}
          rx={2}
        />
        {/* 月亮护肩（左） */}
        <Path d="M-15 12 Q-22 15, -15 20" stroke={stroke.silver} strokeWidth={1.5} fill="none" />
        {/* 太阳护肩（右） */}
        <Circle cx="18" cy="16" r="4" fill="none" stroke={gold} strokeWidth={1} />
        {/* 权杖 */}
        <Line x1="0" y1="10" x2="0" y2="-5" stroke={gold} strokeWidth={2} />
      </G>

      {/* 战车车身 */}
      <G transform="translate(60, 100)">
        {/* 车身主体 */}
        <Rect
          x="-30"
          y="0"
          width="60"
          height="25"
          fill="none"
          stroke={stroke.white}
          strokeWidth={1.5}
          rx={3}
        />
        {/* 翅膀装饰 */}
        <Path d="M-30 5 L-40 0 L-35 10" stroke={gold} strokeWidth={1} fill="none" />
        <Path d="M30 5 L40 0 L35 10" stroke={gold} strokeWidth={1} fill="none" />
        {/* 轮子 */}
        <Circle cx="-25" cy="30" r="8" fill="none" stroke={stroke.silver} strokeWidth={1.5} />
        <Circle cx="25" cy="30" r="8" fill="none" stroke={stroke.silver} strokeWidth={1.5} />
        {/* 轮辐 */}
        <Line x1="-25" y1="22" x2="-25" y2="38" stroke={stroke.silver} strokeWidth={1} />
        <Line x1="-33" y1="30" x2="-17" y2="30" stroke={stroke.silver} strokeWidth={1} />
        <Line x1="25" y1="22" x2="25" y2="38" stroke={stroke.silver} strokeWidth={1} />
        <Line x1="17" y1="30" x2="33" y2="30" stroke={stroke.silver} strokeWidth={1} />
      </G>

      {/* 两只狮身人面兽 */}
      {/* 黑色（左） */}
      <G transform="translate(25, 145)">
        <Circle cx="0" cy="-5" r="5" fill="none" stroke={stroke.silver} strokeWidth={1.5} />
        <Path d="M-5 0 Q-8 5, 8 5 L5 0" stroke={stroke.silver} strokeWidth={1.5} fill="none" />
      </G>
      {/* 白色（右） */}
      <G transform="translate(95, 145)">
        <Circle cx="0" cy="-5" r="5" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        <Path d="M-5 0 Q-8 5, 8 5 L5 0" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill={gold}>
            VII
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheChariot;
