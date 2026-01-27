import React from 'react';
import Svg, { Rect, Circle, Path, G, Defs, RadialGradient, Stop } from 'react-native-svg';

interface CardBackProps {
  size?: number;
}

/**
 * Tarot Card Back Design
 * Mystical pattern with gold and purple
 */

export const CardBack: React.FC<CardBackProps> = ({ size = 120 }) => {
  const aspectRatio = 5 / 7; // Standard tarot card ratio
  const width = size;
  const height = size / aspectRatio;

  return (
    <Svg width={width} height={height} viewBox="0 0 100 140">
      <Defs>
        <RadialGradient id="cardBackGradient" cx="50%" cy="50%">
          <Stop offset="0%" stopColor="#1E2638" stopOpacity="1" />
          <Stop offset="100%" stopColor="#0A0E1A" stopOpacity="1" />
        </RadialGradient>
      </Defs>

      {/* Background */}
      <Rect x="0" y="0" width="100" height="140" fill="url(#cardBackGradient)" />

      {/* Border */}
      <Rect
        x="4"
        y="4"
        width="92"
        height="132"
        stroke="#D4AF37"
        strokeWidth="2"
        fill="none"
        rx="4"
      />

      {/* Inner border */}
      <Rect
        x="8"
        y="8"
        width="84"
        height="124"
        stroke="#D4AF37"
        strokeWidth="0.5"
        fill="none"
        opacity="0.5"
      />

      {/* Central mystical symbol (moon and stars) */}
      <G opacity="0.9">
        {/* Crescent moon */}
        <Path
          d="M 55 70 Q 65 70, 65 60 Q 65 50, 55 50 Q 60 60, 55 70"
          fill="#D4AF37"
        />

        {/* Stars around */}
        {[
          { x: 35, y: 40, size: 3 },
          { x: 75, y: 45, size: 2.5 },
          { x: 30, y: 70, size: 2 },
          { x: 78, y: 75, size: 2.5 },
          { x: 50, y: 30, size: 2 },
          { x: 50, y: 95, size: 2.5 },
        ].map((star, i) => (
          <Circle key={i} cx={star.x} cy={star.y} r={star.size} fill="#22D3EE" opacity="0.8" />
        ))}

        {/* Additional tiny stars */}
        {[
          { x: 25, y: 55 },
          { x: 80, y: 60 },
          { x: 42, y: 85 },
          { x: 68, y: 35 },
          { x: 55, y: 105 },
        ].map((star, i) => (
          <Circle key={`tiny-${i}`} cx={star.x} cy={star.y} r={1} fill="#8B5CF6" opacity="0.6" />
        ))}
      </G>

      {/* Top decorative element */}
      <Path
        d="M 50 20 L 45 25 L 50 23 L 55 25 Z"
        fill="#D4AF37"
        opacity="0.7"
      />

      {/* Bottom decorative element */}
      <Path
        d="M 50 120 L 45 115 L 50 117 L 55 115 Z"
        fill="#D4AF37"
        opacity="0.7"
      />

      {/* Text: TAROT */}
      <Path
        d="M 38 110 L 42 110 M 40 110 L 40 115 M 45 110 L 45 115 L 48 115 M 45 112.5 L 47 112.5 M 51 110 L 51 115 L 54 112.5 L 51 110 M 57 110 L 60 110 M 58.5 110 L 58.5 115 M 57 115 L 60 115"
        stroke="#D4AF37"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
    </Svg>
  );
};
