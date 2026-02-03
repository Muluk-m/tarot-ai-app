import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { useJournalStore } from '@/stores/journalStore';
import { useLearningStore } from '@/stores/learningStore';
import type { JournalEntryType } from '@/types/learning.types';

const ENTRY_TYPES: { key: JournalEntryType; title: string; icon: string; description: string }[] = [
  {
    key: 'learning',
    title: 'Learning',
    icon: '📚',
    description: 'Notes from courses or lessons',
  },
  {
    key: 'practice',
    title: 'Practice',
    icon: '🎴',
    description: 'Flashcard or reading practice',
  },
  {
    key: 'reflection',
    title: 'Reflection',
    icon: '💭',
    description: 'Personal insights and thoughts',
  },
  {
    key: 'daily-card',
    title: 'Daily Card',
    icon: '✨',
    description: 'Daily card pull reflection',
  },
];

const SUGGESTED_TAGS = [
  'insight',
  'breakthrough',
  'question',
  'practice',
  'major-arcana',
  'minor-arcana',
  'symbolism',
  'intuition',
];

export default function NewJournalEntryScreen() {
  const router = useRouter();
  const { addEntry } = useJournalStore();
  const { addStudyTime } = useLearningStore();

  const [entryType, setEntryType] = useState<JournalEntryType>('reflection');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [mood, setMood] = useState<string | undefined>();

  const MOODS = ['😊', '🤔', '😌', '✨', '💡', '🙏'];

  const handleAddTag = (tag: string) => {
    const normalizedTag = tag.toLowerCase().trim();
    if (normalizedTag && !tags.includes(normalizedTag)) {
      setTags([...tags, normalizedTag]);
    }
    setCustomTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    addEntry({
      type: entryType,
      title: title.trim(),
      content: content.trim(),
      tags,
      mood,
    });

    // Add study time for journaling
    addStudyTime(5);

    router.back();
  };

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Entry</Text>
            <TouchableOpacity
              onPress={handleSave}
              disabled={!isValid}
              style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
            >
              <Text
                style={[
                  styles.saveText,
                  !isValid && styles.saveTextDisabled,
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Entry Type */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Entry Type</Text>
              <View style={styles.typeGrid}>
                {ENTRY_TYPES.map((type) => {
                  const isSelected = entryType === type.key;
                  return (
                    <TouchableOpacity
                      key={type.key}
                      onPress={() => setEntryType(type.key)}
                      style={[
                        styles.typeCard,
                        isSelected && styles.typeCardSelected,
                      ]}
                    >
                      <Text style={styles.typeIcon}>{type.icon}</Text>
                      <Text
                        style={[
                          styles.typeTitle,
                          isSelected && styles.typeTitleSelected,
                        ]}
                      >
                        {type.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Title */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Title</Text>
              <TextInput
                style={styles.titleInput}
                placeholder="Give your entry a title..."
                placeholderTextColor={colors.text.quaternary}
                value={title}
                onChangeText={setTitle}
                maxLength={100}
              />
            </View>

            {/* Content */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Content</Text>
              <TextInput
                style={styles.contentInput}
                placeholder="Write your thoughts, insights, or reflections..."
                placeholderTextColor={colors.text.quaternary}
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Mood */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Mood (optional)</Text>
              <View style={styles.moodContainer}>
                {MOODS.map((m) => (
                  <TouchableOpacity
                    key={m}
                    onPress={() => setMood(mood === m ? undefined : m)}
                    style={[
                      styles.moodButton,
                      mood === m && styles.moodButtonSelected,
                    ]}
                  >
                    <Text style={styles.moodEmoji}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Tags */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Tags</Text>

              {/* Selected Tags */}
              {tags.length > 0 && (
                <View style={styles.selectedTags}>
                  {tags.map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      onPress={() => handleRemoveTag(tag)}
                      style={styles.selectedTag}
                    >
                      <Text style={styles.selectedTagText}>#{tag}</Text>
                      <Text style={styles.removeTag}>✕</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Custom Tag Input */}
              <View style={styles.tagInputContainer}>
                <TextInput
                  style={styles.tagInput}
                  placeholder="Add a tag..."
                  placeholderTextColor={colors.text.quaternary}
                  value={customTag}
                  onChangeText={setCustomTag}
                  onSubmitEditing={() => handleAddTag(customTag)}
                  returnKeyType="done"
                />
                {customTag.trim().length > 0 && (
                  <TouchableOpacity
                    onPress={() => handleAddTag(customTag)}
                    style={styles.addTagButton}
                  >
                    <Text style={styles.addTagText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Suggested Tags */}
              <View style={styles.suggestedTags}>
                {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    onPress={() => handleAddTag(tag)}
                    style={styles.suggestedTag}
                  >
                    <Text style={styles.suggestedTagText}>#{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bottom spacing */}
            <View style={{ height: spacing.xxl }} />
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.tertiary,
  },
  cancelButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  cancelText: {
    fontSize: 16,
    color: colors.text.tertiary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  saveButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.accent.gold,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    backgroundColor: colors.background.tertiary,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background.primary,
  },
  saveTextDisabled: {
    color: colors.text.quaternary,
  },

  // Content
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },

  // Section
  section: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },

  // Entry Type
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  typeCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    borderColor: colors.accent.gold,
    backgroundColor: colors.accent.gold + '15',
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  typeTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.tertiary,
  },
  typeTitleSelected: {
    color: colors.accent.gold,
    fontWeight: '600',
  },

  // Title Input
  titleInput: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.background.tertiary,
  },

  // Content Input
  contentInput: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.background.tertiary,
    minHeight: 150,
  },

  // Mood
  moodContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  moodButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    borderColor: colors.accent.gold,
    backgroundColor: colors.accent.gold + '15',
  },
  moodEmoji: {
    fontSize: 24,
  },

  // Tags
  selectedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.purple + '30',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    gap: spacing.xs,
  },
  selectedTagText: {
    fontSize: 13,
    color: colors.accent.purple,
  },
  removeTag: {
    fontSize: 10,
    color: colors.accent.purple,
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.background.tertiary,
    marginBottom: spacing.md,
  },
  tagInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: colors.text.primary,
  },
  addTagButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  addTagText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent.gold,
  },
  suggestedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  suggestedTag: {
    backgroundColor: colors.background.secondary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
  },
  suggestedTagText: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
});
