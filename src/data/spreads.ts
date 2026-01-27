import type { SpreadConfig } from '@/types/tarot.types';

/**
 * Tarot Spread Configurations
 * Defines different reading layouts and their positions
 */

export const SPREADS: Record<string, SpreadConfig> = {
  single: {
    name: 'Daily Card',
    description: 'Single card for daily guidance and insight',
    cardCount: 1,
    positions: [
      {
        id: 'main',
        label: 'Your Card',
        prompt: 'Provide guidance and insight for this card as a daily message',
      },
    ],
  },
  three: {
    name: 'Past-Present-Future',
    description: 'Three-card timeline spread revealing your journey',
    cardCount: 3,
    positions: [
      {
        id: 'past',
        label: 'Past',
        prompt: 'influences and experiences from the past that have shaped the current situation',
      },
      {
        id: 'present',
        label: 'Present',
        prompt: 'the current situation, energies, and circumstances at play right now',
      },
      {
        id: 'future',
        label: 'Future',
        prompt: 'the potential outcome and where this path may lead',
      },
    ],
  },
};

// Get spread by key
export const getSpread = (key: 'single' | 'three'): SpreadConfig => {
  return SPREADS[key];
};

// Get all available spreads
export const getAllSpreads = (): SpreadConfig[] => {
  return Object.values(SPREADS);
};
