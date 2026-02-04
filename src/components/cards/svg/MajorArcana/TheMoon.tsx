/**
 * The Moon (XVIII) - 月亮
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

export const TheMoon: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;
  const water = CARD_COLORS.elements.water;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="moon-bg" x1="0" y1="0" x2="0" y2="1">
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
        fill="url(#moon-bg)"
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

      {/* 月亮（包含侧脸） */}
      <G transform="translate(60, 35)">
        {/* 月亮圆盘 */}
        <Circle cx="0" cy="0" r="20" fill="none" stroke={stroke.silver} strokeWidth={2} />
        {/* 内圈 */}
        <Circle
          cx="0"
          cy="0"
          r="15"
          fill="none"
          stroke={stroke.silver}
          strokeWidth={1}
          opacity={0.5}
        />
        {/* 侧脸轮廓 */}
        <Path
          d="M-8 -8 Q-5 -5, -5 0 Q-5 5, -2 8 Q2 5, 5 8"
          stroke={stroke.silver}
          strokeWidth={1}
          fill="none"
        />
        {/* 眼睛 */}
        <Circle cx="-3" cy="-2" r="1.5" fill={stroke.silver} opacity={0.7} />

        {/* 月亮光芒 */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <Line
            key={i}
            x1={22 * Math.cos((angle * Math.PI) / 180)}
            y1={22 * Math.sin((angle * Math.PI) / 180)}
            x2={(i % 2 === 0 ? 28 : 25) * Math.cos((angle * Math.PI) / 180)}
            y2={(i % 2 === 0 ? 28 : 25) * Math.sin((angle * Math.PI) / 180)}
            stroke={stroke.silver}
            strokeWidth={i % 2 === 0 ? 1 : 0.5}
            opacity={0.6}
          />
        ))}
      </G>

      {/* 15滴露珠（上升路径简化） */}
      <G opacity={0.5}>
        <Circle cx="60" cy="60" r="1.5" fill={gold} />
        <Circle cx="55" cy="68" r="1" fill={gold} />
        <Circle cx="65" cy="68" r="1" fill={gold} />
        <Circle cx="58" cy="76" r="1" fill={gold} />
        <Circle cx="62" cy="76" r="1" fill={gold} />
      </G>

      {/* 两座塔 */}
      <G transform="translate(25, 80)">
        <Rect
          x="-8"
          y="0"
          width="16"
          height="35"
          fill="none"
          stroke={stroke.silver}
          strokeWidth={1.5}
          rx={1}
        />
        {/* 塔顶 */}
        <Path d="M-8 0 L0 -8 L8 0" stroke={stroke.silver} strokeWidth={1.5} fill="none" />
        {/* 窗户 */}
        <Rect
          x="-3"
          y="10"
          width="6"
          height="8"
          fill="none"
          stroke={stroke.silver}
          strokeWidth={0.5}
        />
      </G>
      <G transform="translate(95, 80)">
        <Rect
          x="-8"
          y="0"
          width="16"
          height="35"
          fill="none"
          stroke={stroke.silver}
          strokeWidth={1.5}
          rx={1}
        />
        {/* 塔顶 */}
        <Path d="M-8 0 L0 -8 L8 0" stroke={stroke.silver} strokeWidth={1.5} fill="none" />
        {/* 窗户 */}
        <Rect
          x="-3"
          y="10"
          width="6"
          height="8"
          fill="none"
          stroke={stroke.silver}
          strokeWidth={0.5}
        />
      </G>

      {/* 小路蜿蜒到远方 */}
      <Path
        d="M60 150 Q50 140, 60 130 Q70 120, 60 110 Q50 100, 60 90"
        stroke={gold}
        strokeWidth={1}
        fill="none"
        opacity={0.4}
      />

      {/* 狗（左） */}
      <G transform="translate(35, 130)">
        {/* 头 */}
        <Circle cx="0" cy="0" r="5" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 嘴巴朝上嚎叫 */}
        <Path d="M2 -5 L5 -10" stroke={stroke.white} strokeWidth={1} fill="none" />
        {/* 身体 */}
        <Path d="M-3 5 L-8 15 L8 15 L3 5" stroke={stroke.white} strokeWidth={1} fill="none" />
        {/* 尾巴 */}
        <Path d="M-8 12 L-12 8" stroke={stroke.white} strokeWidth={1} fill="none" />
      </G>

      {/* 狼（右） */}
      <G transform="translate(85, 130)">
        {/* 头 */}
        <Circle cx="0" cy="0" r="5" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 嘴巴朝上嚎叫 */}
        <Path d="M-2 -5 L-5 -10" stroke={stroke.white} strokeWidth={1} fill="none" />
        {/* 身体 */}
        <Path d="M-3 5 L-8 15 L8 15 L3 5" stroke={stroke.white} strokeWidth={1} fill="none" />
        {/* 尾巴 */}
        <Path d="M8 12 L12 8" stroke={stroke.white} strokeWidth={1} fill="none" />
      </G>

      {/* 水池和龙虾 */}
      <G transform="translate(60, 145)">
        {/* 水池 */}
        <Path d="M-25 5 Q0 15, 25 5" stroke={water} strokeWidth={1} fill="none" />
        <Path d="M-20 8 Q0 14, 20 8" stroke={water} strokeWidth={0.5} fill="none" opacity={0.5} />
        {/* 龙虾 */}
        <Circle cx="0" cy="0" r="4" fill="none" stroke={stroke.silver} strokeWidth={1} />
        <Path d="M-4 -2 L-8 -5" stroke={stroke.silver} strokeWidth={1} fill="none" />
        <Path d="M4 -2 L8 -5" stroke={stroke.silver} strokeWidth={1} fill="none" />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="8" fontWeight="700" fill={gold}>
            XVIII
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheMoon;
