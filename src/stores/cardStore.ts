import { create } from 'zustand';
import type { TarotCard } from '@/types/tarot.types';
import { TAROT_DECK } from '@/data/tarot-deck';

/**
 * Card Store
 * Manages tarot deck state and card drawing logic
 */

export type SpreadType = 'single' | 'three';

export interface CardState {
  deck: TarotCard[];
  drawnCards: TarotCard[];
  isShuffling: boolean;
  isDrawing: boolean;
  spreadType: SpreadType;

  // Actions
  initializeDeck: () => void;
  shuffleDeck: () => void;
  drawCards: (count: number) => void;
  resetDeck: () => void;
  setSpreadType: (type: SpreadType) => void;
  setIsShuffling: (shuffling: boolean) => void;
  setIsDrawing: (drawing: boolean) => void;
}

export const useCardStore = create<CardState>((set) => ({
  deck: [...TAROT_DECK], // Initialize with full deck
  drawnCards: [],
  isShuffling: false,
  isDrawing: false,
  spreadType: 'single',

  initializeDeck: () => set({ deck: [...TAROT_DECK] }),

  shuffleDeck: () =>
    set((state) => {
      const shuffled = [...state.deck];
      // Fisher-Yates shuffle
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return { deck: shuffled };
    }),

  drawCards: (count) =>
    set((state) => ({
      drawnCards: state.deck.slice(0, count),
    })),

  resetDeck: () =>
    set({
      deck: [...TAROT_DECK],
      drawnCards: [],
      isShuffling: false,
      isDrawing: false,
    }),

  setSpreadType: (type) => set({ spreadType: type }),

  setIsShuffling: (shuffling) => set({ isShuffling: shuffling }),

  setIsDrawing: (drawing) => set({ isDrawing: drawing }),
}));
