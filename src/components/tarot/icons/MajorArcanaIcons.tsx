import React from 'react';
import Svg, { Path, Circle, Rect, Polygon, Line, G } from 'react-native-svg';

/**
 * Base Card Icon Component
 * All tarot card icons extend from this base
 */

export interface CardIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const CardIconBase: React.FC<CardIconProps & { children: React.ReactNode }> = ({
  width = 120,
  height = 180,
  children,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 120 180" fill="none">
      {children}
    </Svg>
  );
};

// Major Arcana Icons (Simplified Geometric Designs)

export const FoolIcon: React.FC<CardIconProps> = ({ color = '#F4D03F' }) => (
  <CardIconBase>
    {/* Infinity symbol with star */}
    <Path
      d="M40 90 Q40 70, 60 70 Q80 70, 80 90 Q80 110, 60 110 Q40 110, 40 90 Z"
      stroke={color}
      strokeWidth="3"
      fill="none"
    />
    <Circle cx="60" cy="90" r="8" fill={color} opacity="0.8" />
    <Polygon points="60,40 65,55 80,55 68,65 73,80 60,70 47,80 52,65 40,55 55,55" fill={color} />
  </CardIconBase>
);

export const MagicianIcon: React.FC<CardIconProps> = ({ color = '#8B5CF6' }) => (
  <CardIconBase>
    {/* Upward triangle with infinity above */}
    <Polygon points="60,120 35,75 85,75" stroke={color} strokeWidth="3" fill="none" />
    <Path
      d="M40 50 Q40 40, 50 40 Q60 40, 60 50 Q60 60, 50 60 Q40 60, 40 50 Z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <Circle cx="60" cy="90" r="6" fill={color} />
    <Line x1="60" y1="30" x2="60" y2="60" stroke={color} strokeWidth="2" />
  </CardIconBase>
);

export const HighPriestessIcon: React.FC<CardIconProps> = ({ color = '#67E8F9' }) => (
  <CardIconBase>
    {/* Crescent moon with pillars */}
    <Path d="M60 50 Q45 70, 60 90 Q50 70, 60 50 Z" fill={color} opacity="0.8" />
    <Rect x="35" y="50" width="8" height="70" fill={color} opacity="0.6" />
    <Rect x="77" y="50" width="8" height="70" fill={color} opacity="0.6" />
    <Circle cx="60" cy="110" r="5" fill={color} />
  </CardIconBase>
);

export const EmpressIcon: React.FC<CardIconProps> = ({ color = '#10B981' }) => (
  <CardIconBase>
    {/* Venus symbol with crown */}
    <Circle cx="60" cy="70" r="20" stroke={color} strokeWidth="3" fill="none" />
    <Line x1="60" y1="90" x2="60" y2="120" stroke={color} strokeWidth="3" />
    <Line x1="45" y1="105" x2="75" y2="105" stroke={color} strokeWidth="3" />
    <Polygon points="60,45 50,55 70,55" fill={color} />
  </CardIconBase>
);

export const EmperorIcon: React.FC<CardIconProps> = ({ color = '#EF4444' }) => (
  <CardIconBase>
    {/* Square with four points (stability) */}
    <Rect x="40" y="70" width="40" height="40" stroke={color} strokeWidth="3" fill="none" />
    <Circle cx="40" cy="70" r="5" fill={color} />
    <Circle cx="80" cy="70" r="5" fill={color} />
    <Circle cx="80" cy="110" r="5" fill={color} />
    <Circle cx="40" cy="110" r="5" fill={color} />
    <Line x1="60" y1="50" x2="60" y2="70" stroke={color} strokeWidth="2" />
  </CardIconBase>
);

export const HierophantIcon: React.FC<CardIconProps> = ({ color = '#D4AF37' }) => (
  <CardIconBase>
    {/* Key symbol with cross */}
    <Circle cx="60" cy="60" r="15" stroke={color} strokeWidth="3" fill="none" />
    <Line x1="60" y1="75" x2="60" y2="120" stroke={color} strokeWidth="3" />
    <Line x1="50" y1="100" x2="60" y2="100" stroke={color} strokeWidth="3" />
    <Line x1="50" y1="110" x2="60" y2="110" stroke={color} strokeWidth="3" />
  </CardIconBase>
);

export const LoversIcon: React.FC<CardIconProps> = ({ color = '#EC4899' }) => (
  <CardIconBase>
    {/* Two overlapping circles */}
    <Circle cx="50" cy="90" r="25" stroke={color} strokeWidth="3" fill="none" />
    <Circle cx="70" cy="90" r="25" stroke={color} strokeWidth="3" fill="none" />
    <Circle cx="60" cy="90" r="8" fill={color} opacity="0.8" />
  </CardIconBase>
);

