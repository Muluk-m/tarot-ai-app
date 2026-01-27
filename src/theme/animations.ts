/**
 * Animation Constants
 * Timing and easing functions for animations
 */

export const DURATIONS = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slowest: 800,
  shuffle: 2500,
  cardFlip: 600,
} as const;

// Easing curves (use with React Native Reanimated)
export const EASING_CURVES = {
  standard: [0.4, 0.0, 0.2, 1] as const,
  decelerate: [0.0, 0.0, 0.2, 1] as const,
  accelerate: [0.4, 0.0, 1, 1] as const,
} as const;

export type Durations = typeof DURATIONS;
