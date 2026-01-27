import React from 'react';
import Svg, { Rect, Circle, Path, G, Defs, RadialGradient, Stop } from 'react-native-svg';

/**
 * Card Back Design
 * Mystical pattern with gold borders and twinkling stars
 */

interface CardBackProps {
  width?: number;
  height?: number;
}

export const CardBack: React.FC<CardBackProps> = ({ width = 120, height = 180 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 120 180" fill="none">
      <Defs>
        <RadialGradient id="cardBackGradient" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#1E2638" stopOpacity="1" />
          <Stop offset="100%" stopColor="#0A0E1A" stopOpacity="1" />
        </RadialGradient>
      </Defs>

      {/* Card background */}
      <Rect width="120" height="180" fill="url(#cardBackGradient)" />

      {/* Gold border */}
      <Rect x="5" y="5" width="110" height="170" stroke="#D4AF37" strokeWidth="2" fill="none" rx="8" />
      <Rect x="10" y="10" width="100" height="160" stroke="#D4AF37" strokeWidth="1" fill="none" rx="6" opacity="0.6" />

      {/* Center mystical symbol - moon and stars */}
      <G opacity="0.9">
        {/* Crescent moon */}
        <Path d="M60 70 Q50 85, 60 110 Q55 85, 60 70 Z" fill="#D4AF37" />

        {/* Stars around moon */}
        <Circle cx="40" cy="75" r="2" fill="#F4D03F" />
        <Circle cx="80" cy="75" r="2" fill="#F4D03F" />
        <Circle cx="45" cy="95" r="2" fill="#F4D03F" />
        <Circle cx="75" cy="95" r="2" fill="#F4D03F" />
        <Circle cx="60" cy="55" r="2" fill="#F4D03F" />
        <Circle cx="60" cy="120" r="2" fill="#F4D03F" />

        {/* Additional decorative stars */}
        <Circle cx="30" cy="60" r="1.5" fill="#A78BFA" opacity="0.8" />
        <Circle cx="90" cy="60" r="1.5" fill="#A78BFA" opacity="0.8" />
        <Circle cx="35" cy="110" r="1.5" fill="#A78BFA" opacity="0.8" />
        <Circle cx="85" cy="110" r="1.5" fill="#A78BFA" opacity="0.8" />

        {/* Tiny twinkling stars */}
        <Circle cx="25" cy="45" r="1" fill="#67E8F9" opacity="0.6" />
        <Circle cx="95" cy="45" r="1" fill="#67E8F9" opacity="0.6" />
        <Circle cx="25" cy="135" r="1" fill="#67E8F9" opacity="0.6" />
        <Circle cx="95" cy="135" r="1" fill="#67E8F9" opacity="0.6" />
        <Circle cx="60" cy="35" r="1" fill="#67E8F9" opacity="0.6" />
        <Circle cx="60" cy="145" r="1" fill="#67E8F9" opacity="0.6" />
      </G>

      {/* "TAROT" text (stylized) */}
      <G opacity="0.5">
        <Circle cx="35" cy="25" r="1.5" fill="#D4AF37" />
        <Circle cx="45" cy="25" r="1.5" fill="#D4AF37" />
        <Circle cx="55" cy="25" r="1.5" fill="#D4AF37" />
        <Circle cx="65" cy="25" r="1.5" fill="#D4AF37" />
        <Circle cx="75" cy="25" r="1.5" fill="#D4AF37" />
        <Circle cx="85" cy="25" r="1.5" fill="#D4AF37" />
      </G>

      {/* Bottom decorative line */}
      <Path d="M30 155 Q60 150, 90 155" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.5" />
    </Svg>
  );
};
