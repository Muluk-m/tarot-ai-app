import React from 'react';
import Svg, { Path, Circle, Rect, Polygon, G, Line, Ellipse } from 'react-native-svg';

interface MajorArcanaIconProps {
  iconKey: string;
  size?: number;
  color?: string;
}

/**
 * Simplified Major Arcana Icons
 * Using geometric shapes and symbols to represent each card
 */

export const MajorArcanaIcon: React.FC<MajorArcanaIconProps> = ({
  iconKey,
  size = 48,
  color = '#D4AF37',
}) => {
  const renderIcon = () => {
    switch (iconKey) {
      case 'fool':
        // Infinity symbol with star
        return (
          <G>
            <Path
              d="M 8 12 Q 12 8, 16 12 Q 20 16, 16 12 Q 12 16, 8 12"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <Polygon points="12,4 13,7 16,7 14,9 15,12 12,10 9,12 10,9 8,7 11,7" fill={color} />
          </G>
        );

      case 'magician':
        // Triangle with wand/staff
        return (
          <G>
            <Polygon points="12,6 18,18 6,18" stroke={color} strokeWidth="2" fill="none" />
            <Line x1="12" y1="2" x2="12" y2="6" stroke={color} strokeWidth="2" />
            <Circle cx="12" cy="2" r="1.5" fill={color} />
          </G>
        );

      case 'high-priestess':
        // Crescent moon with pillars
        return (
          <G>
            <Path d="M 10 12 Q 8 12, 8 10 Q 8 8, 10 8" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M 14 8 Q 16 8, 16 10 Q 16 12, 14 12" stroke={color} strokeWidth="2" fill="none" />
            <Rect x="6" y="8" width="2" height="12" fill={color} />
            <Rect x="16" y="8" width="2" height="12" fill={color} />
          </G>
        );

      case 'empress':
        // Crown with Venus symbol
        return (
          <G>
            <Circle cx="12" cy="14" r="4" stroke={color} strokeWidth="2" fill="none" />
            <Line x1="12" y1="18" x2="12" y2="20" stroke={color} strokeWidth="2" />
            <Line x1="10" y1="20" x2="14" y2="20" stroke={color} strokeWidth="2" />
            <Path d="M 8 6 L 10 10 L 12 8 L 14 10 L 16 6" stroke={color} strokeWidth="2" fill="none" />
          </G>
        );

      case 'emperor':
        // Square/throne symbol
        return (
          <G>
            <Rect x="8" y="8" width="8" height="8" stroke={color} strokeWidth="2" fill="none" />
            <Line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="2" />
            <Line x1="12" y1="8" x2="12" y2="16" stroke={color} strokeWidth="2" />
            <Rect x="6" y="16" width="12" height="4" fill={color} />
          </G>
        );

      case 'hierophant':
        // Key symbol
        return (
          <G>
            <Circle cx="12" cy="8" r="3" stroke={color} strokeWidth="2" fill="none" />
            <Line x1="12" y1="11" x2="12" y2="20" stroke={color} strokeWidth="2" />
            <Rect x="10" y="14" width="4" height="2" fill={color} />
            <Rect x="10" y="17" width="4" height="2" fill={color} />
          </G>
        );

      case 'lovers':
        // Two overlapping circles
        return (
          <G>
            <Circle cx="10" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
            <Circle cx="14" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M 12 8 L 12 6 L 10 4 M 12 6 L 14 4" stroke={color} strokeWidth="1.5" />
          </G>
        );

      case 'chariot':
        // Shield with star
        return (
          <G>
            <Path d="M 12 4 L 18 12 L 12 20 L 6 12 Z" stroke={color} strokeWidth="2" fill="none" />
            <Polygon points="12,10 13,12 15,12 13.5,13.5 14,15.5 12,14 10,15.5 10.5,13.5 9,12 11,12" fill={color} />
          </G>
        );

      case 'strength':
        // Infinity symbol over circle (lion)
        return (
          <G>
            <Circle cx="12" cy="14" r="6" stroke={color} strokeWidth="2" fill="none" />
            <Path
              d="M 8 8 Q 10 6, 12 8 Q 14 10, 16 8"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </G>
        );

      case 'hermit':
        // Lantern (light)
        return (
          <G>
            <Polygon points="12,6 15,10 9,10" fill={color} />
            <Rect x="10" y="10" width="4" height="8" stroke={color} strokeWidth="1.5" fill="none" />
            <Circle cx="12" cy="8" r="1.5" fill={color} />
            <Line x1="10" y1="18" x2="14" y2="18" stroke={color} strokeWidth="2" />
          </G>
        );

      case 'wheel-fortune':
        // Wheel with 8 spokes
        return (
          <G>
            <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
            <Circle cx="12" cy="12" r="2" fill={color} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 12 + 2 * Math.cos(rad);
              const y1 = 12 + 2 * Math.sin(rad);
              const x2 = 12 + 8 * Math.cos(rad);
              const y2 = 12 + 8 * Math.sin(rad);
              return <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" />;
            })}
          </G>
        );

      case 'justice':
        // Scales (balance)
        return (
          <G>
            <Line x1="12" y1="4" x2="12" y2="16" stroke={color} strokeWidth="2" />
            <Line x1="6" y1="10" x2="18" y2="10" stroke={color} strokeWidth="2" />
            <Rect x="4" y="10" width="4" height="4" stroke={color} strokeWidth="1.5" fill="none" />
            <Rect x="16" y="10" width="4" height="4" stroke={color} strokeWidth="1.5" fill="none" />
            <Line x1="10" y1="20" x2="14" y2="20" stroke={color} strokeWidth="2" />
          </G>
        );

      case 'hanged-man':
        // Inverted triangle with figure
        return (
          <G>
            <Polygon points="12,18 6,6 18,6" stroke={color} strokeWidth="2" fill="none" />
            <Circle cx="12" cy="10" r="2" fill={color} />
            <Line x1="12" y1="12" x2="12" y2="16" stroke={color} strokeWidth="2" />
          </G>
        );

      case 'death':
        // Phoenix/butterfly (transformation)
        return (
          <G>
            <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M 6 10 Q 4 12, 6 14" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M 18 10 Q 20 12, 18 14" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M 12 9 L 12 6" stroke={color} strokeWidth="1.5" />
          </G>
        );

      case 'temperance':
        // Two cups pouring (alchemy symbol)
        return (
          <G>
            <Path d="M 8 8 L 8 12 Q 8 14, 10 14" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M 16 8 L 16 12 Q 16 14, 14 14" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M 10 14 Q 12 16, 14 14" stroke={color} strokeWidth="1.5" fill="none" />
            <Circle cx="8" cy="8" r="1.5" fill={color} />
            <Circle cx="16" cy="8" r="1.5" fill={color} />
          </G>
        );

      case 'devil':
        // Inverted pentagram
        return (
          <G>
            <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
            <Polygon
              points="12,16 9,10 15,10"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            <Path d="M 9 10 L 15 14 M 15 10 L 9 14" stroke={color} strokeWidth="1.5" />
          </G>
        );

      case 'tower':
        // Lightning bolt striking structure
        return (
          <G>
            <Rect x="8" y="8" width="8" height="12" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M 14 4 L 10 12 L 13 12 L 10 20" stroke={color} strokeWidth="2" strokeLinejoin="miter" fill="none" />
            <Circle cx="10" cy="8" r="1" fill={color} />
            <Circle cx="14" cy="8" r="1" fill={color} />
          </G>
        );

      case 'star':
        // 8-pointed star with smaller stars
        return (
          <G>
            <Polygon
              points="12,4 13,10 19,10 14,14 16,20 12,16 8,20 10,14 5,10 11,10"
              fill={color}
            />
            <Circle cx="6" cy="6" r="1" fill={color} />
            <Circle cx="18" cy="6" r="1" fill={color} />
            <Circle cx="18" cy="18" r="1" fill={color} />
          </G>
        );

      case 'moon':
        // Crescent moon with drops
        return (
          <G>
            <Path
              d="M 14 6 Q 18 12, 14 18 Q 10 12, 14 6"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <Circle cx="8" cy="16" r="1.5" fill={color} />
            <Circle cx="6" cy="14" r="1" fill={color} />
            <Circle cx="10" cy="18" r="1" fill={color} />
          </G>
        );

      case 'sun':
        // Radiant sun with rays
        return (
          <G>
            <Circle cx="12" cy="12" r="5" fill={color} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 12 + 6 * Math.cos(rad);
              const y1 = 12 + 6 * Math.sin(rad);
              const x2 = 12 + 9 * Math.cos(rad);
              const y2 = 12 + 9 * Math.sin(rad);
              return <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />;
            })}
          </G>
        );

      case 'judgement':
        // Trumpet or angel wings
        return (
          <G>
            <Path d="M 12 6 L 12 14" stroke={color} strokeWidth="2" />
            <Path d="M 8 14 L 12 14 L 12 18 L 14 18" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M 8 6 Q 6 8, 8 10" stroke={color} strokeWidth="2" fill="none" />
            <Path d="M 16 6 Q 18 8, 16 10" stroke={color} strokeWidth="2" fill="none" />
          </G>
        );

      case 'world':
        // Wreath circle with 4 elements
        return (
          <G>
            <Ellipse cx="12" cy="12" rx="7" ry="9" stroke={color} strokeWidth="2" fill="none" />
            <Circle cx="12" cy="6" r="1.5" fill={color} />
            <Circle cx="12" cy="18" r="1.5" fill={color} />
            <Circle cx="6" cy="12" r="1.5" fill={color} />
            <Circle cx="18" cy="12" r="1.5" fill={color} />
          </G>
        );

      default:
        // Default star symbol
        return (
          <Polygon
            points="12,4 13.5,9 18,9 14.5,12 16,17 12,14 8,17 9.5,12 6,9 10.5,9"
            fill={color}
          />
        );
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {renderIcon()}
    </Svg>
  );
};
