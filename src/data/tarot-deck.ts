import type { TarotCard } from '@/types/tarot.types';
import { MAJOR_ARCANA } from './major-arcana';
import { WANDS } from './wands';
import { CUPS } from './cups';
import { SWORDS } from './swords';
import { PENTACLES } from './pentacles';

/**
 * Complete Tarot Deck - 78 Cards
 * 22 Major Arcana + 56 Minor Arcana (14 cards × 4 suits)
 */

export const TAROT_DECK: TarotCard[] = [
  ...MAJOR_ARCANA, // 0-21
  ...WANDS, // 22-35
  ...CUPS, // 36-49
  ...SWORDS, // 50-63
  ...PENTACLES, // 64-77
];

// Helper functions for accessing cards
export const getCardById = (id: number): TarotCard | undefined => {
  return TAROT_DECK.find((card) => card.id === id);
};

export const getCardByName = (name: string): TarotCard | undefined => {
  return TAROT_DECK.find((card) => card.name.toLowerCase() === name.toLowerCase());
};

export const getMajorArcana = (): TarotCard[] => {
  return TAROT_DECK.filter((card) => card.arcana === 'major');
};

export const getMinorArcana = (): TarotCard[] => {
  return TAROT_DECK.filter((card) => card.arcana === 'minor');
};

export const getCardsBySuit = (suit: 'wands' | 'cups' | 'swords' | 'pentacles'): TarotCard[] => {
  return TAROT_DECK.filter((card) => card.suit === suit);
};

// Shuffle deck using Fisher-Yates algorithm
export const shuffleDeck = (deck: TarotCard[] = TAROT_DECK): TarotCard[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Draw N cards from shuffled deck
export const drawCards = (count: number, deck: TarotCard[] = TAROT_DECK): TarotCard[] => {
  const shuffled = shuffleDeck(deck);
  return shuffled.slice(0, count);
};

export { MAJOR_ARCANA, WANDS, CUPS, SWORDS, PENTACLES };
