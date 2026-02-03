import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { useLearningStore } from '@/stores/learningStore';
import { getCourseById, type Lesson } from '@/data/courses';
import { TAROT_DECK } from '@/data/tarot-deck';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Simple markdown-like text renderer
function RenderContent({ content }: { content: { type: string; data: any } }) {
  if (content.type === 'text') {
    return <MarkdownText text={content.data.markdown} />;
  }

  if (content.type === 'card') {
    const card = TAROT_DECK.find((c) => c.id.toString() === content.data.cardId);
    if (!card) return null;

    return (
      <View style={styles.cardDisplay}>
        <LinearGradient
          colors={[colors.accent.gold + '20', colors.accent.gold + '08']}
          style={styles.cardGradient}
        >
          <Text style={styles.cardSymbol}>{card.symbolEmoji}</Text>
          <Text style={styles.cardName}>{card.name}</Text>
          <View style={styles.keywordsContainer}>
            {card.uprightKeywords.slice(0, 4).map((keyword, i) => (
              <View key={i} style={styles.keywordPill}>
                <Text style={styles.keywordText}>{keyword}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    );
  }

  return null;
}

// Simple markdown renderer for lesson content
function MarkdownText({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Heading 1
    if (trimmed.startsWith('# ')) {
      elements.push(
        <Text key={index} style={styles.heading1}>
          {trimmed.slice(2)}
        </Text>
      );
    }
    // Heading 2
    else if (trimmed.startsWith('## ')) {
      elements.push(
        <Text key={index} style={styles.heading2}>
          {trimmed.slice(3)}
        </Text>
      );
    }
    // Heading 3
    else if (trimmed.startsWith('### ')) {
      elements.push(
        <Text key={index} style={styles.heading3}>
          {trimmed.slice(4)}
        </Text>
      );
    }
    // Bullet list
    else if (trimmed.startsWith('- ')) {
      elements.push(
        <View key={index} style={styles.bulletItem}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{formatInlineText(trimmed.slice(2))}</Text>
        </View>
      );
    }
    // Numbered list
    else if (/^\d+\.\s/.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s/, '');
      const number = trimmed.match(/^(\d+)\./)?.[1] || '1';
      elements.push(
        <View key={index} style={styles.numberedItem}>
          <Text style={styles.numberText}>{number}.</Text>
          <Text style={styles.bulletText}>{formatInlineText(content)}</Text>
        </View>
      );
    }
    // Regular paragraph
    else if (trimmed.length > 0) {
      elements.push(
        <Text key={index} style={styles.paragraph}>
          {formatInlineText(trimmed)}
        </Text>
      );
    }
    // Empty line for spacing
    else if (index > 0 && lines[index - 1].trim().length > 0) {
      elements.push(<View key={index} style={styles.spacer} />);
    }
  });

  return <View style={styles.textContainer}>{elements}</View>;
}

// Format bold and italic text
function formatInlineText(text: string): string {
  // Remove ** for bold (we'll render as-is for now, full implementation would use Text nesting)
  return text.replace(/\*\*/g, '').replace(/\*/g, '');
}

export default function LessonScreen() {
  const router = useRouter();
  const { courseId, lessonId } = useLocalSearchParams<{
    courseId: string;
    lessonId: string;
  }>();

  const { completeLesson, isLessonCompleted } = useLearningStore();
  const [completed, setCompleted] = useState(false);

  const course = getCourseById(courseId);
  const lesson = course?.lessons.find((l) => l.id === lessonId);
  const lessonIndex = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const nextLesson = course?.lessons[lessonIndex + 1];
  const previousLesson = lessonIndex > 0 ? course?.lessons[lessonIndex - 1] : null;

  useEffect(() => {
    if (lessonId) {
      setCompleted(isLessonCompleted(lessonId));
    }
  }, [lessonId, isLessonCompleted]);

  if (!course || !lesson) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Lesson not found</Text>
            <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
              <Text style={styles.backLinkText}>← Go Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const handleComplete = () => {
    completeLesson(lessonId, courseId);
    setCompleted(true);
  };

  const handleNext = () => {
    if (nextLesson) {
      router.replace({
        pathname: '/(learn)/courses/[courseId]/[lessonId]',
        params: { courseId, lessonId: nextLesson.id },
      });
    } else {
      // Last lesson - go back to course
      router.back();
    }
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

          <View style={styles.lessonIndicator}>
            <Text style={styles.lessonCounter}>
              {lesson.order} / {course.lessons.length}
            </Text>
          </View>

          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Lesson Title */}
          <View style={styles.lessonHeader}>
            <Text style={styles.courseLabel}>{course.icon} {course.title}</Text>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
          </View>

          {/* Lesson Content */}
          <View style={styles.content}>
            {lesson.content.map((item, index) => (
              <RenderContent key={index} content={item} />
            ))}
          </View>

          {/* Bottom spacing for button */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Action Bar */}
        <View style={styles.bottomBar}>
          <LinearGradient
            colors={['transparent', colors.background.primary]}
            style={styles.bottomGradient}
          >
            <View style={styles.navigationButtons}>
              {previousLesson && (
                <TouchableOpacity
                  onPress={() => {
                    router.replace({
                      pathname: '/(learn)/courses/[courseId]/[lessonId]',
                      params: { courseId, lessonId: previousLesson.id },
                    });
                  }}
                  style={styles.navButton}
                >
                  <Text style={styles.navButtonText}>← Previous</Text>
                </TouchableOpacity>
              )}

              <View style={{ flex: 1 }} />

              {!completed ? (
                <TouchableOpacity
                  onPress={handleComplete}
                  style={styles.completeButton}
                >
                  <LinearGradient
                    colors={[colors.accent.gold, colors.accent.goldLight]}
                    style={styles.completeGradient}
                  >
                    <Text style={styles.completeButtonText}>
                      Complete Lesson ✓
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleNext}
                  style={styles.nextButton}
                >
                  <LinearGradient
                    colors={['#10B981', '#34D399']}
                    style={styles.completeGradient}
                  >
                    <Text style={styles.completeButtonText}>
                      {nextLesson ? 'Next Lesson →' : 'Back to Course'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </View>
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
  lessonIndicator: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
  },
  lessonCounter: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  placeholder: {
    width: 40,
  },

  // Lesson Header
  lessonHeader: {
    marginBottom: spacing.xl,
  },
  courseLabel: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
  },
  lessonTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    lineHeight: 36,
  },

  // Content
  content: {
    marginBottom: spacing.xl,
  },

  // Text rendering
  textContainer: {
    marginBottom: spacing.md,
  },
  heading1: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.accent.gold,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  heading2: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  heading3: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  paragraph: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 26,
    marginBottom: spacing.sm,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
  },
  bulletDot: {
    fontSize: 16,
    color: colors.accent.gold,
    marginRight: spacing.sm,
    width: 16,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  numberedItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
  },
  numberText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent.gold,
    marginRight: spacing.sm,
    width: 24,
  },
  spacer: {
    height: spacing.md,
  },

  // Card display
  cardDisplay: {
    marginVertical: spacing.lg,
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  cardGradient: {
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.accent.gold + '40',
    borderRadius: 20,
  },
  cardSymbol: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  cardName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: spacing.md,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  keywordPill: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  keywordText: {
    fontSize: 13,
    color: colors.text.secondary,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomGradient: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  navButtonText: {
    fontSize: 16,
    color: colors.text.tertiary,
    fontWeight: '500',
  },
  completeButton: {
    borderRadius: 14,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  nextButton: {
    borderRadius: 14,
    overflow: 'hidden',
    ...shadows.md,
  },
  completeGradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 14,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background.primary,
  },
});
