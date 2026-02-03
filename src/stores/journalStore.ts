/**
 * Journal Store
 * Manages learning journal entries and reflections
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { JournalEntry, JournalEntryType } from '@/types/learning.types';
import { v4 as uuidv4 } from '@/utils/uuid';

interface JournalState {
  // State
  entries: JournalEntry[];

  // Actions
  addEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => string;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  resetJournal: () => void;

  // Getters
  getEntryById: (id: string) => JournalEntry | undefined;
  getEntriesByType: (type: JournalEntryType) => JournalEntry[];
  getEntriesByTag: (tag: string) => JournalEntry[];
  getEntriesByCard: (cardId: string) => JournalEntry[];
  getRecentEntries: (limit?: number) => JournalEntry[];
  searchEntries: (query: string) => JournalEntry[];
  getTotalEntries: () => number;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],

      // Add new entry
      addEntry: (entry) => {
        const id = uuidv4() as string;
        const newEntry: JournalEntry = {
          ...entry,
          id,
          date: new Date().toISOString(),
        };

        set({
          entries: [newEntry, ...get().entries], // New entries first
        });

        return id;
      },

      // Update existing entry
      updateEntry: (id, updates) => {
        set({
          entries: get().entries.map((entry) =>
            entry.id === id ? { ...entry, ...updates } : entry
          ),
        });
      },

      // Delete entry
      deleteEntry: (id) => {
        set({
          entries: get().entries.filter((entry) => entry.id !== id),
        });
      },

      // Reset all journal data
      resetJournal: () => {
        set({ entries: [] });
      },

      // ========================================================================
      // GETTERS
      // ========================================================================

      // Get entry by ID
      getEntryById: (id) => {
        return get().entries.find((entry) => entry.id === id);
      },

      // Get entries by type
      getEntriesByType: (type) => {
        return get().entries.filter((entry) => entry.type === type);
      },

      // Get entries by tag
      getEntriesByTag: (tag) => {
        return get().entries.filter((entry) => entry.tags.includes(tag));
      },

      // Get entries related to a specific card
      getEntriesByCard: (cardId) => {
        return get().entries.filter(
          (entry) => entry.relatedCards && entry.relatedCards.includes(cardId)
        );
      },

      // Get recent entries
      getRecentEntries: (limit = 10) => {
        return get().entries.slice(0, limit);
      },

      // Search entries by title or content
      searchEntries: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().entries.filter(
          (entry) =>
            entry.title.toLowerCase().includes(lowerQuery) ||
            entry.content.toLowerCase().includes(lowerQuery) ||
            entry.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
      },

      // Get total number of entries
      getTotalEntries: () => {
        return get().entries.length;
      },
    }),
    {
      name: '@CelestialEye:journal',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
