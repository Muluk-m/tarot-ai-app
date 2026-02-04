/**
 * The Magician (I) - 魔术师
 * 极简线条风格
 *
 * 视觉元素：
 * - 人物站立，一手指天一手指地
 * - 头顶无限符号 ∞
 * - 桌上四元素符号（杖、杯、剑、币）
 * - 周围能量光环
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
  Ellipse,
  Text as SvgText,
} from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const TheMagician: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;
  const elements = CARD_COLORS.elements;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="magician-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      {/* 背景 */}
      <Rect
        x="0"
        y="0"
        width="120"
        height="180"
        rx={SVG_CONFIG.borderRadius}
        fill="url(#magician-bg)"
      />

      {/* 边框 */}
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

      {/* 无限符号 - 头顶 */}
      <G transform="translate(60, 25)">
        <Path
          d="M-12 0 Q-12 -6, -6 -6 Q0 -6, 0 0 Q0 6, 6 6 Q12 6, 12 0 Q12 -6, 6 -6 Q0 -6, 0 0 Q0 6, -6 6 Q-12 6, -12 0"
          stroke={gold}
          strokeWidth={1.5}
          fill="none"
        />
      </G>

      {/* 人物 */}
      <G transform="translate(60, 70)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />

        {/* 身体 */}
        <Path d="M0 8 L0 40" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 右臂 - 指天 */}
        <Path d="M0 15 L15 -10" stroke={stroke.white} strokeWidth={2} fill="none" />
        {/* 手中魔杖 */}
        <Line x1="15" y1="-10" x2="18" y2="-25" stroke={gold} strokeWidth={1.5} />
        <Circle cx="18" cy="-28" r="3" fill="none" stroke={gold} strokeWidth={1} />

        {/* 左臂 - 指地 */}
        <Path d="M0 15 L-15 35" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 腿 */}
        <Path d="M0 40 L-8 60" stroke={stroke.white} strokeWidth={2} fill="none" />
        <Path d="M0 40 L8 60" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 长袍轮廓 */}
        <Path
          d="M-12 15 Q-15 30, -12 45 L0 50 L12 45 Q15 30, 12 15"
          stroke={stroke.white}
          strokeWidth={1}
          fill="none"
          opacity={0.5}
        />
      </G>

      {/* 桌子 */}
      <G transform="translate(60, 135)">
        <Path d="M-35 0 L35 0" stroke={stroke.white} strokeWidth={1.5} />
        <Path d="M-30 0 L-25 10" stroke={stroke.white} strokeWidth={1} opacity={0.5} />
        <Path d="M30 0 L25 10" stroke={stroke.white} strokeWidth={1} opacity={0.5} />
      </G>

      {/* 四元素 - 桌上 */}
      <G transform="translate(60, 128)">
        {/* 权杖 (火) */}
        <G transform="translate(-25, 0)">
          <Line x1="0" y1="5" x2="0" y2="-8" stroke={elements.fire} strokeWidth={1.5} />
          <Circle cx="0" cy="-10" r="2" fill={elements.fire} opacity={0.5} />
        </G>

        {/* 圣杯 (水) */}
        <G transform="translate(-8, 0)">
          <Path
            d="M-4 5 L-3 -2 Q0 -5, 3 -2 L4 5 Z"
            stroke={elements.water}
            strokeWidth={1}
            fill="none"
          />
        </G>

        {/* 宝剑 (风) */}
        <G transform="translate(8, 0)">
          <Line x1="0" y1="5" x2="0" y2="-10" stroke={elements.air} strokeWidth={1.5} />
          <Path d="M-3 -8 L0 -10 L3 -8" stroke={elements.air} strokeWidth={1} fill="none" />
        </G>

        {/* 星币 (土) */}
        <G transform="translate(25, 0)">
          <Circle cx="0" cy="-2" r="5" stroke={elements.earth} strokeWidth={1} fill="none" />
          <Circle cx="0" cy="-2" r="2" fill={elements.earth} opacity={0.3} />
        </G>
      </G>

      {/* 能量光环 */}
      <Ellipse
        cx="60"
        cy="70"
        rx="35"
        ry="50"
        stroke={gold}
        strokeWidth={0.5}
        fill="none"
        opacity={0.2}
        strokeDasharray="2 4"
      />

      {/* 装饰星点 */}
      <Circle cx="20" cy="45" r="1.5" fill={gold} opacity={0.4} />
      <Circle cx="100" cy="50" r="1.5" fill={gold} opacity={0.4} />
      <Circle cx="30" cy="90" r="1" fill={gold} opacity={0.3} />
      <Circle cx="90" cy="85" r="1" fill={gold} opacity={0.3} />

      {/* 卡牌编号 */}
      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill={gold}>
            I
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheMagician;
