import React from 'react';
import Svg, { Path, Circle, Rect, Polygon, Line, G } from 'react-native-svg';
import { CardIconBase, CardIconProps } from './MajorArcanaIcons';

/**
 * Minor Arcana Suit Icons
 * Simplified symbols for Wands, Cups, Swords, and Pentacles
 */

// Wands (Fire Element) - Vertical staff with flames
export const WandSymbol: React.FC<CardIconProps & { count?: number }> = ({ color = '#EF4444', count = 1 }) => {
  const renderWand = (x: number, y: number) => (
    <G key={`wand-${x}-${y}`}>
      <Rect x={x - 2} y={y} width="4" height="40" fill={color} />
      <Path d={`M${x} ${y - 5} L${x - 5} ${y + 5} L${x + 5} ${y + 5} Z`} fill="#F59E0B" />
    </G>
  );

  const positions = getSymbolPositions(count);

  return (
    <CardIconBase>
      {positions.map((pos) => renderWand(pos.x, pos.y))}
    </CardIconBase>
  );
};

// Cups (Water Element) - Chalice/goblet
export const CupSymbol: React.FC<CardIconProps & { count?: number }> = ({ color = '#06B6D4', count = 1 }) => {
  const renderCup = (x: number, y: number) => (
    <G key={`cup-${x}-${y}`}>
      <Path d={`M${x - 10} ${y} L${x - 8} ${y + 20} L${x + 8} ${y + 20} L${x + 10} ${y} Z`} stroke={color} strokeWidth="2" fill="none" />
      <Rect x={x - 3} y={y + 20} width="6" height="10" fill={color} />
      <Line x1={x - 15} y1={y} x2={x + 15} y2={y} stroke={color} strokeWidth="2" />
    </G>
  );

  const positions = getSymbolPositions(count);

  return (
    <CardIconBase>
      {positions.map((pos) => renderCup(pos.x, pos.y))}
    </CardIconBase>
  );
};

// Swords (Air Element) - Simple sword silhouette
export const SwordSymbol: React.FC<CardIconProps & { count?: number }> = ({ color = '#94A3B8', count = 1 }) => {
  const renderSword = (x: number, y: number) => (
    <G key={`sword-${x}-${y}`}>
      <Rect x={x - 2} y={y + 10} width="4" height="35" fill={color} />
      <Path d={`M${x} ${y} L${x - 6} ${y + 10} L${x + 6} ${y + 10} Z`} fill={color} />
      <Rect x={x - 8} y={y + 45} width="16" height="3" fill={color} />
    </G>
  );

  const positions = getSymbolPositions(count);

  return (
    <CardIconBase>
      {positions.map((pos) => renderSword(pos.x, pos.y))}
    </CardIconBase>
  );
};

// Pentacles (Earth Element) - Five-pointed star in circle
export const PentacleSymbol: React.FC<CardIconProps & { count?: number }> = ({ color = '#10B981', count = 1 }) => {
  const renderPentacle = (x: number, y: number) => (
    <G key={`pentacle-${x}-${y}`}>
      <Circle cx={x} cy={y + 20} r="15" stroke={color} strokeWidth="2" fill="none" />
      <Polygon
        points={`${x},${y + 8} ${x + 5},${y + 20} ${x + 15},${y + 20} ${x + 7},${y + 27} ${x + 10},${y + 37} ${x},${y + 30} ${x - 10},${y + 37} ${x - 7},${y + 27} ${x - 15},${y + 20} ${x - 5},${y + 20}`}
        fill={color}
      />
    </G>
  );

  const positions = getSymbolPositions(count);

  return (
    <CardIconBase>
      {positions.map((pos) => renderPentacle(pos.x, pos.y))}
    </CardIconBase>
  );
};

