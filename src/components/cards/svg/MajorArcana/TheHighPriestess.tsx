/**
 * The High Priestess (II) - 女祭司
 * 极简线条风格
 *
 * 视觉元素：
 * - 坐姿人物轮廓
 * - 两根柱子 (B和J)
 * - 头戴新月冠
 * - 帷幕背景
 * - 手持卷轴
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const TheHighPriestess: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;
  const purple = CARD_COLORS.accent.purple;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="priestess-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#1A1A2E" />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      {/* 背景 */}
      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#priestess-bg)" />

      {/* 边框 */}
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {/* 帷幕 - 背景装饰 */}
      <G opacity={0.15}>
        <Path d="M15 20 Q20 60, 15 100 Q10 130, 15 145" stroke={purple} strokeWidth={1} fill="none" />
        <Path d="M105 20 Q100 60, 105 100 Q110 130, 105 145" stroke={purple} strokeWidth={1} fill="none" />
        <Path d="M15 20 Q60 35, 105 20" stroke={purple} strokeWidth={1} fill="none" />
      </G>

      {/* 左柱 - B */}
      <G transform="translate(22, 75)">
        <Rect x="-6" y="-40" width="12" height="80" fill="none" stroke={stroke.silver} strokeWidth={1.5} rx={2} />
        <SvgText x="0" y="-25" textAnchor="middle" fontSize="10" fontWeight="600" fill={stroke.silver}>
          B
        </SvgText>
      </G>

      {/* 右柱 - J */}
      <G transform="translate(98, 75)">
        <Rect x="-6" y="-40" width="12" height="80" fill="none" stroke={stroke.white} strokeWidth={1.5} rx={2} />
        <SvgText x="0" y="-25" textAnchor="middle" fontSize="10" fontWeight="600" fill={stroke.white}>
          J
        </SvgText>
      </G>

      {/* 人物 - 坐姿 */}
      <G transform="translate(60, 70)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />

        {/* 新月冠 */}
        <Path
          d="M-10 -12 Q-5 -18, 0 -15 Q5 -18, 10 -12"
          stroke={gold}
          strokeWidth={1.5}
          fill="none"
        />
        <Circle cx="0" cy="-18" r="3" fill="none" stroke={gold} strokeWidth={1} />

        {/* 身体（坐姿） */}
        <Path d="M0 8 L0 35" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 双臂持卷轴 */}
        <Path d="M0 18 L-12 25" stroke={stroke.white} strokeWidth={2} fill="none" />
        <Path d="M0 18 L12 25" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 卷轴 */}
        <G transform="translate(0, 30)">
          <Rect x="-8" y="-5" width="16" height="10" fill="none" stroke={gold} strokeWidth={1} rx={1} />
          <Line x1="-5" y1="-2" x2="5" y2="-2" stroke={gold} strokeWidth={0.5} opacity={0.5} />
          <Line x1="-5" y1="2" x2="5" y2="2" stroke={gold} strokeWidth={0.5} opacity={0.5} />
        </G>

        {/* 长裙轮廓 */}
        <Path
          d="M-15 35 Q-18 50, -20 65 L0 70 L20 65 Q18 50, 15 35"
          stroke={stroke.white}
          strokeWidth={1}
          fill="none"
          opacity={0.6}
        />
      </G>

      {/* 月亮 - 左上角 */}
      <G transform="translate(20, 25)">
        <Path
          d="M5 -5 Q-2 0, 5 5 Q10 0, 5 -5"
          stroke={stroke.silver}
          strokeWidth={1}
          fill="none"
        />
      </G>

      {/* 装饰 - 星点 */}
      <Circle cx="45" cy="25" r="1" fill={stroke.silver} opacity={0.5} />
      <Circle cx="75" cy="28" r="1" fill={stroke.silver} opacity={0.5} />
      <Circle cx="55" cy="45" r="1.5" fill={gold} opacity={0.3} />
      <Circle cx="65" cy="50" r="1" fill={gold} opacity={0.3} />

      {/* 地面水池暗示 */}
      <Path
        d="M35 140 Q60 145, 85 140"
        stroke={CARD_COLORS.elements.water}
        strokeWidth={1}
        fill="none"
        opacity={0.3}
      />

      {/* 卡牌编号 */}
      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="12" fontWeight="700" fill={gold}>
            II
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheHighPriestess;
