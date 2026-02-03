/**
 * Quiz Store
 * Manages quiz attempts, results, and scores
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { QuizResult } from '@/types/learning.types';

interface QuizState {
  // State
  quizResults: QuizResult[];
  currentQuizId: string | null;
  currentAnswers: Record<string, string | string[]>; // questionId -> answer(s)

  // Actions
  startQuiz: (quizId: string) => void;
  answerQuestion: (questionId: string, answer: string | string[]) => void;
  submitQuiz: (result: QuizResult) => void;
  clearCurrentQuiz: () => void;
  deleteResult: (resultId: string) => void;
  resetQuizzes: () => void;

  // Getters
  getQuizResults: (quizId: string) => QuizResult[];
  getBestScore: (quizId: string) => number | null;
  getAverageScore: (quizId: string) => number | null;
  getTotalQuizzesPassed: () => number;
  getPerfectScores: () => number;
  hasPassedQuiz: (quizId: string) => boolean;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      quizResults: [],
      currentQuizId: null,
      currentAnswers: {},

      // Start a new quiz
      startQuiz: (quizId: string) => {
        set({
          currentQuizId: quizId,
          currentAnswers: {},
        });
      },

      // Answer a question
      answerQuestion: (questionId: string, answer: string | string[]) => {
        set({
          currentAnswers: {
            ...get().currentAnswers,
            [questionId]: answer,
          },
        });
      },

      // Submit quiz and save result
      submitQuiz: (result: QuizResult) => {
        set({
          quizResults: [...get().quizResults, result],
          currentQuizId: null,
          currentAnswers: {},
        });
      },

      // Clear current quiz (cancel/exit)
      clearCurrentQuiz: () => {
        set({
          currentQuizId: null,
          currentAnswers: {},
        });
      },

      // Delete a result
      deleteResult: (resultId: string) => {
        set({
          quizResults: get().quizResults.filter((r) => r.id !== resultId),
        });
      },

      // Reset all quiz data
      resetQuizzes: () => {
        set({
          quizResults: [],
          currentQuizId: null,
          currentAnswers: {},
        });
      },

      // ========================================================================
      // GETTERS
      // ========================================================================

      // Get all results for a specific quiz
      getQuizResults: (quizId: string) => {
        return get().quizResults.filter((r) => r.quizId === quizId);
      },

      // Get best score for a quiz
      getBestScore: (quizId: string) => {
        const results = get().getQuizResults(quizId);
        if (results.length === 0) return null;

        return Math.max(...results.map((r) => r.score));
      },

      // Get average score for a quiz
      getAverageScore: (quizId: string) => {
        const results = get().getQuizResults(quizId);
        if (results.length === 0) return null;

        const total = results.reduce((sum, r) => sum + r.score, 0);
        return Math.round(total / results.length);
      },

      // Get total quizzes passed
      getTotalQuizzesPassed: () => {
        return get().quizResults.filter((r) => r.passed).length;
      },

      // Get number of perfect scores (100%)
      getPerfectScores: () => {
        return get().quizResults.filter((r) => r.score === 100).length;
      },

      // Check if user has ever passed a quiz
      hasPassedQuiz: (quizId: string) => {
        const results = get().getQuizResults(quizId);
        return results.some((r) => r.passed);
      },
    }),
    {
      name: '@CelestialEye:quiz',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
