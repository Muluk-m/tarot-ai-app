import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { TarotCard } from '@/types/tarot.types';
import type { SpreadType } from './cardStore';
import { generateInterpretationStream } from '@/services/difyService';
import type { DrawnCard } from '@/types/api.types';

/**
 * Reading Store
 * Manages current reading session and history with streaming AI interpretations
 */

export interface ReadingRecord {
  id: string; // UUID
  timestamp: number; // Unix timestamp
  dateFormatted: string;
  spreadType: SpreadType;
  cards: Array<{
    card: TarotCard;
    position?: 'past' | 'present' | 'future';
  }>;
  interpretation: string; // Full AI-generated text
  favorite?: boolean;
}

export interface ReadingState {
  currentReading: ReadingRecord | null;
  readingHistory: ReadingRecord[];
  isGenerating: boolean;
  streamingText: string; // Current streaming interpretation text
  error: string | null;

  // Actions
  setCurrentReading: (reading: ReadingRecord) => void;
  clearCurrentReading: () => void;
  addToHistory: (reading: ReadingRecord) => void;
  setReadingHistory: (history: ReadingRecord[]) => void;
  deleteFromHistory: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setIsGenerating: (generating: boolean) => void;
  setStreamingText: (text: string) => void;
  setError: (error: string | null) => void;

  // New: Generate reading with streaming
  generateReading: (
    spreadType: SpreadType,
    cards: TarotCard[],
    query?: string
  ) => Promise<void>;
}

export const useReadingStore = create<ReadingState>((set, get) => ({
  currentReading: null,
  readingHistory: [],
  isGenerating: false,
  streamingText: '',
  error: null,

  setCurrentReading: (reading) => set({ currentReading: reading }),

  clearCurrentReading: () => set({ currentReading: null, streamingText: '' }),

  addToHistory: (reading) =>
    set((state) => ({
      readingHistory: [reading, ...state.readingHistory],
    })),

  setReadingHistory: (history) => set({ readingHistory: history }),

  deleteFromHistory: (id) =>
    set((state) => ({
      readingHistory: state.readingHistory.filter((r) => r.id !== id),
    })),

  toggleFavorite: (id) =>
    set((state) => ({
      readingHistory: state.readingHistory.map((r) =>
        r.id === id ? { ...r, favorite: !r.favorite } : r
      ),
      currentReading:
        state.currentReading?.id === id
          ? { ...state.currentReading, favorite: !state.currentReading.favorite }
          : state.currentReading,
    })),

  setIsGenerating: (generating) => set({ isGenerating: generating }),

  setStreamingText: (text) => set({ streamingText: text }),

  setError: (error) => set({ error }),

  generateReading: async (spreadType, cards, query) => {
    set({ isGenerating: true, error: null, streamingText: '' });

    try {
      // Format cards with positions
      const drawnCards: DrawnCard[] = cards.map((card, index) => {
        if (spreadType === 'single') {
          return {
            card,
            position: 'single',
            positionLabel: 'Your Card',
          };
        } else {
          const positions = ['past', 'present', 'future'] as const;
          const labels = ['Past', 'Present', 'Future'];
          return {
            card,
            position: positions[index],
            positionLabel: labels[index],
          };
        }
      });

      // Create reading record
      const readingId = uuidv4();
      const timestamp = Date.now();
      const dateFormatted = new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      let fullInterpretation = '';

      // Start streaming
      await generateInterpretationStream(
        {
          spreadType,
          cards: drawnCards,
          query,
        },
        (chunk, isComplete) => {
          fullInterpretation = chunk;
          set({ streamingText: chunk });

          // When complete, save the reading
          if (isComplete) {
            const reading: ReadingRecord = {
              id: readingId,
              timestamp,
              dateFormatted,
              spreadType,
              cards: drawnCards.map((dc) => ({
                card: dc.card,
                position: dc.position as 'past' | 'present' | 'future' | undefined,
              })),
              interpretation: fullInterpretation,
              favorite: false,
            };

            set({
              currentReading: reading,
              isGenerating: false,
            });

            // Add to history
            get().addToHistory(reading);
          }
        }
      );
    } catch (error) {
      console.error('Failed to generate reading:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to generate reading',
        isGenerating: false,
      });
    }
  },
}));
