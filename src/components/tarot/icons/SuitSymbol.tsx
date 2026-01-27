import React from 'react';
import Svg, { Path, Circle, Polygon, G } from 'react-native-svg';

interface SuitSymbolProps {
  suit: 'wands' | 'cups' | 'swords' | 'pentacles';
  size?: number;
  color?: string;
}

/**
 * Simplified Suit Symbols for Minor Arcana
 * Using geometric shapes to represent each suit
 */

export const SuitSymbol: React.FC<SuitSymbolProps> = ({ suit, size = 24, color }) => {
  const getSuitColor = () => {
    if (color) return color;
    switch (suit) {
      case 'wands':
        return '#EF4444'; // Red-orange for fire
      case 'cups':
        return '#22D3EE'; // Cyan for water
      case 'swords':
        return '#CBD5E1'; // Silver for air
      case 'pentacles':
        return '#10B981'; // Green for earth
    }
  };

  const renderSymbol = () => {
    const fillColor = getSuitColor();

    switch (suit) {
      case 'wands':
        // Vertical staff/wand with leaves
        return (
          <G>
            <Path
              d="M12 2 L12 22"
              stroke={fillColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Path d="M8 6 Q12 4 16 6" stroke={fillColor} strokeWidth="1.5" fill="none" />
            <Path d="M8 10 Q12 8 16 10" stroke={fillColor} strokeWidth="1.5" fill="none" />
          </G>
        );

      case 'cups':
        // Chalice/cup shape
        return (
          <G>
            <Path
              d="M6 8 Q6 12 12 14 Q18 12 18 8 L18 6 L6 6 Z"
              fill={fillColor}
            />
            <Path d="M12 14 L12 18" stroke={fillColor} strokeWidth="2" />
            <Path d="M9 18 L15 18" stroke={fillColor} strokeWidth="2" strokeLinecap="round" />
          </G>
        );

      case 'swords':
        // Simple sword silhouette
        return (
          <G>
            <Path
              d="M12 2 L12 16"
              stroke={fillColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Path d="M8 16 L16 16" stroke={fillColor} strokeWidth="2" strokeLinecap="round" />
            <Path d="M10 18 L14 18" stroke={fillColor} strokeWidth="2" strokeLinecap="round" />
            <Path d="M12 18 L12 22" stroke={fillColor} strokeWidth="2" strokeLinecap="round" />
            <Path d="M8 6 L16 6" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" />
          </G>
        );

      case 'pentacles':
        // Five-pointed star (pentacle) in circle
        return (
          <G>
            <Circle cx="12" cy="12" r="10" stroke={fillColor} strokeWidth="1.5" fill="none" />
            <Polygon
              points="12,4 14.4,10.4 21,11 16,16 17.6,22 12,18.4 6.4,22 8,16 3,11 9.6,10.4"
              fill={fillColor}
            />
          </G>
        );
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {renderSymbol()}
    </Svg>
  );
};
