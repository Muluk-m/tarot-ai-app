/**
 * The Fool (0) - 愚者
 * 极简线条风格
 *
 * 视觉元素：
 * - 人物剪影站在悬崖边
 * - 右上角太阳（圆+光芒）
 * - 脚边小狗
 * - 手持包袱的杖
 * - 虚线悬崖边缘
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const TheFool: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="fool-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      {/* 背景 */}
      <Rect
        x="0" y="0"
        width="120" height="180"
        rx={SVG_CONFIG.borderRadius}
        fill="url(#fool-bg)"
      />

      {/* 边框 */}
      <Rect
        x="3" y="3"
        width="114" height="174"
        rx={SVG_CONFIG.borderRadius - 1}
        fill="none"
        stroke={gold}
        strokeWidth={1}
        opacity={0.5}
      />

      {/* 太阳 - 右上角 */}
      <G transform="translate(95, 28)">
        <Circle cx="0" cy="0" r="10" fill="none" stroke={gold} strokeWidth={1.5} />
        {/* 8道光芒 */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 12;
          const y1 = Math.sin(rad) * 12;
          const x2 = Math.cos(rad) * 16;
          const y2 = Math.sin(rad) * 16;
          return (
            <Line
              key={i}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke={gold}
              strokeWidth={1}
            />
          );
        })}
      </G>

      {/* 人物剪影 - 中央 */}
      <G transform="translate(60, 85)">
        {/* 头部 */}
        <Circle cx="0" cy="-30" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />

        {/* 身体 */}
        <Path
          d="M0 -22 L0 5"
          stroke={stroke.white}
          strokeWidth={2}
          fill="none"
        />

        {/* 左臂（举起持杖） */}
        <Path
          d="M0 -15 L-15 -25"
          stroke={stroke.white}
          strokeWidth={2}
          fill="none"
        />

        {/* 右臂 */}
        <Path
          d="M0 -15 L12 -5"
          stroke={stroke.white}
          strokeWidth={2}
          fill="none"
        />

        {/* 左腿（前迈） */}
        <Path
          d="M0 5 L-8 30"
          stroke={stroke.white}
          strokeWidth={2}
          fill="none"
        />

        {/* 右腿 */}
        <Path
          d="M0 5 L10 28"
          stroke={stroke.white}
          strokeWidth={2}
          fill="none"
        />

        {/* 包袱杖 */}
        <Line x1="-15" y1="-25" x2="-25" y2="-45" stroke={stroke.white} strokeWidth={1.5} />
        <Circle cx="-25" cy="-48" r="5" fill="none" stroke={gold} strokeWidth={1.5} />
      </G>

      {/* 小狗 - 脚边 */}
      <G transform="translate(85, 115)">
        {/* 身体 */}
        <Circle cx="0" cy="0" r="6" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 头 */}
        <Circle cx="6" cy="-4" r="4" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 尾巴 */}
        <Path d="M-5 -2 Q-10 -8, -8 -12" stroke={stroke.white} strokeWidth={1} fill="none" />
        {/* 腿 */}
        <Line x1="-3" y1="5" x2="-3" y2="10" stroke={stroke.white} strokeWidth={1} />
        <Line x1="3" y1="5" x2="3" y2="10" stroke={stroke.white} strokeWidth={1} />
      </G>

      {/* 悬崖边缘 - 虚线 */}
      <Path
        d="M15 130 Q40 125, 60 128 Q80 131, 105 127"
        stroke={CARD_COLORS.accent.purple}
        strokeWidth={1.5}
        strokeDasharray="4 3"
        fill="none"
        opacity={0.7}
      />

      {/* 一些小装饰 - 飘落的花瓣/叶子 */}
      <Circle cx="25" cy="60" r="2" fill={gold} opacity={0.4} />
      <Circle cx="40" cy="75" r="1.5" fill={gold} opacity={0.3} />
      <Circle cx="95" cy="70" r="1.5" fill={gold} opacity={0.3} />

      {/* 卡牌编号 */}
      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText
            x="60"
            y="165"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={gold}
          >
            0
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheFool;
