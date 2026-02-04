/**
 * The World (XXI) - 世界
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
  Ellipse,
} from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const TheWorld: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="world-bg" x1="0" y1="0" x2="0" y2="1">
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
        fill="url(#world-bg)"
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

      {/* 月桂花环 */}
      <G transform="translate(60, 85)">
        {/* 椭圆形花环 */}
        <Ellipse
          cx="0"
          cy="0"
          rx="35"
          ry="50"
          fill="none"
          stroke={CARD_COLORS.elements.earth}
          strokeWidth={3}
        />
        {/* 花环上的叶子装饰（简化） */}
        <Path
          d="M-35 -10 Q-40 -15, -35 -20"
          stroke={CARD_COLORS.elements.earth}
          strokeWidth={1}
          fill="none"
        />
        <Path
          d="M-35 10 Q-40 15, -35 20"
          stroke={CARD_COLORS.elements.earth}
          strokeWidth={1}
          fill="none"
        />
        <Path
          d="M35 -10 Q40 -15, 35 -20"
          stroke={CARD_COLORS.elements.earth}
          strokeWidth={1}
          fill="none"
        />
        <Path
          d="M35 10 Q40 15, 35 20"
          stroke={CARD_COLORS.elements.earth}
          strokeWidth={1}
          fill="none"
        />
        {/* 顶部和底部的丝带 */}
        <G transform="translate(0, -52)">
          <Path d="M-8 0 Q0 5, 8 0" stroke={gold} strokeWidth={1.5} fill="none" />
          <Path d="M-5 2 L-8 8" stroke={gold} strokeWidth={1} fill="none" />
          <Path d="M5 2 L8 8" stroke={gold} strokeWidth={1} fill="none" />
        </G>
        <G transform="translate(0, 52)">
          <Path d="M-8 0 Q0 -5, 8 0" stroke={gold} strokeWidth={1.5} fill="none" />
          <Path d="M-5 -2 L-8 -8" stroke={gold} strokeWidth={1} fill="none" />
          <Path d="M5 -2 L8 -8" stroke={gold} strokeWidth={1} fill="none" />
        </G>
      </G>

      {/* 舞者 */}
      <G transform="translate(60, 85)">
        {/* 头部 */}
        <Circle cx="0" cy="-25" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />

        {/* 身体 */}
        <Line x1="0" y1="-17" x2="0" y2="10" stroke={stroke.white} strokeWidth={2} />

        {/* 左腿（交叉成4字形） */}
        <Path d="M0 10 L-15 30" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 右腿（弯曲） */}
        <Path d="M0 10 L10 20 L5 30" stroke={stroke.white} strokeWidth={1.5} fill="none" />

        {/* 手臂持权杖 */}
        <Path d="M0 -10 L-20 -5" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 -10 L20 -5" stroke={stroke.white} strokeWidth={1.5} fill="none" />

        {/* 左手权杖 */}
        <G transform="translate(-22, -5)">
          <Line x1="0" y1="-8" x2="0" y2="8" stroke={gold} strokeWidth={2} />
        </G>
        {/* 右手权杖 */}
        <G transform="translate(22, -5)">
          <Line x1="0" y1="-8" x2="0" y2="8" stroke={gold} strokeWidth={2} />
        </G>

        {/* 飘带 */}
        <Path
          d="M-5 -15 Q-15 -20, -10 -30 Q-5 -25, 5 -30 Q10 -20, 5 -15"
          stroke={gold}
          strokeWidth={1}
          fill="none"
          opacity={0.6}
        />
      </G>

      {/* 四角神秘生物 */}
      {/* 左上 - 人（水瓶座） */}
      <G transform="translate(18, 25)">
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 脸部特征 */}
        <Circle cx="-2" cy="-1" r="1" fill={stroke.silver} />
        <Circle cx="2" cy="-1" r="1" fill={stroke.silver} />
      </G>

      {/* 右上 - 鹰（天蝎座） */}
      <G transform="translate(102, 25)">
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 鹰喙 */}
        <Path d="M-2 0 L0 3 L2 0" stroke={stroke.white} strokeWidth={1} fill="none" />
        {/* 眼睛 */}
        <Circle cx="0" cy="-2" r="1.5" fill={stroke.silver} />
      </G>

      {/* 左下 - 牛（金牛座） */}
      <G transform="translate(18, 155)">
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 牛角 */}
        <Path d="M-6 -6 L-8 -10" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M6 -6 L8 -10" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 右下 - 狮（狮子座） */}
      <G transform="translate(102, 155)">
        <Circle cx="0" cy="0" r="8" fill="none" stroke={gold} strokeWidth={1.5} />
        {/* 鬃毛 */}
        <Path d="M-8 -4 Q-12 0, -8 4" stroke={gold} strokeWidth={1} fill="none" />
        <Path d="M8 -4 Q12 0, 8 4" stroke={gold} strokeWidth={1} fill="none" />
        {/* 眼睛 */}
        <Circle cx="-2" cy="-1" r="1" fill={gold} />
        <Circle cx="2" cy="-1" r="1" fill={gold} />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill={gold}>
            XXI
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheWorld;
