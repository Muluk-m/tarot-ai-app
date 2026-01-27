import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useUserStore } from '@/stores/userStore';
import { useReadingStore } from '@/stores/readingStore';
import { useCardStore } from '@/stores/cardStore';
import {
  loadUserId,
  saveUserId,
  loadUserSettings,
  loadDailyLimit,
  saveDailyLimit,
  loadReadingHistory,
} from '@/services/storageService';

/**
 * App Initialization Hook
 * Loads persisted data on app startup
 *
 * Responsibilities:
 * 1. Load or create user ID
 * 2. Load user settings
 * 3. Load daily limit and check if needs reset
 * 4. Load reading history
 * 5. Initialize card deck
 */

export function useAppInitialization() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    setUserId,
    updateSettings,
    setDailyLimit,
    resetDailyLimit: resetDailyLimitInStore,
  } = useUserStore();

  const { setReadingHistory } = useReadingStore();
  const { initializeDeck } = useCardStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 1. Load or create user ID
      let userId = await loadUserId();
      if (!userId) {
        userId = uuidv4();
        await saveUserId(userId);
      }
      setUserId(userId);

      // 2. Load user settings
      const settings = await loadUserSettings();
      if (settings) {
        updateSettings(settings);
      }

      // 3. Load and validate daily limit
      const dailyLimit = await loadDailyLimit();
      if (dailyLimit) {
        const today = new Date().toISOString().split('T')[0];

        // Check if need to reset (new day)
        if (dailyLimit.date !== today) {
          // Reset to new day
          const newLimit = {
            date: today,
            count: 0,
            resetAt: getNextMidnight(),
          };
          await saveDailyLimit(newLimit);
          setDailyLimit(newLimit);
          resetDailyLimitInStore();
        } else {
          setDailyLimit(dailyLimit);
        }
      } else {
        // First time, create daily limit
        const newLimit = {
          date: new Date().toISOString().split('T')[0],
          count: 0,
          resetAt: getNextMidnight(),
        };
        await saveDailyLimit(newLimit);
        setDailyLimit(newLimit);
      }

      // 4. Load reading history
      const history = await loadReadingHistory();
      setReadingHistory(history);

      // 5. Initialize card deck
      initializeDeck();

      setIsLoading(false);
    } catch (err) {
      console.error('Failed to initialize app:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize app');
      setIsLoading(false);
    }
  };

  return { isLoading, error };
}

function getNextMidnight(): number {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.getTime();
}