export const ChariotIcon: React.FC<CardIconProps> = ({ color = '#3B82F6' }) => (
  <CardIconBase>
    {/* Shield with star */}
    <Path d="M60 50 L80 70 L80 110 Q80 120, 60 130 Q40 120, 40 110 L40 70 Z" stroke={color} strokeWidth="3" fill="none" />
    <Polygon points="60,70 65,82 77,82 67,90 72,102 60,94 48,102 53,90 43,82 55,82" fill={color} />
  </CardIconBase>
);

export const StrengthIcon: React.FC<CardIconProps> = ({ color = '#F59E0B' }) => (
  <CardIconBase>
    {/* Infinity symbol with lion silhouette */}
    <Path
      d="M35 80 Q35 65, 50 65 Q65 65, 65 80 Q65 95, 50 95 Q35 95, 35 80 Z M65 80 Q65 65, 80 65 Q95 65, 95 80 Q95 95, 80 95 Q65 95, 65 80 Z"
      stroke={color}
      strokeWidth="3"
      fill="none"
    />
    <Circle cx="60" cy="110" r="15" stroke={color} strokeWidth="2" fill="none" />
  </CardIconBase>
);

export const HermitIcon: React.FC<CardIconProps> = ({ color = '#94A3B8' }) => (
  <CardIconBase>
    {/* Lantern icon */}
    <Rect x="52" y="70" width="16" height="30" stroke={color} strokeWidth="2" fill="none" />
    <Circle cx="60" cy="85" r="8" fill={color} opacity="0.8" />
    <Line x1="60" y1="50" x2="60" y2="70" stroke={color} strokeWidth="2" />
    <Line x1="60" y1="100" x2="60" y2="120" stroke={color} strokeWidth="2" />
  </CardIconBase>
);

export const WheelOfFortuneIcon: React.FC<CardIconProps> = ({ color = '#8B5CF6' }) => (
  <CardIconBase>
    {/* Wheel with 8 spokes */}
    <Circle cx="60" cy="90" r="35" stroke={color} strokeWidth="3" fill="none" />
    <Circle cx="60" cy="90" r="10" fill={color} />
    <Line x1="60" y1="55" x2="60" y2="75" stroke={color} strokeWidth="2" />
    <Line x1="60" y1="105" x2="60" y2="125" stroke={color} strokeWidth="2" />
    <Line x1="25" y1="90" x2="45" y2="90" stroke={color} strokeWidth="2" />
    <Line x1="75" y1="90" x2="95" y2="90" stroke={color} strokeWidth="2" />
  </CardIconBase>
);

export const JusticeIcon: React.FC<CardIconProps> = ({ color = '#22D3EE' }) => (
  <CardIconBase>
    {/* Scales (balanced) */}
    <Line x1="60" y1="50" x2="60" y2="110" stroke={color} strokeWidth="3" />
    <Line x1="35" y1="70" x2="85" y2="70" stroke={color} strokeWidth="2" />
    <Rect x="25" y="70" width="20" height="15" stroke={color} strokeWidth="2" fill="none" />
    <Rect x="75" y="70" width="20" height="15" stroke={color} strokeWidth="2" fill="none" />
    <Circle cx="60" cy="50" r="8" fill={color} />
  </CardIconBase>
);

export const HangedManIcon: React.FC<CardIconProps> = ({ color = '#6366F1' }) => (
  <CardIconBase>
    {/* Inverted triangle with figure */}
    <Polygon points="60,110 35,65 85,65" stroke={color} strokeWidth="3" fill="none" />
    <Circle cx="60" cy="75" r="8" fill={color} />
    <Line x1="60" y1="83" x2="60" y2="100" stroke={color} strokeWidth="2" />
  </CardIconBase>
);

export const DeathIcon: React.FC<CardIconProps> = ({ color = '#1F2937' }) => (
  <CardIconBase>
    {/* Phoenix rising (transformation) */}
    <Path d="M60 110 Q45 95, 45 75 Q45 55, 60 50 Q75 55, 75 75 Q75 95, 60 110 Z" stroke={color} strokeWidth="3" fill="none" />
    <Path d="M40 75 Q35 70, 40 65" stroke={color} strokeWidth="2" fill="none" />
    <Path d="M80 75 Q85 70, 80 65" stroke={color} strokeWidth="2" fill="none" />
    <Circle cx="60" cy="70" r="5" fill={color} />
  </CardIconBase>
);

