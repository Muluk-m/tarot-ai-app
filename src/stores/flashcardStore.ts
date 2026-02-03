/**
 * Flashcard Store
 * Manages flashcard progress and spaced repetition
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FlashcardProgress, FlashcardSession, FlashcardMode } from '@/types/learning.types';
import { v4 as uuidv4 } from '@/utils/uuid';

interface FlashcardState {
  // State
  cardProgress: Record<string, FlashcardProgress>; // cardId -> progress
  sessions: FlashcardSession[];

  // Actions
  initializeCard: (cardId: string) => void;
  recordReview: (cardId: string, correct: boolean) => void;
  completeSession: (
    mode: FlashcardMode,
    cardsReviewed: string[],
    correctAnswers: number,
    durationSeconds: number
  ) => void;
  resetCard: (cardId: string) => void;
  resetAllProgress: () => void;

  // Getters
  getCardProgress: (cardId: string) => FlashcardProgress | undefined;
  getCardsDueForReview: () => string[];
  getMasteryLevel: (cardId: string) => number;
  getTotalReviews: () => number;
  getRecentSessions: (limit?: number) => FlashcardSession[];
}

// Spaced repetition intervals (in days)
const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 60];

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      cardProgress: {},
      sessions: [],

      // Initialize a new card
      initializeCard: (cardId) => {
        const { cardProgress } = get();

        // Don't reinitialize
        if (cardProgress[cardId]) return;

        const now = new Date().toISOString();
        set({
          cardProgress: {
            ...cardProgress,
            [cardId]: {
              cardId,
              reviewCount: 0,
              lastReviewed: now,
              nextReviewDate: now, // Due immediately
              masteryLevel: 0,
              mistakes: 0,
            },
          },
        });
      },

      // Record a review attempt
      recordReview: (cardId, correct) => {
        const { cardProgress } = get();
        const progress = cardProgress[cardId];

        if (!progress) {
          // Initialize if doesn't exist
          get().initializeCard(cardId);
          return get().recordReview(cardId, correct);
        }

        const now = new Date();
        const currentLevel = progress.masteryLevel;

        let newLevel = currentLevel;
        let newMistakes = progress.mistakes;

        if (correct) {
          // Increase mastery (max 5)
          newLevel = Math.min(currentLevel + 1, 5);
        } else {
          // Decrease mastery on mistake (min 0)
          newLevel = Math.max(currentLevel - 1, 0);
          newMistakes += 1;
        }

        // Calculate next review date based on spaced repetition
        const intervalDays = REVIEW_INTERVALS[newLevel] || REVIEW_INTERVALS[REVIEW_INTERVALS.length - 1];
        const nextReview = new Date(now);
        nextReview.setDate(nextReview.getDate() + intervalDays);

        set({
          cardProgress: {
            ...cardProgress,
            [cardId]: {
              ...progress,
              reviewCount: progress.reviewCount + 1,
              lastReviewed: now.toISOString(),
              nextReviewDate: nextReview.toISOString(),
              masteryLevel: newLevel,
              mistakes: newMistakes,
            },
          },
        });
      },

      // Complete a flashcard session
      completeSession: (mode, cardsReviewed, correctAnswers, durationSeconds) => {
        const session: FlashcardSession = {
          id: uuidv4() as string,
          mode,
          cardsReviewed,
          correctAnswers,
          totalCards: cardsReviewed.length,
          completedAt: new Date().toISOString(),
          durationSeconds,
        };

        set({
          sessions: [session, ...get().sessions], // New sessions first
        });
      },

      // Reset progress for a card
      resetCard: (cardId) => {
        const { cardProgress } = get();
        const newProgress = { ...cardProgress };
        delete newProgress[cardId];

        set({ cardProgress: newProgress });
      },

      // Reset all flashcard data
      resetAllProgress: () => {
        set({
          cardProgress: {},
          sessions: [],
        });
      },

      // ========================================================================
      // GETTERS
      // ========================================================================

      // Get progress for a card
      getCardProgress: (cardId) => {
        return get().cardProgress[cardId];
      },

      // Get cards due for review
      getCardsDueForReview: () => {
        const { cardProgress } = get();
        const now = new Date();

        return Object.values(cardProgress)
          .filter((progress) => new Date(progress.nextReviewDate) <= now)
          .map((progress) => progress.cardId);
      },

      // Get mastery level for a card
      getMasteryLevel: (cardId) => {
        const progress = get().cardProgress[cardId];
        return progress ? progress.masteryLevel : 0;
      },

      // Get total number of reviews
      getTotalReviews: () => {
        return Object.values(get().cardProgress).reduce(
          (sum, progress) => sum + progress.reviewCount,
          0
        );
      },

      // Get recent sessions
      getRecentSessions: (limit = 10) => {
        return get().sessions.slice(0, limit);
      },
    }),
    {
      name: '@CelestialEye:flashcards',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
