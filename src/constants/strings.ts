/**
 * String Constants
 * Text constants for the app (future i18n support)
 */

export const strings = {
  app: {
    name: 'Tarot AI',
    tagline: 'AI-Powered Mystical Guidance',
  },

  home: {
    title: 'Welcome to Tarot AI',
    dailyCard: 'Daily Card Draw',
    threeCard: 'Three Card Spread',
    history: 'My History',
    settings: 'Settings',
    remainingReads: (count: number) => `${count} readings left today`,
  },

  reading: {
    shuffle: 'Shuffle Cards',
    drawing: 'Drawing Cards...',
    tapToDraw: 'Tap to draw',
    generating: 'Consulting the cosmos...',
    past: 'Past',
    present: 'Present',
    future: 'Future',
  },

  limits: {
    reached: 'Daily Limit Reached',
    reachedMessage: 'You have used all your free readings for today.',
    resetAt: 'Resets at midnight',
  },

  errors: {
    network: 'Network error. Please check your connection.',
    apiError: 'Something went wrong. Please try again.',
    generic: 'An unexpected error occurred.',
  },

  disclaimers: {
    entertainment: 'For entertainment purposes only',
    notAdvice: 'Not a substitute for professional advice',
  },
} as const;

export type Strings = typeof strings;
