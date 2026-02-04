/**
 * The Emperor (IV) - 皇帝
 * 极简线条风格
 *
 * 视觉元素：
 * - 坐在宝座上的人物
 * - 公羊头装饰
 * - 权杖（安卡符号）
 * - 宝球
 * - 山脉背景
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

export const TheEmperor: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;
  const fire = CARD_COLORS.elements.fire;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="emperor-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#2E1A1A" />
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
        fill="url(#emperor-bg)"
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

      {/* 山脉背景 */}
      <G opacity={0.2}>
        <Path
          d="M0 70 L20 40 L40 65 L55 35 L70 60 L90 30 L110 55 L120 45 L120 70 Z"
          stroke={fire}
          strokeWidth={1}
          fill="none"
        />
      </G>

      {/* 宝座 */}
      <G transform="translate(60, 100)">
        {/* 椅背 */}
        <Path d="M-25 -50 L-25 20 M25 -50 L25 20" stroke={stroke.white} strokeWidth={1.5} />
        {/* 公羊头装饰 - 左 */}
        <G transform="translate(-25, -55)">
          <Circle cx="0" cy="0" r="5" stroke={gold} strokeWidth={1} fill="none" />
          <Path d="M-6 -3 Q-10 -8, -8 -12" stroke={gold} strokeWidth={1} fill="none" />
          <Path d="M6 -3 Q10 -8, 8 -12" stroke={gold} strokeWidth={1} fill="none" />
        </G>
        {/* 公羊头装饰 - 右 */}
        <G transform="translate(25, -55)">
          <Circle cx="0" cy="0" r="5" stroke={gold} strokeWidth={1} fill="none" />
          <Path d="M-6 -3 Q-10 -8, -8 -12" stroke={gold} strokeWidth={1} fill="none" />
          <Path d="M6 -3 Q10 -8, 8 -12" stroke={gold} strokeWidth={1} fill="none" />
        </G>
        {/* 座面 */}
        <Path d="M-28 20 L28 20" stroke={stroke.white} strokeWidth={1.5} />
      </G>

      {/* 人物 */}
      <G transform="translate(60, 65)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />

        {/* 皇冠 */}
        <Path
          d="M-8 -10 L-5 -18 L0 -12 L5 -18 L8 -10"
          stroke={gold}
          strokeWidth={1.5}
          fill="none"
        />

        {/* 胡须 */}
        <Path
          d="M-4 6 L-2 12 M0 7 L0 14 M4 6 L2 12"
          stroke={stroke.white}
          strokeWidth={1}
          opacity={0.6}
        />

        {/* 身体 */}
        <Path d="M0 8 L0 40" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 右臂持权杖 */}
        <Path d="M0 15 L20 10" stroke={stroke.white} strokeWidth={2} fill="none" />
        {/* 安卡权杖 */}
        <G transform="translate(25, 5)">
          <Circle cx="0" cy="-8" r="4" stroke={gold} strokeWidth={1.5} fill="none" />
          <Line x1="0" y1="-4" x2="0" y2="15" stroke={gold} strokeWidth={1.5} />
          <Line x1="-5" y1="5" x2="5" y2="5" stroke={gold} strokeWidth={1.5} />
        </G>

        {/* 左臂持宝球 */}
        <Path d="M0 15 L-18 20" stroke={stroke.white} strokeWidth={2} fill="none" />
        <G transform="translate(-22, 22)">
          <Circle cx="0" cy="0" r="5" stroke={gold} strokeWidth={1} fill="none" />
          <Line x1="0" y1="-5" x2="0" y2="-10" stroke={gold} strokeWidth={1} />
          <Line x1="-3" y1="-8" x2="3" y2="-8" stroke={gold} strokeWidth={1} />
        </G>

        {/* 腿 */}
        <Path d="M0 40 L-10 60" stroke={stroke.white} strokeWidth={2} fill="none" />
        <Path d="M0 40 L10 60" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 盔甲/长袍暗示 */}
        <Path
          d="M-12 15 L-15 40 L15 40 L12 15"
          stroke={stroke.white}
          strokeWidth={1}
          fill="none"
          opacity={0.4}
        />
      </G>

      {/* 火星符号 - 右上 */}
      <G transform="translate(95, 25)">
        <Circle cx="0" cy="0" r="5" stroke={fire} strokeWidth={1} fill="none" />
        <Path d="M4 -4 L8 -8 M8 -8 L8 -4 M8 -8 L4 -8" stroke={fire} strokeWidth={1} fill="none" />
      </G>

      {/* 卡牌编号 */}
      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="11" fontWeight="700" fill={gold}>
            IV
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheEmperor;
