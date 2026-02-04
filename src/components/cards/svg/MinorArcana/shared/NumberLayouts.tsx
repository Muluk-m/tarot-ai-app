/**
 * Number Layouts - 数字牌布局
 * 定义 Ace 到 10 的花色符号排列位置
 */

import React from 'react';
import { G } from 'react-native-svg';
import { SuitSymbol, Suit } from './SuitSymbols';

interface NumberLayoutProps {
  suit: Suit;
  count: number; // 1-10
  symbolSize?: number;
}

// 预定义的布局位置（基于 120x180 的画布，中心区域 80x120）
const LAYOUTS: Record<number, { x: number; y: number }[]> = {
  1: [{ x: 60, y: 90 }], // Ace - 中心大符号

  2: [
    { x: 60, y: 50 },
    { x: 60, y: 130 },
  ],

  3: [
    { x: 60, y: 45 },
    { x: 60, y: 90 },
    { x: 60, y: 135 },
  ],

  4: [
    { x: 40, y: 55 },
    { x: 80, y: 55 },
    { x: 40, y: 125 },
    { x: 80, y: 125 },
  ],

  5: [
    { x: 40, y: 50 },
    { x: 80, y: 50 },
    { x: 60, y: 90 },
    { x: 40, y: 130 },
    { x: 80, y: 130 },
  ],

  6: [
    { x: 40, y: 45 },
    { x: 80, y: 45 },
    { x: 40, y: 90 },
    { x: 80, y: 90 },
    { x: 40, y: 135 },
    { x: 80, y: 135 },
  ],

  7: [
    { x: 40, y: 40 },
    { x: 80, y: 40 },
    { x: 60, y: 65 },
    { x: 40, y: 90 },
    { x: 80, y: 90 },
    { x: 40, y: 140 },
    { x: 80, y: 140 },
  ],

  8: [
    { x: 40, y: 35 },
    { x: 80, y: 35 },
    { x: 40, y: 70 },
    { x: 80, y: 70 },
    { x: 40, y: 110 },
    { x: 80, y: 110 },
    { x: 40, y: 145 },
    { x: 80, y: 145 },
  ],

  9: [
    { x: 40, y: 35 },
    { x: 80, y: 35 },
    { x: 40, y: 65 },
    { x: 80, y: 65 },
    { x: 60, y: 90 },
    { x: 40, y: 115 },
    { x: 80, y: 115 },
    { x: 40, y: 145 },
    { x: 80, y: 145 },
  ],

  10: [
    { x: 40, y: 30 },
    { x: 80, y: 30 },
    { x: 60, y: 50 },
    { x: 40, y: 70 },
    { x: 80, y: 70 },
    { x: 40, y: 110 },
    { x: 80, y: 110 },
    { x: 60, y: 130 },
    { x: 40, y: 150 },
    { x: 80, y: 150 },
  ],
};

// 根据数量获取符号大小
const getSymbolSize = (count: number): number => {
  if (count === 1) return 40; // Ace 使用大符号
  if (count <= 3) return 22;
  if (count <= 6) return 18;
  return 14; // 7-10 使用较小符号
};

export const NumberLayout: React.FC<NumberLayoutProps> = ({ suit, count, symbolSize }) => {
  const positions = LAYOUTS[count] || [];
  const size = symbolSize || getSymbolSize(count);

  return (
    <G>
      {positions.map((pos, index) => (
        <SuitSymbol key={index} suit={suit} size={size} x={pos.x} y={pos.y} />
      ))}
    </G>
  );
};

export default NumberLayout;
