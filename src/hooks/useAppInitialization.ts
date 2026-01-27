import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from '@/utils/uuid';
import { useUserStore } from '@/stores/userStore';
import { useReadingStore } from '@/stores/readingStore';
import { useCardStore } from '@/stores/cardStore';
import {
  loadUserId,
  saveUserId,
  loadUserSettings,
  loadReadingHistory,
} from '@/services/storageService';

/**
 * App Initialization Hook
 * Loads persisted data on app startup
 *
 * Responsibilities:
 * 1. Load or create user ID
 * 2. Load user settings
 * 3. Load reading history
 * 4. Initialize card deck
 */

export function useAppInitialization() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    setUserId,
    updateSettings,
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

      // 3. Load reading history (no daily limit needed)
      const history = await loadReadingHistory();
      setReadingHistory(history);

      // 4. Initialize card deck
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
