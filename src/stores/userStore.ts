import { create } from 'zustand';

/**
 * User Store
 * Manages user settings, daily limits, and preferences
 */

export interface UserSettings {
  notificationsEnabled: boolean;
  premiumStatus: boolean;
  onboardingCompleted: boolean;
  preferredLanguage: string;
  theme: 'dark' | 'light';
}

export interface DailyLimit {
  date: string; // ISO date string "2026-01-27"
  count: number; // Number of readings used today
  resetAt: number; // Unix timestamp for next reset (midnight)
}

export interface UserState {
  userId: string;
  settings: UserSettings;
  dailyLimit: DailyLimit;
  totalReadings: number;

  // Actions
  setUserId: (id: string) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  incrementDailyUsage: () => void;
  resetDailyLimit: () => void;
  setDailyLimit: (limit: DailyLimit) => void;
  incrementTotalReadings: () => void;
}

const getDefaultDailyLimit = (): DailyLimit => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return {
    date: now.toISOString().split('T')[0],
    count: 0,
    resetAt: tomorrow.getTime(),
  };
};

export const useUserStore = create<UserState>((set) => ({
  userId: '',
  settings: {
    notificationsEnabled: false,
    premiumStatus: false,
    onboardingCompleted: false,
    preferredLanguage: 'en',
    theme: 'dark',
  },
  dailyLimit: getDefaultDailyLimit(),
  totalReadings: 0,

  setUserId: (id) => set({ userId: id }),

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  incrementDailyUsage: () =>
    set((state) => ({
      dailyLimit: {
        ...state.dailyLimit,
        count: state.dailyLimit.count + 1,
      },
    })),

  resetDailyLimit: () => set({ dailyLimit: getDefaultDailyLimit() }),

  setDailyLimit: (limit) => set({ dailyLimit: limit }),

  incrementTotalReadings: () =>
    set((state) => ({
      totalReadings: state.totalReadings + 1,
    })),
}));
