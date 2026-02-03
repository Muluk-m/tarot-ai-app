import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { useJournalStore } from '@/stores/journalStore';
import type { JournalEntry, JournalEntryType } from '@/types/learning.types';

const ENTRY_TYPES: { key: JournalEntryType; title: string; icon: string }[] = [
  { key: 'learning', title: 'Learning', icon: '📚' },
  { key: 'practice', title: 'Practice', icon: '🎴' },
  { key: 'reflection', title: 'Reflection', icon: '💭' },
  { key: 'daily-card', title: 'Daily Card', icon: '✨' },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export default function JournalScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<JournalEntryType | 'all'>('all');

  const { entries, searchEntries, getEntriesByType, getTotalEntries } = useJournalStore();

  const getFilteredEntries = (): JournalEntry[] => {
    let filtered = entries;

    if (selectedType !== 'all') {
      filtered = getEntriesByType(selectedType);
    }

    if (searchQuery.trim()) {
      const searchResults = searchEntries(searchQuery);
      filtered = filtered.filter((e) => searchResults.some((s) => s.id === e.id));
    }

    return filtered;
  };

  const filteredEntries = getFilteredEntries();
  const totalEntries = getTotalEntries();

  const getTypeInfo = (type: JournalEntryType) => {
    return ENTRY_TYPES.find((t) => t.key === type) || ENTRY_TYPES[0];
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Journal</Text>
          <TouchableOpacity
            onPress={() => router.push('/(learn)/journal/new')}
            style={styles.addButton}
          >
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search entries..."
              placeholderTextColor={colors.text.quaternary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Type Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          <TouchableOpacity
            onPress={() => setSelectedType('all')}
            style={[
              styles.filterChip,
              selectedType === 'all' && styles.filterChipSelected,
            ]}
          >
            <Text style={styles.filterIcon}>📖</Text>
            <Text
              style={[
                styles.filterText,
                selectedType === 'all' && styles.filterTextSelected,
              ]}
            >
              All ({totalEntries})
            </Text>
          </TouchableOpacity>

          {ENTRY_TYPES.map((type) => {
            const count = getEntriesByType(type.key).length;
            const isSelected = selectedType === type.key;

            return (
              <TouchableOpacity
                key={type.key}
                onPress={() => setSelectedType(type.key)}
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipSelected,
                ]}
              >
                <Text style={styles.filterIcon}>{type.icon}</Text>
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.filterTextSelected,
                  ]}
                >
                  {type.title} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Entries List */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredEntries.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyTitle}>
                {searchQuery ? 'No matching entries' : 'No journal entries yet'}
              </Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery
                  ? 'Try a different search term'
                  : 'Start documenting your tarot learning journey'}
              </Text>
              {!searchQuery && (
                <TouchableOpacity
                  onPress={() => router.push('/(learn)/journal/new')}
                  style={styles.emptyButton}
                >
                  <LinearGradient
                    colors={[colors.accent.gold, colors.accent.goldLight]}
                    style={styles.emptyButtonGradient}
                  >
                    <Text style={styles.emptyButtonText}>Write First Entry</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            filteredEntries.map((entry) => {
              const typeInfo = getTypeInfo(entry.type);

              return (
                <TouchableOpacity
                  key={entry.id}
                  activeOpacity={0.9}
                  onPress={() =>
                    router.push({
                      pathname: '/(learn)/journal/[entryId]',
                      params: { entryId: entry.id },
                    })
                  }
                  style={styles.entryCard}
                >
                  <LinearGradient
                    colors={[colors.background.secondary, colors.background.tertiary]}
                    style={styles.entryGradient}
                  >
                    <View style={styles.entryHeader}>
                      <View style={styles.entryTypeTag}>
                        <Text style={styles.entryTypeIcon}>{typeInfo.icon}</Text>
                        <Text style={styles.entryTypeText}>{typeInfo.title}</Text>
                      </View>
                      <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                    </View>

                    <Text style={styles.entryTitle} numberOfLines={1}>
                      {entry.title}
                    </Text>
                    <Text style={styles.entryContent} numberOfLines={2}>
                      {entry.content}
                    </Text>

                    {entry.tags.length > 0 && (
                      <View style={styles.tagsContainer}>
                        {entry.tags.slice(0, 3).map((tag, i) => (
                          <View key={i} style={styles.tagPill}>
                            <Text style={styles.tagText}>#{tag}</Text>
                          </View>
                        ))}
                        {entry.tags.length > 3 && (
                          <Text style={styles.moreTags}>
                            +{entry.tags.length - 3}
                          </Text>
                        )}
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })
          )}

          {/* Bottom spacing */}
          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 24,
    color: colors.background.primary,
    fontWeight: '600',
  },

  // Search
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.background.tertiary,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: colors.text.primary,
  },
  clearIcon: {
    fontSize: 14,
    color: colors.text.tertiary,
    padding: spacing.xs,
  },

  // Filter
  filterContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    marginRight: spacing.sm,
    gap: spacing.xs,
  },
  filterChipSelected: {
    backgroundColor: colors.accent.gold + '30',
    borderWidth: 1,
    borderColor: colors.accent.gold + '50',
  },
  filterIcon: {
    fontSize: 14,
  },
  filterText: {
    fontSize: 13,
    color: colors.text.tertiary,
  },
  filterTextSelected: {
    color: colors.accent.gold,
    fontWeight: '600',
  },

  // Content
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: 15,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  emptyButton: {
    borderRadius: 14,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  emptyButtonGradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 14,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background.primary,
  },

  // Entry Card
  entryCard: {
    marginBottom: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.sm,
  },
  entryGradient: {
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  entryTypeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    gap: 4,
  },
  entryTypeIcon: {
    fontSize: 12,
  },
  entryTypeText: {
    fontSize: 11,
    color: colors.text.tertiary,
    fontWeight: '500',
  },
  entryDate: {
    fontSize: 12,
    color: colors.text.quaternary,
  },
  entryTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  entryContent: {
    fontSize: 14,
    color: colors.text.tertiary,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  tagPill: {
    backgroundColor: colors.accent.purple + '25',
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    color: colors.accent.purple,
  },
  moreTags: {
    fontSize: 11,
    color: colors.text.quaternary,
  },
});
