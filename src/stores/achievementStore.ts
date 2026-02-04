/**
 * Achievement Store
 * Manages unlocked achievements and gamification
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_ACHIEVEMENTS, getAchievementById } from '@/data/achievements';
import type { Achievement } from '@/types/learning.types';

interface AchievementState {
  // State
  unlockedAchievements: string[]; // Achievement IDs

  // Actions
  unlockAchievement: (achievementId: string) => boolean;
  checkAndUnlockAchievements: (progressData: {
    masteredCards: number;
    completedCourses: number;
    completedLessons: number;
    studyStreak: number;
    perfectQuizzes: number;
    journalEntries: number;
    readings: number;
  }) => string[];
  resetAchievements: () => void;

  // Getters
  isUnlocked: (achievementId: string) => boolean;
  getUnlockedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
  getTotalUnlocked: () => number;
  getUnlockPercentage: () => number;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlockedAchievements: [],

      // Unlock a specific achievement
      unlockAchievement: (achievementId) => {
        const { unlockedAchievements } = get();

        // Already unlocked
        if (unlockedAchievements.includes(achievementId)) {
          return false;
        }

        // Verify achievement exists
        const achievement = getAchievementById(achievementId);
        if (!achievement) {
          console.warn(`Achievement ${achievementId} not found`);
          return false;
        }

        // Unlock it
        set({
          unlockedAchievements: [...unlockedAchievements, achievementId],
        });

        return true;
      },

      // Check progress and unlock all eligible achievements
      checkAndUnlockAchievements: (progressData) => {
        const newlyUnlocked: string[] = [];

        ALL_ACHIEVEMENTS.forEach((achievement) => {
          // Skip if already unlocked
          if (get().isUnlocked(achievement.id)) return;

          let shouldUnlock = false;
          const { requirement } = achievement;

          // Check each requirement type
          switch (requirement.type) {
            case 'cards-mastered':
              shouldUnlock = progressData.masteredCards >= requirement.target;
              break;
            case 'courses-completed':
              shouldUnlock = progressData.completedCourses >= requirement.target;
              break;
            case 'lessons-completed':
              shouldUnlock = progressData.completedLessons >= requirement.target;
              break;
            case 'study-streak':
              shouldUnlock = progressData.studyStreak >= requirement.target;
              break;
            case 'quiz-perfect':
              shouldUnlock = progressData.perfectQuizzes >= requirement.target;
              break;
            case 'journal-entries':
              shouldUnlock = progressData.journalEntries >= requirement.target;
              break;
            case 'readings-completed':
              shouldUnlock = progressData.readings >= requirement.target;
              break;
          }

          if (shouldUnlock) {
            const unlocked = get().unlockAchievement(achievement.id);
            if (unlocked) {
              newlyUnlocked.push(achievement.id);
            }
          }
        });

        return newlyUnlocked;
      },

      // Reset all achievements
      resetAchievements: () => {
        set({ unlockedAchievements: [] });
      },

      // ========================================================================
      // GETTERS
      // ========================================================================

      // Check if achievement is unlocked
      isUnlocked: (achievementId) => {
        return get().unlockedAchievements.includes(achievementId);
      },

      // Get all unlocked achievements
      getUnlockedAchievements: () => {
        return get()
          .unlockedAchievements.map((id) => getAchievementById(id))
          .filter((a): a is Achievement => a !== undefined);
      },

      // Get all locked achievements (visible ones)
      getLockedAchievements: () => {
        return ALL_ACHIEVEMENTS.filter((a) => !get().isUnlocked(a.id) && !a.hidden);
      },

      // Get total number unlocked
      getTotalUnlocked: () => {
        return get().unlockedAchievements.length;
      },

      // Get unlock percentage
      getUnlockPercentage: () => {
        const total = ALL_ACHIEVEMENTS.length;
        const unlocked = get().unlockedAchievements.length;
        return Math.round((unlocked / total) * 100);
      },
    }),
    {
      name: '@CelestialEye:achievements',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
