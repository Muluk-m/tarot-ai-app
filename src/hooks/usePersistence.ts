import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useReadingStore } from '@/stores/readingStore';
import {
  saveDailyLimit,
  saveUserSettings,
  saveReadingHistory,
} from '@/services/storageService';

/**
 * Persistence Hook
 * Auto-saves store changes to AsyncStorage
 *
 * NOTE: Call this hook in a component that stays mounted
 * (like the root layout after initialization)
 */

export function usePersistence() {
  const { dailyLimit, settings } = useUserStore();
  const { readingHistory } = useReadingStore();

  // Save daily limit when it changes
  useEffect(() => {
    saveDailyLimit(dailyLimit).catch((error) => {
      console.error('Failed to persist daily limit:', error);
    });
  }, [dailyLimit]);

  // Save user settings when they change
  useEffect(() => {
    saveUserSettings(settings).catch((error) => {
      console.error('Failed to persist user settings:', error);
    });
  }, [settings]);

  // Save reading history when it changes
  useEffect(() => {
    saveReadingHistory(readingHistory).catch((error) => {
      console.error('Failed to persist reading history:', error);
    });
  }, [readingHistory]);
}
