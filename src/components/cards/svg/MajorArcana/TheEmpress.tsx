/**
 * The Empress (III) - 女皇
 * 极简线条风格
 *
 * 视觉元素：
 * - 坐姿人物
 * - 十二星冠
 * - 小麦/丰收符号
 * - 金星符号 ♀
 * - 自然元素（树木、花朵）
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

export const TheEmpress: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;
  const earth = CARD_COLORS.elements.earth;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="empress-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#1A2E1A" />
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
        fill="url(#empress-bg)"
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

      {/* 自然背景 - 树木轮廓 */}
      <G opacity={0.2}>
        <Path
          d="M10 145 L10 80 Q5 70, 10 60 Q15 50, 10 40"
          stroke={earth}
          strokeWidth={1}
          fill="none"
        />
        <Path
          d="M110 145 L110 85 Q115 75, 110 65 Q105 55, 110 45"
          stroke={earth}
          strokeWidth={1}
          fill="none"
        />
      </G>

      {/* 金星符号 - 左上 */}
      <G transform="translate(25, 30)">
        <Circle cx="0" cy="0" r="5" stroke={gold} strokeWidth={1} fill="none" />
        <Line x1="0" y1="5" x2="0" y2="12" stroke={gold} strokeWidth={1} />
        <Line x1="-4" y1="9" x2="4" y2="9" stroke={gold} strokeWidth={1} />
      </G>

      {/* 人物 - 坐姿 */}
      <G transform="translate(60, 70)">
        {/* 头部 */}
        <Circle cx="0" cy="0" r="8" fill="none" stroke={stroke.white} strokeWidth={2} />

        {/* 十二星冠 */}
        <G transform="translate(0, -12)">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
            const rad = ((angle - 90) * Math.PI) / 180;
            const x = Math.cos(rad) * 12;
            const y = Math.sin(rad) * 6 - 3;
            return <Circle key={i} cx={x} cy={y} r="1.5" fill={gold} />;
          })}
        </G>

        {/* 身体 */}
        <Path d="M0 8 L0 35" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 手臂 */}
        <Path d="M0 15 L-18 20" stroke={stroke.white} strokeWidth={2} fill="none" />
        <Path d="M0 15 L15 30" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 权杖（小麦） */}
        <G transform="translate(18, 33)">
          <Line x1="0" y1="0" x2="5" y2="-20" stroke={gold} strokeWidth={1.5} />
          <Circle cx="6" cy="-22" r="3" fill="none" stroke={gold} strokeWidth={1} />
          <Circle cx="4" cy="-18" r="2" fill="none" stroke={gold} strokeWidth={0.5} />
          <Circle cx="8" cy="-18" r="2" fill="none" stroke={gold} strokeWidth={0.5} />
        </G>

        {/* 长裙 */}
        <Path
          d="M-18 35 Q-22 55, -25 75 L0 80 L25 75 Q22 55, 18 35"
          stroke={stroke.white}
          strokeWidth={1.5}
          fill="none"
        />
      </G>

      {/* 花朵装饰 */}
      <G transform="translate(25, 130)">
        <Circle cx="0" cy="0" r="4" stroke={earth} strokeWidth={1} fill="none" />
        <Circle cx="0" cy="0" r="1.5" fill={earth} opacity={0.5} />
      </G>
      <G transform="translate(95, 125)">
        <Circle cx="0" cy="0" r="4" stroke={earth} strokeWidth={1} fill="none" />
        <Circle cx="0" cy="0" r="1.5" fill={earth} opacity={0.5} />
      </G>

      {/* 小麦/草地 */}
      <G transform="translate(60, 145)" opacity={0.4}>
        <Path
          d="M-30 0 L-28 -8 M-25 0 L-23 -10 M-20 0 L-18 -7"
          stroke={earth}
          strokeWidth={1}
          fill="none"
        />
        <Path
          d="M30 0 L28 -8 M25 0 L23 -10 M20 0 L18 -7"
          stroke={earth}
          strokeWidth={1}
          fill="none"
        />
      </G>

      {/* 卡牌编号 */}
      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="11" fontWeight="700" fill={gold}>
            III
          </SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheEmpress;
