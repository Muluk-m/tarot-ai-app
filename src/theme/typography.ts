/**
 * Typography System
 * Font scales and weights for the app
 */

export const typography = {
  // Font families (will be loaded via expo-font)
  fontFamily: {
    heading: 'Cinzel-Bold', // Mystical serif for headings
    body: 'Inter-Regular', // Sans-serif for body text
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
  },

  // Font sizes with line heights
  fontSize: {
    display: { size: 48, lineHeight: 56, weight: '700' as const },
    h1: { size: 36, lineHeight: 44, weight: '600' as const },
    h2: { size: 30, lineHeight: 38, weight: '600' as const },
    h3: { size: 24, lineHeight: 32, weight: '600' as const },
    bodyLg: { size: 18, lineHeight: 28, weight: '400' as const },
    body: { size: 16, lineHeight: 24, weight: '400' as const },
    bodySm: { size: 14, lineHeight: 20, weight: '400' as const },
    caption: { size: 12, lineHeight: 16, weight: '400' as const },
  },
} as const;

export type Typography = typeof typography;
