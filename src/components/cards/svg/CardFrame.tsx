/**
 * Card Frame Component
 * 卡牌通用边框和背景
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS } from './config';

interface CardFrameProps {
  width?: number;
  height?: number;
  gradientColors?: readonly [string, string];
  borderColor?: string;
  children?: React.ReactNode;
}

export const CardFrame: React.FC<CardFrameProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  gradientColors = ['#1A0E2E', '#0A0E1A'],
  borderColor = CARD_COLORS.stroke.gold,
  children,
}) => {
  const scale = width / SVG_CONFIG.width;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="card-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={gradientColors[0]} />
          <Stop offset="1" stopColor={gradientColors[1]} />
        </LinearGradient>
      </Defs>

      {/* 背景 */}
      <Rect
        x="0"
        y="0"
        width={SVG_CONFIG.width}
        height={SVG_CONFIG.height}
        rx={SVG_CONFIG.borderRadius}
        fill="url(#card-bg)"
      />

      {/* 外边框 */}
      <Rect
        x="2"
        y="2"
        width={SVG_CONFIG.width - 4}
        height={SVG_CONFIG.height - 4}
        rx={SVG_CONFIG.borderRadius - 1}
        fill="none"
        stroke={borderColor}
        strokeWidth={1}
        opacity={0.6}
      />

      {/* 内边框 */}
      <Rect
        x="6"
        y="6"
        width={SVG_CONFIG.width - 12}
        height={SVG_CONFIG.height - 12}
        rx={SVG_CONFIG.borderRadius - 2}
        fill="none"
        stroke={borderColor}
        strokeWidth={0.5}
        opacity={0.3}
      />

      {/* 内容区域 */}
      <G>{children}</G>
    </Svg>
  );
};

export default CardFrame;
