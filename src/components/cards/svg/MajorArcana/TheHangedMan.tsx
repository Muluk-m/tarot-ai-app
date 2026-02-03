/**
 * The Hanged Man (XII) - 倒吊人
 * 极简线条风格
 */

import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, G, Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { SVG_CONFIG, CARD_COLORS, MAJOR_GRADIENTS } from '../config';
import type { CardSVGProps } from '../types';

export const TheHangedMan: React.FC<CardSVGProps> = ({
  width = SVG_CONFIG.width,
  height = SVG_CONFIG.height,
  showNumber = true,
}) => {
  const stroke = CARD_COLORS.stroke;
  const gold = CARD_COLORS.elements.spirit;

  return (
    <Svg width={width} height={height} viewBox={SVG_CONFIG.viewBox}>
      <Defs>
        <LinearGradient id="hangedman-bg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={MAJOR_GRADIENTS.background[0]} />
          <Stop offset="1" stopColor={MAJOR_GRADIENTS.background[1]} />
        </LinearGradient>
      </Defs>

      <Rect x="0" y="0" width="120" height="180" rx={SVG_CONFIG.borderRadius} fill="url(#hangedman-bg)" />
      <Rect x="3" y="3" width="114" height="174" rx={SVG_CONFIG.borderRadius - 1} fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />

      {/* T形绞刑架（由活木构成） */}
      <G transform="translate(60, 15)">
        {/* 横梁 */}
        <Line x1="-35" y1="0" x2="35" y2="0" stroke={stroke.silver} strokeWidth={3} />
        {/* 左支柱 */}
        <Line x1="-35" y1="0" x2="-35" y2="130" stroke={stroke.silver} strokeWidth={3} />
        {/* 右支柱 */}
        <Line x1="35" y1="0" x2="35" y2="130" stroke={stroke.silver} strokeWidth={3} />
        {/* 叶子装饰（表示活木） */}
        <Path d="M-38 20 Q-45 15, -42 25" stroke={CARD_COLORS.elements.earth} strokeWidth={1} fill="none" />
        <Path d="M-38 60 Q-45 55, -42 65" stroke={CARD_COLORS.elements.earth} strokeWidth={1} fill="none" />
        <Path d="M38 30 Q45 25, 42 35" stroke={CARD_COLORS.elements.earth} strokeWidth={1} fill="none" />
        <Path d="M38 70 Q45 65, 42 75" stroke={CARD_COLORS.elements.earth} strokeWidth={1} fill="none" />
      </G>

      {/* 倒吊人 */}
      <G transform="translate(60, 55)">
        {/* 绑着的右脚 */}
        <Line x1="0" y1="-40" x2="0" y2="-20" stroke={gold} strokeWidth={1.5} />

        {/* 右腿（直立绑着的） */}
        <Line x1="0" y1="-20" x2="0" y2="15" stroke={stroke.white} strokeWidth={2} />

        {/* 左腿（弯曲成4字形） */}
        <Path d="M0 15 L-12 5 L-8 -5" stroke={stroke.white} strokeWidth={2} fill="none" />

        {/* 身体 */}
        <Line x1="0" y1="15" x2="0" y2="45" stroke={stroke.white} strokeWidth={2} />

        {/* 手臂（背后交叉，形成三角形） */}
        <Path d="M0 30 L-15 40 L-10 50" stroke={stroke.white} strokeWidth={1.5} fill="none" />
        <Path d="M0 30 L15 40 L10 50" stroke={stroke.white} strokeWidth={1.5} fill="none" />

        {/* 头部（倒挂） */}
        <Circle cx="0" cy="55" r="10" fill="none" stroke={stroke.white} strokeWidth={2} />

        {/* 光环 */}
        <Circle cx="0" cy="55" r="15" fill="none" stroke={gold} strokeWidth={1} opacity={0.5} />
        <Circle cx="0" cy="55" r="18" fill="none" stroke={gold} strokeWidth={0.5} opacity={0.3} />

        {/* 平静的表情 */}
        <Line x1="-3" y1="53" x2="-1" y2="53" stroke={stroke.white} strokeWidth={1} />
        <Line x1="1" y1="53" x2="3" y2="53" stroke={stroke.white} strokeWidth={1} />
        <Path d="M-2 58 Q0 60, 2 58" stroke={stroke.white} strokeWidth={1} fill="none" />
      </G>

      {showNumber && (
        <G>
          <Circle cx="60" cy="160" r="10" fill={gold} opacity={0.15} />
          <SvgText x="60" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill={gold}>XII</SvgText>
        </G>
      )}
    </Svg>
  );
};

export default TheHangedMan;