export const TemperanceIcon: React.FC<CardIconProps> = ({ color = '#06B6D4' }) => (
  <CardIconBase>
    {/* Two cups pouring (balance) */}
    <Rect x="35" y="60" width="15" height="20" stroke={color} strokeWidth="2" fill="none" />
    <Rect x="70" y="80" width="15" height="20" stroke={color} strokeWidth="2" fill="none" />
    <Path d="M50 80 Q60 85, 70 80" stroke={color} strokeWidth="2" fill="none" />
  </CardIconBase>
);

export const DevilIcon: React.FC<CardIconProps> = ({ color = '#DC2626' }) => (
  <CardIconBase>
    {/* Inverted pentagram (stylized) */}
    <Polygon points="60,100 50,75 35,85 45,65 35,50 60,60 85,50 75,65 85,85 70,75" stroke={color} strokeWidth="2" fill="none" />
    <Circle cx="60" cy="70" r="8" fill={color} opacity="0.6" />
  </CardIconBase>
);

export const TowerIcon: React.FC<CardIconProps> = ({ color = '#B91C1C' }) => (
  <CardIconBase>
    {/* Lightning bolt striking structure */}
    <Rect x="45" y="70" width="30" height="50" stroke={color} strokeWidth="3" fill="none" />
    <Path d="M70 40 L55 75 L65 75 L50 110" stroke={color} strokeWidth="3" fill={color} opacity="0.8" />
  </CardIconBase>
);

export const StarIcon: React.FC<CardIconProps> = ({ color = '#F4D03F' }) => (
  <CardIconBase>
    {/* 8-pointed star with smaller stars */}
    <Polygon points="60,50 65,75 90,75 70,90 75,115 60,100 45,115 50,90 30,75 55,75" fill={color} />
    <Circle cx="35" cy="60" r="3" fill={color} />
    <Circle cx="85" cy="60" r="3" fill={color} />
    <Circle cx="40" cy="110" r="3" fill={color} />
  </CardIconBase>
);

export const MoonIcon: React.FC<CardIconProps> = ({ color = '#A78BFA' }) => (
  <CardIconBase>
    {/* Crescent moon with drops */}
    <Path d="M60 50 Q40 70, 60 110 Q50 70, 60 50 Z" fill={color} />
    <Circle cx="45" cy="90" r="4" fill={color} opacity="0.6" />
    <Circle cx="52" cy="105" r="4" fill={color} opacity="0.6" />
    <Circle cx="68" cy="105" r="4" fill={color} opacity="0.6" />
  </CardIconBase>
);

export const SunIcon: React.FC<CardIconProps> = ({ color = '#FBBF24' }) => (
  <CardIconBase>
    {/* Radiant sun with rays */}
    <Circle cx="60" cy="80" r="25" fill={color} />
    <Line x1="60" y1="40" x2="60" y2="50" stroke={color} strokeWidth="3" />
    <Line x1="60" y1="110" x2="60" y2="120" stroke={color} strokeWidth="3" />
    <Line x1="25" y1="80" x2="35" y2="80" stroke={color} strokeWidth="3" />
    <Line x1="85" y1="80" x2="95" y2="80" stroke={color} strokeWidth="3" />
    <Line x1="35" y1="55" x2="43" y2="63" stroke={color} strokeWidth="3" />
    <Line x1="77" y1="97" x2="85" y2="105" stroke={color} strokeWidth="3" />
  </CardIconBase>
);

export const JudgementIcon: React.FC<CardIconProps> = ({ color = '#D4AF37' }) => (
  <CardIconBase>
    {/* Trumpet/angel wings */}
    <Path d="M60 50 L45 75 L60 70 L75 75 Z" fill={color} />
    <Path d="M40 75 Q35 85, 40 95" stroke={color} strokeWidth="2" fill="none" />
    <Path d="M80 75 Q85 85, 80 95" stroke={color} strokeWidth="2" fill="none" />
    <Rect x="55" y="95" width="10" height="25" fill={color} />
  </CardIconBase>
);

export const WorldIcon: React.FC<CardIconProps> = ({ color = '#10B981' }) => (
  <CardIconBase>
    {/* Wreath circle with 4 elements */}
    <Circle cx="60" cy="90" r="30" stroke={color} strokeWidth="3" fill="none" />
    <Circle cx="60" cy="60" r="5" fill="#EF4444" />
    <Circle cx="60" cy="120" r="5" fill="#06B6D4" />
    <Circle cx="30" cy="90" r="5" fill="#10B981" />
    <Circle cx="90" cy="90" r="5" fill="#F59E0B" />
  </CardIconBase>
);
