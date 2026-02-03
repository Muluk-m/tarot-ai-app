import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { useJournalStore } from '@/stores/journalStore';
import type { JournalEntryType } from '@/types/learning.types';

const ENTRY_TYPES: Record<JournalEntryType, { title: string; icon: string }> = {
  learning: { title: 'Learning', icon: '📚' },
  practice: { title: 'Practice', icon: '🎴' },
  reflection: { title: 'Reflection', icon: '💭' },
  'daily-card': { title: 'Daily Card', icon: '✨' },
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
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Entry not found</Text>
            <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
              <Text style={styles.backLinkText}>← Go Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const typeInfo = ENTRY_TYPES[entry.type];

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry? This action cannot be undone.',
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
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Entry Meta */}
          <View style={styles.metaContainer}>
            <View style={styles.typeTag}>
              <Text style={styles.typeIcon}>{typeInfo.icon}</Text>
              <Text style={styles.typeText}>{typeInfo.title}</Text>
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
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  backLink: {
    padding: spacing.md,
  },
  backLinkText: {
    fontSize: 16,
    color: colors.accent.gold,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 18,
  },

  // Meta
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.gold + '25',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    gap: spacing.xs,
  },
  typeIcon: {
    fontSize: 14,
  },
  typeText: {
    fontSize: 13,
    color: colors.accent.gold,
    fontWeight: '600',
  },
  moodTag: {
    backgroundColor: colors.background.tertiary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
  },
  moodEmoji: {
    fontSize: 16,
  },

  // Date
  date: {
    fontSize: 13,
    color: colors.text.tertiary,
    marginBottom: spacing.lg,
  },

  // Title
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.lg,
    lineHeight: 36,
  },

  // Content
  content: {
    fontSize: 17,
    color: colors.text.secondary,
    lineHeight: 28,
  },

  // Tags
  tagsSection: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.background.tertiary,
  },
  tagsSectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tagPill: {
    backgroundColor: colors.accent.purple + '25',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 14,
    color: colors.accent.purple,
  },
});
