/**
 * Cross-platform Shadow Utilities
 * Automatically applies correct shadow properties for iOS and Android
 */

import { Platform, ViewStyle } from 'react-native';
import { colors } from './colors';

interface ShadowConfig {
  color?: string;
  elevation: number;
}

/**
 * Creates platform-specific shadow styles
 * @param elevation - Shadow intensity (1-24)
 * @param color - Shadow color (defaults to gold)
 */
export const createShadow = (
  elevation: number,
  color: string = colors.accent.gold
): ViewStyle => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: elevation / 2,
      },
      shadowOpacity: Math.min(0.3 + elevation * 0.02, 0.6),
      shadowRadius: elevation,
    };
  }

  // Android
  return {
    elevation,
  };
};

/**
 * Predefined shadow presets
 */
export const shadows = {
  none: createShadow(0),
  sm: createShadow(2),
  md: createShadow(4),
  lg: createShadow(8),
  xl: createShadow(12),
  xxl: createShadow(16),
  
  // Glow effects
  goldGlow: createShadow(10, colors.accent.gold),
  purpleGlow: createShadow(10, colors.accent.purple),
  cyanGlow: createShadow(10, colors.accent.cyan),
} as const;

export type Shadows = typeof shadows;
