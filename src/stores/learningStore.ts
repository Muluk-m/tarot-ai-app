/**
 * Learning Progress Store
 * Manages user's learning journey, course progress, and card mastery
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LearningProgress, Stage } from '@/types/learning.types';
import { getLevelInfo } from '@/data/achievements';

interface LearningState extends LearningProgress {
  // Actions
  completeLesson: (lessonId: string, courseId: string) => void;
  completeCourse: (courseId: string) => void;
  masterCard: (cardId: string) => void;
  addLearningCard: (cardId: string) => void;
  removeLearningCard: (cardId: string) => void;
  addStudyTime: (minutes: number) => void;
  updateStreak: () => void;
  unlockAchievement: (achievementId: string) => void;
  resetProgress: () => void;

  // Getters
  isLessonCompleted: (lessonId: string) => boolean;
  isCourseCompleted: (courseId: string) => boolean;
  isCardMastered: (cardId: string) => boolean;
  getCurrentLevel: () => number;
  getLevelTitle: () => string;
}

const initialState: LearningProgress = {
  userId: 'device-id', // Will be set to actual device ID
  currentStage: 'beginner',
  currentCourseId: undefined,
  completedCourses: [],
  completedLessons: [],
  masteredCards: [],
  learningCards: [],
  totalStudyTime: 0,
  lastStudyDate: new Date().toISOString(),
  studyStreak: 0,
  currentLevel: 1,
  experiencePoints: 0,
  achievements: [],
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Complete a lesson
      completeLesson: (lessonId: string, courseId: string) => {
        const { completedLessons, currentCourseId } = get();

        // Don't add duplicate
        if (completedLessons.includes(lessonId)) return;

        set({
          completedLessons: [...completedLessons, lessonId],
          currentCourseId: courseId,
          experiencePoints: get().experiencePoints + 10, // Award XP
        });

        // Update study date and streak
        get().updateStreak();
      },

      // Complete a course
      completeCourse: (courseId: string) => {
        const { completedCourses, experiencePoints } = get();

        // Don't add duplicate
        if (completedCourses.includes(courseId)) return;

        set({
          completedCourses: [...completedCourses, courseId],
          experiencePoints: experiencePoints + 100, // Award bonus XP
        });
      },

      // Master a card (fully learned)
      masterCard: (cardId: string) => {
        const { masteredCards, learningCards, currentLevel } = get();

        // Already mastered
        if (masteredCards.includes(cardId)) return;

        // Add to mastered, remove from learning
        const newMastered = [...masteredCards, cardId];
        const newLearning = learningCards.filter((id) => id !== cardId);

        // Calculate new level based on mastered cards
        const levelInfo = getLevelInfo(newMastered.length);

        set({
          masteredCards: newMastered,
          learningCards: newLearning,
          currentLevel: levelInfo.level,
          experiencePoints: get().experiencePoints + 25, // Award XP
        });
      },

      // Add card to learning list
      addLearningCard: (cardId: string) => {
        const { learningCards, masteredCards } = get();

        // Don't add if already mastered or already learning
        if (masteredCards.includes(cardId) || learningCards.includes(cardId)) {
          return;
        }

        set({
          learningCards: [...learningCards, cardId],
        });
      },

      // Remove card from learning list
      removeLearningCard: (cardId: string) => {
        set({
          learningCards: get().learningCards.filter((id) => id !== cardId),
        });
      },

      // Add study time
      addStudyTime: (minutes: number) => {
        set({
          totalStudyTime: get().totalStudyTime + minutes,
        });
        get().updateStreak();
      },

      // Update study streak
      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const lastDate = get().lastStudyDate.split('T')[0];

        // Same day - no change
        if (today === lastDate) {
          return;
        }

        // Calculate days difference
        const todayTime = new Date(today).getTime();
        const lastTime = new Date(lastDate).getTime();
        const daysDiff = Math.floor((todayTime - lastTime) / (1000 * 60 * 60 * 24));

        // Consecutive day - increment streak
        if (daysDiff === 1) {
          set({
            studyStreak: get().studyStreak + 1,
            lastStudyDate: new Date().toISOString(),
          });
        }
        // Missed days - reset streak
        else if (daysDiff > 1) {
          set({
            studyStreak: 1,
            lastStudyDate: new Date().toISOString(),
          });
        }
      },

      // Unlock achievement
      unlockAchievement: (achievementId: string) => {
        const { achievements } = get();

        // Don't add duplicate
        if (achievements.includes(achievementId)) return;

        set({
          achievements: [...achievements, achievementId],
          experiencePoints: get().experiencePoints + 50, // Bonus XP for achievement
        });
      },

      // Reset all progress (for testing or user request)
      resetProgress: () => {
        set(initialState);
      },

      // ========================================================================
      // GETTERS
      // ========================================================================

      isLessonCompleted: (lessonId: string) => {
        return get().completedLessons.includes(lessonId);
      },

      isCourseCompleted: (courseId: string) => {
        return get().completedCourses.includes(courseId);
      },

      isCardMastered: (cardId: string) => {
        return get().masteredCards.includes(cardId);
      },

      getCurrentLevel: () => {
        return get().currentLevel;
      },

      getLevelTitle: () => {
        const level = get().currentLevel;
        const levelInfo = getLevelInfo(get().masteredCards.length);
        return levelInfo.title;
      },
    }),
    {
      name: '@CelestialEye:learning',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