// Helper function to calculate symbol positions based on count
function getSymbolPositions(count: number): Array<{ x: number; y: number }> {
  const baseX = 60;
  const baseY = 60;

  switch (count) {
    case 1: // Ace - single centered symbol
      return [{ x: baseX, y: baseY }];

    case 2: // Two - side by side
      return [
        { x: baseX - 20, y: baseY },
        { x: baseX + 20, y: baseY },
      ];

    case 3: // Three - triangle
      return [
        { x: baseX, y: baseY - 20 },
        { x: baseX - 20, y: baseY + 20 },
        { x: baseX + 20, y: baseY + 20 },
      ];

    case 4: // Four - square corners
      return [
        { x: baseX - 20, y: baseY - 20 },
        { x: baseX + 20, y: baseY - 20 },
        { x: baseX - 20, y: baseY + 20 },
        { x: baseX + 20, y: baseY + 20 },
      ];

    case 5: // Five - like dice
      return [
        { x: baseX, y: baseY },
        { x: baseX - 25, y: baseY - 25 },
        { x: baseX + 25, y: baseY - 25 },
        { x: baseX - 25, y: baseY + 25 },
        { x: baseX + 25, y: baseY + 25 },
      ];

    case 6: // Six - hexagon
      return [
        { x: baseX - 25, y: baseY - 25 },
        { x: baseX + 25, y: baseY - 25 },
        { x: baseX - 25, y: baseY },
        { x: baseX + 25, y: baseY },
        { x: baseX - 25, y: baseY + 25 },
        { x: baseX + 25, y: baseY + 25 },
      ];

    case 7: // Seven - flower pattern
      return [
        { x: baseX, y: baseY },
        { x: baseX, y: baseY - 30 },
        { x: baseX - 26, y: baseY - 15 },
        { x: baseX - 26, y: baseY + 15 },
        { x: baseX, y: baseY + 30 },
        { x: baseX + 26, y: baseY + 15 },
        { x: baseX + 26, y: baseY - 15 },
      ];

    case 8: // Eight - octagon ring
      return [
        { x: baseX, y: baseY - 30 },
        { x: baseX + 21, y: baseY - 21 },
        { x: baseX + 30, y: baseY },
        { x: baseX + 21, y: baseY + 21 },
        { x: baseX, y: baseY + 30 },
        { x: baseX - 21, y: baseY + 21 },
        { x: baseX - 30, y: baseY },
        { x: baseX - 21, y: baseY - 21 },
      ];

    case 9: // Nine - 3x3 grid
      return [
        { x: baseX - 25, y: baseY - 25 },
        { x: baseX, y: baseY - 25 },
        { x: baseX + 25, y: baseY - 25 },
        { x: baseX - 25, y: baseY },
        { x: baseX, y: baseY },
        { x: baseX + 25, y: baseY },
        { x: baseX - 25, y: baseY + 25 },
        { x: baseX, y: baseY + 25 },
        { x: baseX + 25, y: baseY + 25 },
      ];

    case 10: // Ten - two rows of five
      return [
        { x: baseX - 30, y: baseY - 15 },
        { x: baseX - 15, y: baseY - 15 },
        { x: baseX, y: baseY - 15 },
        { x: baseX + 15, y: baseY - 15 },
        { x: baseX + 30, y: baseY - 15 },
        { x: baseX - 30, y: baseY + 15 },
        { x: baseX - 15, y: baseY + 15 },
        { x: baseX, y: baseY + 15 },
        { x: baseX + 15, y: baseY + 15 },
        { x: baseX + 30, y: baseY + 15 },
      ];

    default:
      return [{ x: baseX, y: baseY }];
  }
}

// Court Cards (Page, Knight, Queen, King) - Add figure/crown elements

export const PageIcon: React.FC<CardIconProps & { suit: 'wands' | 'cups' | 'swords' | 'pentacles' }> = ({
  suit,
  color
}) => {
  const suitColor = getSuitColor(suit);
  const Symbol = getSuitSymbol(suit);

  return (
    <CardIconBase>
      <Symbol count={1} color={color || suitColor} />
      <Circle cx="60" cy="120" r="12" stroke={suitColor} strokeWidth="2" fill="none" />
      <Path d="M60 132 L60 145" stroke={suitColor} strokeWidth="2" />
    </CardIconBase>
  );
};

export const KnightIcon: React.FC<CardIconProps & { suit: 'wands' | 'cups' | 'swords' | 'pentacles' }> = ({
  suit,
  color
}) => {
  const suitColor = getSuitColor(suit);
  const Symbol = getSuitSymbol(suit);

  return (
    <CardIconBase>
      <Symbol count={1} color={color || suitColor} />
      {/* Movement lines */}
      <Path d="M55 120 L45 130" stroke={suitColor} strokeWidth="2" />
      <Path d="M65 120 L75 130" stroke={suitColor} strokeWidth="2" />
    </CardIconBase>
  );
};

export const QueenIcon: React.FC<CardIconProps & { suit: 'wands' | 'cups' | 'swords' | 'pentacles' }> = ({
  suit,
  color
}) => {
  const suitColor = getSuitColor(suit);
  const Symbol = getSuitSymbol(suit);

  return (
    <CardIconBase>
      <Symbol count={1} color={color || suitColor} />
      {/* Crown above */}
      <Polygon points="60,35 55,45 65,45" fill="#D4AF37" />
      <Circle cx="50" cy="45" r="3" fill="#D4AF37" />
      <Circle cx="60" cy="45" r="3" fill="#D4AF37" />
      <Circle cx="70" cy="45" r="3" fill="#D4AF37" />
    </CardIconBase>
  );
};

export const KingIcon: React.FC<CardIconProps & { suit: 'wands' | 'cups' | 'swords' | 'pentacles' }> = ({
  suit,
  color
}) => {
  const suitColor = getSuitColor(suit);
  const Symbol = getSuitSymbol(suit);

  return (
    <CardIconBase>
      <Symbol count={1} color={color || suitColor} />
      {/* Large crown */}
      <Polygon points="60,30 52,42 68,42" fill="#D4AF37" />
      <Rect x="50" y="42" width="20" height="4" fill="#D4AF37" />
      <Circle cx="47" cy="42" r="4" fill="#D4AF37" />
      <Circle cx="60" cy="38" r="4" fill="#D4AF37" />
      <Circle cx="73" cy="42" r="4" fill="#D4AF37" />
    </CardIconBase>
  );
};

// Helper functions
function getSuitColor(suit: 'wands' | 'cups' | 'swords' | 'pentacles'): string {
  switch (suit) {
    case 'wands':
      return '#EF4444'; // Red/Fire
    case 'cups':
      return '#06B6D4'; // Cyan/Water
    case 'swords':
      return '#94A3B8'; // Silver/Air
    case 'pentacles':
      return '#10B981'; // Green/Earth
  }
}

function getSuitSymbol(suit: 'wands' | 'cups' | 'swords' | 'pentacles') {
  switch (suit) {
    case 'wands':
      return WandSymbol;
    case 'cups':
      return CupSymbol;
    case 'swords':
      return SwordSymbol;
    case 'pentacles':
      return PentacleSymbol;
  }
}

export { WandSymbol as Wands, CupSymbol as Cups, SwordSymbol as Swords, PentacleSymbol as Pentacles };
