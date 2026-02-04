/**
 * Judgement (XX) - 审判
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

export const Judgement: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="judgement-bg" x1="0" y1="0" x2="0" y2="1">
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
        fill="url(#judgement-bg)"
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

      {/* 天使加百列 */}
      <G transform="translate(60, 35)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="10" fill="none" stroke={gold} strokeWidth={2} />
        {/* 光环 */}
        <Circle cx="0" cy="-12" r="5" fill="none" stroke={gold} strokeWidth={1} />

        {/* 翅膀 */}
        <G opacity={0.8}>
          {/* 左翼 */}
          <Path
            d="M-10 8 Q-35 -5, -40 20 Q-30 10, -25 25 Q-18 12, -10 15"
            stroke={stroke.white}
            strokeWidth={1.5}
            fill="none"
          />
          {/* 右翼 */}
          <Path
            d="M10 8 Q35 -5, 40 20 Q30 10, 25 25 Q18 12, 10 15"
            stroke={stroke.white}
            strokeWidth={1.5}
            fill="none"
          />
        </G>

        {/* 吹号角 */}
        <G transform="translate(0, 20)">
          {/* 号角 */}
          <Path d="M-5 0 L-25 -10" stroke={gold} strokeWidth={2} fill="none" />
          <Path d="M-25 -10 L-30 -15 L-30 -5 L-25 -10" stroke={gold} strokeWidth={1} fill="none" />
          {/* 旗帜 */}
          <G transform="translate(-25, -10)">
            <Path d="M-5 -5 L5 0 L-5 5" stroke={stroke.white} strokeWidth={1} fill="none" />
            {/* 十字 */}
            <Line
              x1="-2"
              y1="-2"
              x2="-2"
              y2="2"
              stroke={CARD_COLORS.elements.fire}
              strokeWidth={1}
            />
            <Line x1="-4" y1="0" x2="0" y2="0" stroke={CARD_COLORS.elements.fire} strokeWidth={1} />
          </G>
        </G>

        {/* 云朵 */}
        <Path
          d="M-45 25 Q-35 20, -25 25 Q-15 20, -5 25"
          stroke={stroke.silver}
          strokeWidth={1}
          fill="none"
          opacity={0.5}
        />
        <Path
          d="M5 25 Q15 20, 25 25 Q35 20, 45 25"
          stroke={stroke.silver}
          strokeWidth={1}
          fill="none"
          opacity={0.5}
        />
      </G>

      {/* 复活的人们 */}
      {/* 左边的人 */}
      <G transform="translate(25, 100)">
        {/* 棺材 */}
        <Rect
          x="-10"
          y="15"
          width="20"
          height="35"
          fill="none"
          stroke={stroke.silver}
          strokeWidth={1}
          rx={2}
        />
        {/* 人物 */}
        <Circle cx="0" cy="0" r="6" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="0" y1="6" x2="0" y2="20" stroke={stroke.white} strokeWidth={1.5} />
        {/* 手臂向上 */}
        <Path d="M0 10 L-8 0" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 10 L8 0" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 中间的人 */}
      <G transform="translate(60, 95)">
        {/* 棺材 */}
        <Rect
          x="-10"
          y="20"
          width="20"
          height="35"
          fill="none"
          stroke={stroke.silver}
          strokeWidth={1}
          rx={2}
        />
        {/* 人物（稍大，代表孩子） */}
        <Circle cx="0" cy="0" r="5" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="0" y1="5" x2="0" y2="22" stroke={stroke.white} strokeWidth={1.5} />
        {/* 手臂向上 */}
        <Path d="M0 10 L-6 2" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 10 L6 2" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 右边的人 */}
      <G transform="translate(95, 100)">
        {/* 棺材 */}
        <Rect
          x="-10"
          y="15"
          width="20"
          height="35"
          fill="none"
          stroke={stroke.silver}
          strokeWidth={1}
          rx={2}
        />
        {/* 人物 */}
        <Circle cx="0" cy="0" r="6" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="0" y1="6" x2="0" y2="20" stroke={stroke.white} strokeWidth={1.5} />
        {/* 手臂向上 */}
        <Path d="M0 10 L-8 0" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 10 L8 0" stroke={stroke.white} strokeWidth={1.5} fill="none" />
      </G>

      {/* 水面/海 */}
      <G transform="translate(60, 145)">
        <Path
          d="M-50 5 Q-30 0, -10 5 Q10 10, 30 5 Q50 0, 55 5"
          stroke={CARD_COLORS.elements.water}
          strokeWidth={1}
          fill="none"
          opacity={0.4}
        />
      </G>

      {/* 远处的山 */}
      <Path
        d="M5 150 L15 140 L25 150"
        stroke={stroke.silver}
        strokeWidth={1}
        fill="none"
        opacity={0.3}
      />
      <Path
        d="M95 150 L105 140 L115 150"
        stroke={stroke.silver}
        strokeWidth={1}
        fill="none"
        opacity={0.3}
      />

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="12" fontWeight="700" fill={gold}>
            XX
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default Judgement;
