import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ReadingRecord } from '@/stores/readingStore';
import type { DailyLimit, UserSettings } from '@/stores/userStore';

/**
 * Storage Service
 * Handles persistent data storage using AsyncStorage
 *
 * Storage Keys:
 * - @tarot_reading_history: Array of ReadingRecord
 * - @tarot_daily_limit: DailyLimit object
 * - @tarot_user_settings: UserSettings object
 * - @tarot_user_id: string (UUID)
 */

const STORAGE_KEYS = {
  READING_HISTORY: '@tarot_reading_history',
  DAILY_LIMIT: '@tarot_daily_limit',
  USER_SETTINGS: '@tarot_user_settings',
  USER_ID: '@tarot_user_id',
  ONBOARDING_COMPLETE: '@tarot_onboarding_complete',
} as const;

// ============ Reading History ============

export async function saveReadingHistory(history: ReadingRecord[]): Promise<void> {
  try {
    // Keep only last 100 readings to prevent storage bloat
    const trimmed = history.slice(0, 100);
    await AsyncStorage.setItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save reading history:', error);
    throw error;
  }
}

export async function loadReadingHistory(): Promise<ReadingRecord[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.READING_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load reading history:', error);
    return [];
  }
}

export async function addReading(reading: ReadingRecord): Promise<void> {
  try {
    const history = await loadReadingHistory();
    history.unshift(reading); // Add to beginning
    await saveReadingHistory(history);
  } catch (error) {
    console.error('Failed to add reading:', error);
    throw error;
  }
}

export async function deleteReading(id: string): Promise<void> {
  try {
    const history = await loadReadingHistory();
    const filtered = history.filter((r) => r.id !== id);
    await saveReadingHistory(filtered);
  } catch (error) {
    console.error('Failed to delete reading:', error);
    throw error;
  }
}

export async function updateReading(id: string, updates: Partial<ReadingRecord>): Promise<void> {
  try {
    const history = await loadReadingHistory();
    const updated = history.map((r) => (r.id === id ? { ...r, ...updates } : r));
    await saveReadingHistory(updated);
  } catch (error) {
    console.error('Failed to update reading:', error);
    throw error;
  }
}

export async function clearReadingHistory(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.READING_HISTORY);
  } catch (error) {
    console.error('Failed to clear reading history:', error);
    throw error;
  }
}

// ============ Daily Limit ============

export async function saveDailyLimit(limit: DailyLimit): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_LIMIT, JSON.stringify(limit));
  } catch (error) {
    console.error('Failed to save daily limit:', error);
    throw error;
  }
}

export async function loadDailyLimit(): Promise<DailyLimit | null> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_LIMIT);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load daily limit:', error);
    return null;
  }
}

export async function resetDailyLimit(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.DAILY_LIMIT);
  } catch (error) {
    console.error('Failed to reset daily limit:', error);
    throw error;
  }
}

// ============ User Settings ============

export async function saveUserSettings(settings: UserSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save user settings:', error);
    throw error;
  }
}

export async function loadUserSettings(): Promise<UserSettings | null> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load user settings:', error);
    return null;
  }
}

// ============ User ID ============

export async function saveUserId(userId: string): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  } catch (error) {
    console.error('Failed to save user ID:', error);
    throw error;
  }
}

export async function loadUserId(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
  } catch (error) {
    console.error('Failed to load user ID:', error);
    return null;
  }
}

// ============ Onboarding ============

export async function setOnboardingComplete(complete: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, JSON.stringify(complete));
  } catch (error) {
    console.error('Failed to save onboarding status:', error);
    throw error;
  }
}

export async function isOnboardingComplete(): Promise<boolean> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error('Failed to load onboarding status:', error);
    return false;
  }
}

// ============ Utility ============

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.READING_HISTORY,
      STORAGE_KEYS.DAILY_LIMIT,
      STORAGE_KEYS.USER_SETTINGS,
      STORAGE_KEYS.USER_ID,
      STORAGE_KEYS.ONBOARDING_COMPLETE,
    ]);
  } catch (error) {
    console.error('Failed to clear all data:', error);
    throw error;
  }
}

export async function getStorageInfo(): Promise<{
  historyCount: number;
  hasLimit: boolean;
  hasSettings: boolean;
  hasUserId: boolean;
}> {
  try {
    const [history, limit, settings, userId] = await Promise.all([
      loadReadingHistory(),
      loadDailyLimit(),
      loadUserSettings(),
      loadUserId(),
    ]);

    return {
      historyCount: history.length,
      hasLimit: limit !== null,
      hasSettings: settings !== null,
      hasUserId: userId !== null,
    };
  } catch (error) {
    console.error('Failed to get storage info:', error);
    return {
      historyCount: 0,
      hasLimit: false,
      hasSettings: false,
      hasUserId: false,
    };
  }
}
