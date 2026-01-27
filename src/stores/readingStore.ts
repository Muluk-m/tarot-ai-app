import { create } from 'zustand';
import { v4 as uuidv4 } from '@/utils/uuid';
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
    console.log('📖 [ReadingStore] ==================');
    console.log('📖 [ReadingStore] generateReading called');
    console.log('📖 [ReadingStore] spreadType:', spreadType);
    console.log('📖 [ReadingStore] cards count:', cards.length);
    console.log('📖 [ReadingStore] cards:', cards.map(c => c.name));
    console.log('📖 [ReadingStore] query:', query || 'none');

    // Clear any existing reading and reset state
    set({ currentReading: null, isGenerating: true, error: null, streamingText: '' });
    console.log('📖 [ReadingStore] State reset: currentReading=null, isGenerating=true');

    try {
      // Format cards with positions
      console.log('📖 [ReadingStore] Formatting cards with positions...');
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

      console.log('📖 [ReadingStore] Prepared drawnCards:', drawnCards.length);
      console.log('📖 [ReadingStore] Calling generateInterpretationStream...');

      // Start streaming
      await generateInterpretationStream(
        {
          spreadType,
          cards: drawnCards,
          query,
        },
        (chunk, isComplete) => {
          console.log(`📖 [ReadingStore] 💬 Stream callback: length=${chunk.length}, complete=${isComplete}`);
          fullInterpretation = chunk;
          set({ streamingText: chunk });

          // When complete, save the reading
          if (isComplete) {
            console.log('📖 [ReadingStore] ✅ Stream complete, saving reading...');
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

            console.log('📖 [ReadingStore] Reading saved to currentReading');

            // Add to history
            get().addToHistory(reading);
            console.log('📖 [ReadingStore] Reading added to history');
          }
        }
      );

      console.log('📖 [ReadingStore] ✅ generateInterpretationStream completed');
    } catch (error) {
      console.error('📖 [ReadingStore] ❌ Failed to generate reading:', error);
      console.error('📖 [ReadingStore] Error details:', JSON.stringify(error, null, 2));
      set({
        error: error instanceof Error ? error.message : 'Failed to generate reading',
        isGenerating: false,
      });
    }
  },
}));
