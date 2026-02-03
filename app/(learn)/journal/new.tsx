/**
 * New Journal Entry Screen
 * iPad and iOS adaptive layout
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { useJournalStore } from '@/stores/journalStore';
import { useLearningStore } from '@/stores/learningStore';
import type { JournalEntryType } from '@/types/learning.types';

// UI Components
import {
  ScreenContainer,
  Row,
  Spacer,
  responsive,
  XIcon,
  BookIcon,
  CardsIcon,
  SparkleIcon,
  EditIcon,
} from '@/components/ui';

const ENTRY_TYPES: { key: JournalEntryType; title: string; Icon: React.FC<any>; description: string }[] = [
  {
    key: 'learning',
    title: 'Learning',
    Icon: BookIcon,
    description: 'Course study notes',
  },
  {
    key: 'practice',
    title: 'Practice',
    Icon: CardsIcon,
    description: 'Flashcard or reading practice',
  },
  {
    key: 'reflection',
    title: 'Reflection',
    Icon: EditIcon,
    description: 'Personal insights and thoughts',
  },
  {
    key: 'daily-card',
    title: 'Daily Card',
    Icon: SparkleIcon,
    description: 'Daily card insights',
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

const MOODS = ['😊', '🤔', '😌', '✨', '💡', '🙏'];

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
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Row justify="space-between" align="center" style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Text style={styles.headerTitle}>New Entry</Text>
            <Pressable
              onPress={handleSave}
              disabled={!isValid}
              style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
            >
              <Text
                style={[styles.saveText, !isValid && styles.saveTextDisabled]}
              >
                Save
              </Text>
            </Pressable>
          </Row>
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
                const TypeIcon = type.Icon;

                return (
                  <Pressable
                    key={type.key}
                    onPress={() => setEntryType(type.key)}
                    style={[
                      styles.typeCard,
                      isSelected && styles.typeCardSelected,
                    ]}
                  >
                    <TypeIcon
                      size={responsive.width(22, 26)}
                      color={isSelected ? colors.accent.gold : colors.text.tertiary}
                    />
                    <Text
                      style={[
                        styles.typeTitle,
                        isSelected && styles.typeTitleSelected,
                      ]}
                    >
                      {type.title}
                    </Text>
                  </Pressable>
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
                <Pressable
                  key={m}
                  onPress={() => setMood(mood === m ? undefined : m)}
                  style={[
                    styles.moodButton,
                    mood === m && styles.moodButtonSelected,
                  ]}
                >
                  <Text style={styles.moodEmoji}>{m}</Text>
                </Pressable>
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
                  <Pressable
                    key={tag}
                    onPress={() => handleRemoveTag(tag)}
                    style={styles.selectedTag}
                  >
                    <Text style={styles.selectedTagText}>#{tag}</Text>
                    <XIcon size={12} color={colors.accent.purple} />
                  </Pressable>
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
                <Pressable
                  onPress={() => handleAddTag(customTag)}
                  style={styles.addTagButton}
                >
                  <Text style={styles.addTagText}>Add</Text>
                </Pressable>
              )}
            </View>

            {/* Suggested Tags */}
            <View style={styles.suggestedTags}>
              {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).map((tag) => (
                <Pressable
                  key={tag}
                  onPress={() => handleAddTag(tag)}
                  style={styles.suggestedTag}
                >
                  <Text style={styles.suggestedTagText}>#{tag}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Spacer size={responsive.spacing(32, 48)} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: responsive.spacing(16, 24),
    borderBottomWidth: 1,
    borderBottomColor: colors.background.tertiary,
  },
  header: {
    paddingVertical: responsive.spacing(14, 18),
  },
  cancelButton: {
    paddingVertical: responsive.spacing(8, 10),
    paddingHorizontal: responsive.spacing(4, 8),
  },
  cancelText: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.tertiary,
  },
  headerTitle: {
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '600',
    color: colors.text.primary,
  },
  saveButton: {
    paddingVertical: responsive.spacing(8, 10),
    paddingHorizontal: responsive.spacing(16, 20),
    backgroundColor: colors.accent.gold,
    borderRadius: responsive.width(10, 12),
  },
  saveButtonDisabled: {
    backgroundColor: colors.background.tertiary,
  },
  saveText: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
    color: colors.background.primary,
  },
  saveTextDisabled: {
    color: colors.text.quaternary,
  },

  // Content
  scrollContent: {
    paddingHorizontal: responsive.spacing(16, 24),
    paddingTop: responsive.spacing(20, 28),
  },

  // Section
  section: {
    marginBottom: responsive.spacing(24, 32),
  },
  sectionLabel: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: responsive.spacing(12, 14),
  },

  // Entry Type
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing(10, 14),
  },
  typeCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    padding: responsive.spacing(16, 20),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: responsive.spacing(8, 10),
  },
  typeCardSelected: {
    borderColor: colors.accent.gold,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  typeTitle: {
    fontSize: responsive.fontSize(14, 16),
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
    borderRadius: responsive.width(14, 18),
    paddingHorizontal: responsive.spacing(16, 20),
    paddingVertical: responsive.spacing(14, 18),
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.background.tertiary,
  },

  // Content Input
  contentInput: {
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    paddingHorizontal: responsive.spacing(16, 20),
    paddingVertical: responsive.spacing(14, 18),
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.background.tertiary,
    minHeight: responsive.width(150, 200),
  },

  // Mood
  moodContainer: {
    flexDirection: 'row',
    gap: responsive.spacing(10, 14),
  },
  moodButton: {
    width: responsive.width(50, 60),
    height: responsive.width(50, 60),
    borderRadius: responsive.width(14, 18),
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    borderColor: colors.accent.gold,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  moodEmoji: {
    fontSize: responsive.fontSize(24, 28),
  },

  // Tags
  selectedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing(8, 12),
    marginBottom: responsive.spacing(12, 16),
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingVertical: responsive.spacing(6, 8),
    paddingHorizontal: responsive.spacing(12, 14),
    borderRadius: responsive.width(10, 12),
    gap: responsive.spacing(6, 8),
  },
  selectedTagText: {
    fontSize: responsive.fontSize(13, 15),
    color: colors.accent.purple,
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    paddingHorizontal: responsive.spacing(16, 20),
    borderWidth: 1,
    borderColor: colors.background.tertiary,
    marginBottom: responsive.spacing(12, 16),
  },
  tagInput: {
    flex: 1,
    height: responsive.width(48, 56),
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.primary,
  },
  addTagButton: {
    paddingVertical: responsive.spacing(8, 10),
    paddingHorizontal: responsive.spacing(4, 8),
  },
  addTagText: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
    color: colors.accent.gold,
  },
  suggestedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing(8, 12),
  },
  suggestedTag: {
    backgroundColor: colors.background.secondary,
    paddingVertical: responsive.spacing(6, 8),
    paddingHorizontal: responsive.spacing(12, 14),
    borderRadius: responsive.width(10, 12),
  },
  suggestedTagText: {
    fontSize: responsive.fontSize(12, 14),
    color: colors.text.tertiary,
  },
});
