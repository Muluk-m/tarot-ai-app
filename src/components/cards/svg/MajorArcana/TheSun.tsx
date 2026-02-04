/**
 * The Sun (XIX) - 太阳
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

export const TheSun: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="sun-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#sun-bg)" />
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

      {/* 太阳 */}
      <G transform="translate(60, 40)">
        {/* 太阳圆盘 */}
        <Circle cx="0" cy="0" r="22" fill="none" stroke={gold} strokeWidth={2.5} />
        {/* 内圈 */}
        <Circle cx="0" cy="0" r="16" fill={gold} opacity={0.15} />

        {/* 太阳脸（简化） */}
        {/* 眼睛 */}
        <Circle cx="-6" cy="-3" r="2" fill={gold} opacity={0.7} />
        <Circle cx="6" cy="-3" r="2" fill={gold} opacity={0.7} />
        {/* 微笑 */}
        <Path d="M-6 5 Q0 12, 6 5" stroke={gold} strokeWidth={1.5} fill="none" />

        {/* 直光芒（8条） */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <Line
            key={`straight-${i}`}
            x1={24 * Math.cos((angle * Math.PI) / 180)}
            y1={24 * Math.sin((angle * Math.PI) / 180)}
            x2={35 * Math.cos((angle * Math.PI) / 180)}
            y2={35 * Math.sin((angle * Math.PI) / 180)}
            stroke={gold}
            strokeWidth={2}
          />
        ))}

        {/* 波浪光芒（8条，交替） */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 24 * Math.cos(rad);
          const y1 = 24 * Math.sin(rad);
          const x2 = 32 * Math.cos(rad);
          const y2 = 32 * Math.sin(rad);
          return (
            <Path
              key={`wavy-${i}`}
              d={`M${x1} ${y1} Q${(x1 + x2) / 2 + 3 * Math.cos(rad + Math.PI / 2)} ${(y1 + y2) / 2 + 3 * Math.sin(rad + Math.PI / 2)}, ${x2} ${y2}`}
              stroke={gold}
              strokeWidth={1.5}
              fill="none"
            />
          );
        })}
      </G>

      {/* 向日葵墙 */}
      <G transform="translate(60, 145)">
        {/* 花朵1 */}
        <G transform="translate(-35, 0)">
          <Circle cx="0" cy="0" r="6" fill="none" stroke={gold} strokeWidth={1} />
          <Circle cx="0" cy="0" r="3" fill={gold} opacity={0.3} />
        </G>
        {/* 花朵2 */}
        <G transform="translate(-15, -5)">
          <Circle cx="0" cy="0" r="7" fill="none" stroke={gold} strokeWidth={1} />
          <Circle cx="0" cy="0" r="3.5" fill={gold} opacity={0.3} />
        </G>
        {/* 花朵3 */}
        <G transform="translate(10, 0)">
          <Circle cx="0" cy="0" r="6" fill="none" stroke={gold} strokeWidth={1} />
          <Circle cx="0" cy="0" r="3" fill={gold} opacity={0.3} />
        </G>
        {/* 花朵4 */}
        <G transform="translate(32, -3)">
          <Circle cx="0" cy="0" r="5" fill="none" stroke={gold} strokeWidth={1} />
          <Circle cx="0" cy="0" r="2.5" fill={gold} opacity={0.3} />
        </G>
      </G>

      {/* 孩子骑白马 */}
      <G transform="translate(60, 100)">
        {/* 孩子 */}
        {/* 头部 */}
        <Circle cx="-5" cy="-25" r="7" fill="none" stroke={stroke.white} strokeWidth={1.5} />
        {/* 光环/花环 */}
        <Path d="M-12 -30 Q-5 -35, 2 -30" stroke={gold} strokeWidth={1} fill="none" />
        {/* 身体 */}
        <Line x1="-5" y1="-18" x2="-5" y2="-5" stroke={stroke.white} strokeWidth={1.5} />
        {/* 手臂张开 */}
        <Path d="M-5 -12 L-18 -15" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M-5 -12 L8 -15" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        {/* 红旗 */}
        <G transform="translate(12, -20)">
          <Line x1="0" y1="0" x2="0" y2="15" stroke={stroke.silver} strokeWidth={1.5} />
          <Path
            d="M0 0 L12 3 L0 6"
            stroke={CARD_COLORS.elements.fire}
            strokeWidth={1}
            fill="none"
          />
        </G>

        {/* 白马 */}
        {/* 马头 */}
        <Path
          d="M-25 -5 Q-30 -15, -20 -18 Q-10 -15, -15 -5"
          stroke={stroke.white}
          strokeWidth={1.5}
          fill="none"
        />
        {/* 马身 */}
        <Path
          d="M-15 -3 Q5 -8, 20 -3 Q25 5, 20 15 L-20 15 Q-25 5, -15 -3"
          stroke={stroke.white}
          strokeWidth={1.5}
          fill="none"
        />
        {/* 马腿 */}
        <Line x1="-15" y1="15" x2="-18" y2="32" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="-5" y1="15" x2="-2" y2="32" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="5" y1="15" x2="8" y2="32" stroke={stroke.white} strokeWidth={1.5} />
        <Line x1="15" y1="15" x2="18" y2="32" stroke={stroke.white} strokeWidth={1.5} />
        {/* 马尾 */}
        <Path d="M20 10 Q30 15, 25 25" stroke={stroke.white} strokeWidth={1} fill="none" />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill={gold}>
            XIX
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheSun;
