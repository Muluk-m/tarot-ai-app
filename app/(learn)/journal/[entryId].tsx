/**
 * Journal Entry Detail Screen
 * iPad and iOS adaptive layout
 */

import React from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/theme/colors';
import { useJournalStore } from '@/stores/journalStore';
import type { JournalEntryType } from '@/types/learning.types';

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  ChevronLeftIcon,
  TrashIcon,
  BookIcon,
  CardsIcon,
  SparkleIcon,
  EditIcon,
} from '@/components/ui';
import { IconButton } from '@/components/ui/Buttons';

const ENTRY_TYPES: Record<JournalEntryType, { title: string; Icon: React.FC<any>; color: string }> = {
  learning: { title: 'Learning', Icon: BookIcon, color: '#10B981' },
  practice: { title: 'Practice', Icon: CardsIcon, color: colors.accent.purple },
  reflection: { title: 'Reflection', Icon: EditIcon, color: colors.accent.cyan },
  'daily-card': { title: 'Daily Card', Icon: SparkleIcon, color: colors.accent.gold },
};

function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function JournalEntryScreen() {
  const router = useRouter();
  const { entryId } = useLocalSearchParams<{ entryId: string }>();

  const { getEntryById, deleteEntry } = useJournalStore();
  const entry = getEntryById(entryId);

  if (!entry) {
    return (
      <ScreenContainer>
        <SafeScrollView maxWidth="md">
          <View style={styles.errorContainer}>
            <EditIcon size={64} color={colors.text.quaternary} />
            <Spacer size={responsive.spacing(16, 24)} />
            <Text style={styles.errorText}>Entry not found</Text>
            <Pressable onPress={() => router.back()} style={styles.backLink}>
              <Text style={styles.backLinkText}>← Go Back</Text>
            </Pressable>
          </View>
        </SafeScrollView>
      </ScreenContainer>
    );
  }

  const typeInfo = ENTRY_TYPES[entry.type];
  const TypeIcon = typeInfo.Icon;

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteEntry(entry.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <SafeScrollView maxWidth="md">
        {/* Header */}
        <Row justify="space-between" align="center" style={styles.header}>
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />
          <View style={{ flex: 1 }} />
          <IconButton
            icon={<TrashIcon size={20} color={colors.error} />}
            onPress={handleDelete}
            variant="filled"
            size="md"
          />
        </Row>

        {/* Entry Meta */}
        <View style={styles.metaContainer}>
          <View style={[styles.typeTag, { backgroundColor: typeInfo.color + '20' }]}>
            <TypeIcon size={16} color={typeInfo.color} />
            <Text style={[styles.typeText, { color: typeInfo.color }]}>
              {typeInfo.title}
            </Text>
          </View>
          {entry.mood && (
            <View style={styles.moodTag}>
              <Text style={styles.moodEmoji}>{entry.mood}</Text>
            </View>
          )}
        </View>

        <Text style={styles.date}>{formatFullDate(entry.date)}</Text>

        {/* Title */}
        <Text style={styles.title}>{entry.title}</Text>

        {/* Content */}
        <Text style={styles.content}>{entry.content}</Text>

        {/* Tags */}
        {entry.tags.length > 0 && (
          <View style={styles.tagsSection}>
            <Text style={styles.tagsSectionLabel}>Tags</Text>
            <View style={styles.tagsContainer}>
              {entry.tags.map((tag, i) => (
                <View key={i} style={styles.tagPill}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Spacer size={responsive.spacing(32, 48)} />
      </SafeScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: responsive.spacing(16, 20),
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive.spacing(60, 80),
  },
  errorText: {
    fontSize: responsive.fontSize(18, 22),
    color: colors.text.secondary,
    marginBottom: responsive.spacing(16, 20),
  },
  backLink: {
    padding: responsive.spacing(12, 16),
  },
  backLinkText: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.accent.gold,
  },

  // Meta
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing(10, 14),
    marginBottom: responsive.spacing(10, 12),
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive.spacing(6, 8),
    paddingHorizontal: responsive.spacing(12, 16),
    borderRadius: responsive.width(10, 12),
    gap: responsive.spacing(6, 8),
  },
  typeText: {
    fontSize: responsive.fontSize(13, 15),
    fontWeight: '600',
  },
  moodTag: {
    backgroundColor: colors.background.tertiary,
    paddingVertical: responsive.spacing(6, 8),
    paddingHorizontal: responsive.spacing(12, 16),
    borderRadius: responsive.width(10, 12),
  },
  moodEmoji: {
    fontSize: responsive.fontSize(18, 22),
  },

  // Date
  date: {
    fontSize: responsive.fontSize(13, 15),
    color: colors.text.tertiary,
    marginBottom: responsive.spacing(20, 28),
  },

  // Title
  title: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: responsive.spacing(20, 28),
    lineHeight: responsive.fontSize(36, 44),
  },

  // Content
  content: {
    fontSize: responsive.fontSize(17, 20),
    color: colors.text.secondary,
    lineHeight: responsive.fontSize(28, 34),
  },

  // Tags
  tagsSection: {
    marginTop: responsive.spacing(28, 36),
    paddingTop: responsive.spacing(20, 28),
    borderTopWidth: 1,
    borderTopColor: colors.background.tertiary,
  },
  tagsSectionLabel: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
    color: colors.text.tertiary,
    marginBottom: responsive.spacing(12, 16),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing(10, 14),
  },
  tagPill: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingVertical: responsive.spacing(8, 10),
    paddingHorizontal: responsive.spacing(16, 20),
    borderRadius: responsive.width(10, 12),
  },
  tagText: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.accent.purple,
  },
});
