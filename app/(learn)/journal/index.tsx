/**
 * Journal Screen - Learning Journal
 * iPad and iOS adaptive layout
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { useJournalStore } from '@/stores/journalStore';
import type { JournalEntry, JournalEntryType } from '@/types/learning.types';

// UI Components
import {
  ScreenContainer,
  Row,
  Spacer,
  responsive,
  isLargeTablet,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
  BookIcon,
  CardsIcon,
  SparkleIcon,
  EditIcon,
} from '@/components/ui';
import { IconButton, Button } from '@/components/ui/Buttons';

const ENTRY_TYPES: {
  key: JournalEntryType | 'all';
  title: string;
  Icon: React.FC<any>;
  color: string;
}[] = [
  { key: 'all', title: 'All', Icon: BookIcon, color: colors.accent.gold },
  { key: 'learning', title: 'Learning', Icon: BookIcon, color: '#10B981' },
  { key: 'practice', title: 'Practice', Icon: CardsIcon, color: colors.accent.purple },
  { key: 'reflection', title: 'Reflection', Icon: EditIcon, color: colors.accent.cyan },
  { key: 'daily-card', title: 'Daily Card', Icon: SparkleIcon, color: colors.accent.gold },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

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
    return ENTRY_TYPES.find((t) => t.key === type) || ENTRY_TYPES[1];
  };

  const numColumns = isLargeTablet ? 2 : 1;

  const renderEntry = ({ item: entry }: { item: JournalEntry }) => {
    const typeInfo = getTypeInfo(entry.type);
    const TypeIcon = typeInfo.Icon;

    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/(learn)/journal/[entryId]',
            params: { entryId: entry.id },
          })
        }
        style={({ pressed }) => [styles.entryCard, pressed && styles.entryCardPressed]}>
        <View style={styles.entryHeader}>
          <View style={[styles.entryTypeTag, { backgroundColor: typeInfo.color + '20' }]}>
            <TypeIcon size={14} color={typeInfo.color} />
            <Text style={[styles.entryTypeText, { color: typeInfo.color }]}>{typeInfo.title}</Text>
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
            {entry.tags.length > 3 && <Text style={styles.moreTags}>+{entry.tags.length - 3}</Text>}
          </View>
        )}

        <View style={styles.entryArrow}>
          <ChevronRightIcon size={16} color={colors.text.tertiary} />
        </View>
      </Pressable>
    );
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Row justify="space-between" align="center" style={styles.header}>
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />
          <Text style={styles.headerTitle}>Journal</Text>
          <IconButton
            icon={<PlusIcon size={20} color={colors.background.primary} />}
            onPress={() => router.push('/(learn)/journal/new')}
            variant="filled"
            size="md"
          />
        </Row>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchIcon size={18} color={colors.text.quaternary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search journal..."
            placeholderTextColor={colors.text.quaternary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <XIcon size={16} color={colors.text.tertiary} />
            </Pressable>
          )}
        </View>

        {/* Type Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}>
          {ENTRY_TYPES.map((type) => {
            const isSelected = selectedType === type.key;
            const count =
              type.key === 'all'
                ? totalEntries
                : getEntriesByType(type.key as JournalEntryType).length;
            const TypeIcon = type.Icon;

            return (
              <Pressable
                key={type.key}
                onPress={() => setSelectedType(type.key)}
                style={[styles.filterChip, isSelected && { borderColor: type.color }]}>
                <TypeIcon size={16} color={type.color} />
                <Text style={[styles.filterText, isSelected && { color: colors.text.primary }]}>
                  {type.title} ({count})
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Entries List */}
      {filteredEntries.length === 0 ? (
        <View style={styles.emptyState}>
          <EditIcon size={64} color={colors.text.quaternary} />
          <Spacer size={responsive.spacing(16, 24)} />
          <Text style={styles.emptyTitle}>
            {searchQuery ? 'No matching entries' : 'No entries yet'}
          </Text>
          <Text style={styles.emptySubtitle}>
            {searchQuery ? 'Try different search terms' : 'Record your tarot learning insights'}
          </Text>
          {!searchQuery && (
            <>
              <Spacer size={responsive.spacing(20, 28)} />
              <Button
                title="Write First Entry"
                onPress={() => router.push('/(learn)/journal/new')}
                variant="primary"
              />
            </>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredEntries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          key={numColumns}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={numColumns > 1 ? styles.listRow : undefined}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<Spacer size={responsive.spacing(32, 48)} />}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: responsive.spacing(16, 24),
  },
  header: {
    marginBottom: responsive.spacing(16, 20),
  },
  headerTitle: {
    fontSize: responsive.fontSize(22, 26),
    fontWeight: '700',
    color: colors.text.primary,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    paddingHorizontal: responsive.spacing(14, 18),
    marginBottom: responsive.spacing(12, 16),
    borderWidth: 1,
    borderColor: colors.background.tertiary,
    gap: responsive.spacing(10, 12),
  },
  searchInput: {
    flex: 1,
    height: responsive.width(44, 52),
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.primary,
  },

  // Filter
  filterContainer: {
    paddingBottom: responsive.spacing(16, 20),
    gap: responsive.spacing(8, 12),
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingVertical: responsive.spacing(10, 12),
    paddingHorizontal: responsive.spacing(14, 18),
    borderRadius: responsive.width(20, 24),
    marginRight: responsive.spacing(8, 12),
    gap: responsive.spacing(6, 8),
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterText: {
    fontSize: responsive.fontSize(13, 15),
    color: colors.text.tertiary,
    fontWeight: '500',
  },

  // List
  listContent: {
    paddingHorizontal: responsive.spacing(16, 24),
  },
  listRow: {
    gap: responsive.spacing(12, 16),
  },

  // Entry Card
  entryCard: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(16, 20),
    padding: responsive.spacing(16, 20),
    marginBottom: responsive.spacing(12, 16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
  },
  entryCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.spacing(10, 12),
  },
  entryTypeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive.spacing(4, 6),
    paddingHorizontal: responsive.spacing(10, 12),
    borderRadius: responsive.width(8, 10),
    gap: responsive.spacing(4, 6),
  },
  entryTypeText: {
    fontSize: responsive.fontSize(11, 13),
    fontWeight: '600',
  },
  entryDate: {
    fontSize: responsive.fontSize(12, 14),
    color: colors.text.quaternary,
  },
  entryTitle: {
    fontSize: responsive.fontSize(17, 20),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: responsive.spacing(4, 6),
    paddingRight: responsive.spacing(32, 40),
  },
  entryContent: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.tertiary,
    lineHeight: responsive.fontSize(20, 24),
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive.spacing(10, 12),
    gap: responsive.spacing(6, 8),
  },
  tagPill: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingVertical: responsive.spacing(3, 4),
    paddingHorizontal: responsive.spacing(8, 10),
    borderRadius: responsive.width(8, 10),
  },
  tagText: {
    fontSize: responsive.fontSize(11, 13),
    color: colors.accent.purple,
  },
  moreTags: {
    fontSize: responsive.fontSize(11, 13),
    color: colors.text.quaternary,
  },
  entryArrow: {
    position: 'absolute',
    top: responsive.spacing(16, 20),
    right: responsive.spacing(16, 20),
    width: responsive.width(28, 34),
    height: responsive.width(28, 34),
    borderRadius: responsive.width(8, 10),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive.spacing(32, 48),
  },
  emptyTitle: {
    fontSize: responsive.fontSize(20, 24),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: responsive.spacing(8, 12),
  },
  emptySubtitle: {
    fontSize: responsive.fontSize(15, 17),
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});
