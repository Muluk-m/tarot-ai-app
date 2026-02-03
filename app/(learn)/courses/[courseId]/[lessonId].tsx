/**
 * Lesson Screen
 * iPad and iOS adaptive layout
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/theme/colors';
import { useLearningStore } from '@/stores/learningStore';
import { getCourseById, type Lesson } from '@/data/courses';
import { TAROT_DECK } from '@/data/tarot-deck';
import { TarotCardSVG } from '@/components/cards/svg';

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  isTablet,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  BookIcon,
} from '@/components/ui';
import { IconButton, Button } from '@/components/ui/Buttons';

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
        <View style={styles.cardWrapper}>
          <TarotCardSVG
            cardId={card.id}
            width={responsive.width(120, 160)}
            height={responsive.width(180, 240)}
            size={isTablet ? 'large' : 'medium'}
            showNumber={true}
          />
        </View>
        <Text style={styles.cardName}>{card.name}</Text>
        <View style={styles.keywordsContainer}>
          {card.uprightKeywords.slice(0, 4).map((keyword, i) => (
            <View key={i} style={styles.keywordPill}>
              <Text style={styles.keywordText}>{keyword}</Text>
            </View>
          ))}
        </View>
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
      <ScreenContainer>
        <SafeScrollView maxWidth="md">
          <View style={styles.errorContainer}>
            <BookIcon size={48} color={colors.text.quaternary} />
            <Text style={styles.errorText}>Lesson not found</Text>
            <Button
              title="Go Back"
              onPress={() => router.back()}
              variant="outline"
            />
          </View>
        </SafeScrollView>
      </ScreenContainer>
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
    <ScreenContainer>
      <SafeScrollView maxWidth="md" style={styles.scrollView}>
        {/* Header */}
        <Row justify="space-between" align="center" style={styles.header}>
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />

          <View style={styles.lessonIndicator}>
            <Text style={styles.lessonCounter}>
              {lesson.order} / {course.lessons.length}
            </Text>
          </View>

          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        {/* Lesson Title */}
        <View style={styles.lessonHeader}>
          <Row align="center" gap={8} style={styles.courseLabel}>
            <BookIcon size={16} color={colors.text.tertiary} />
            <Text style={styles.courseLabelText}>{course.title}</Text>
          </Row>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
        </View>

        {/* Lesson Content */}
        <View style={styles.content}>
          {lesson.content.map((item, index) => (
            <RenderContent key={index} content={item} />
          ))}
        </View>

        {/* Bottom spacing for button */}
        <Spacer size={responsive.spacing(100, 120)} />
      </SafeScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <LinearGradient
          colors={['transparent', colors.background.primary]}
          style={styles.bottomGradient}
        >
          <Row align="center" style={styles.navigationButtons}>
            {previousLesson && (
              <Pressable
                onPress={() => {
                  router.replace({
                    pathname: '/(learn)/courses/[courseId]/[lessonId]',
                    params: { courseId, lessonId: previousLesson.id },
                  });
                }}
                style={styles.navButton}
              >
                <ChevronLeftIcon size={18} color={colors.text.tertiary} />
                <Text style={styles.navButtonText}>Previous</Text>
              </Pressable>
            )}

            <View style={{ flex: 1 }} />

            {!completed ? (
              <Pressable
                onPress={handleComplete}
                style={({ pressed }) => [
                  styles.completeButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <LinearGradient
                  colors={[colors.accent.gold, '#E5C158']}
                  style={styles.completeGradient}
                >
                  <CheckIcon size={18} color={colors.background.primary} />
                  <Text style={styles.completeButtonText}>Mark Complete</Text>
                </LinearGradient>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleNext}
                style={({ pressed }) => [
                  styles.nextButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <LinearGradient
                  colors={['#10B981', '#34D399']}
                  style={styles.completeGradient}
                >
                  <Text style={styles.completeButtonText}>
                    {nextLesson ? 'Next Lesson' : 'Back to Course'}
                  </Text>
                  <ChevronRightIcon size={18} color={colors.background.primary} />
                </LinearGradient>
              </Pressable>
            )}
          </Row>
        </LinearGradient>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    marginBottom: responsive.spacing(16, 20),
  },
  lessonIndicator: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: responsive.spacing(14, 18),
    paddingVertical: responsive.spacing(8, 10),
    borderRadius: responsive.width(12, 14),
  },
  lessonCounter: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
    color: colors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsive.spacing(24, 32),
    gap: responsive.spacing(16, 20),
  },
  errorText: {
    fontSize: responsive.fontSize(18, 22),
    color: colors.text.secondary,
  },

  // Lesson Header
  lessonHeader: {
    marginBottom: responsive.spacing(24, 32),
  },
  courseLabel: {
    marginBottom: responsive.spacing(8, 12),
  },
  courseLabelText: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.tertiary,
  },
  lessonTitle: {
    fontSize: responsive.fontSize(26, 32),
    fontWeight: '700',
    color: colors.text.primary,
    lineHeight: responsive.fontSize(34, 42),
  },

  // Content
  content: {
    marginBottom: responsive.spacing(24, 32),
  },

  // Text rendering
  textContainer: {
    marginBottom: responsive.spacing(12, 16),
  },
  heading1: {
    fontSize: responsive.fontSize(24, 28),
    fontWeight: '700',
    color: colors.accent.gold,
    marginTop: responsive.spacing(20, 28),
    marginBottom: responsive.spacing(12, 16),
  },
  heading2: {
    fontSize: responsive.fontSize(20, 24),
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: responsive.spacing(16, 24),
    marginBottom: responsive.spacing(10, 14),
  },
  heading3: {
    fontSize: responsive.fontSize(17, 20),
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: responsive.spacing(12, 18),
    marginBottom: responsive.spacing(8, 12),
  },
  paragraph: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.secondary,
    lineHeight: responsive.fontSize(26, 30),
    marginBottom: responsive.spacing(10, 14),
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: responsive.spacing(8, 12),
    paddingLeft: responsive.spacing(8, 12),
  },
  bulletDot: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.accent.gold,
    marginRight: responsive.spacing(10, 14),
    width: responsive.width(16, 20),
  },
  bulletText: {
    flex: 1,
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.secondary,
    lineHeight: responsive.fontSize(24, 28),
  },
  numberedItem: {
    flexDirection: 'row',
    marginBottom: responsive.spacing(8, 12),
    paddingLeft: responsive.spacing(8, 12),
  },
  numberText: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
    color: colors.accent.gold,
    marginRight: responsive.spacing(10, 14),
    width: responsive.width(24, 30),
  },
  spacer: {
    height: responsive.spacing(12, 18),
  },

  // Card display
  cardDisplay: {
    alignItems: 'center',
    marginVertical: responsive.spacing(24, 32),
    padding: responsive.spacing(20, 28),
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderRadius: responsive.width(20, 24),
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  cardWrapper: {
    marginBottom: responsive.spacing(16, 20),
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardName: {
    fontSize: responsive.fontSize(22, 26),
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: responsive.spacing(12, 16),
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: responsive.spacing(8, 12),
  },
  keywordPill: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: responsive.spacing(12, 16),
    paddingVertical: responsive.spacing(6, 8),
    borderRadius: responsive.width(12, 14),
  },
  keywordText: {
    fontSize: responsive.fontSize(13, 15),
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
    paddingTop: responsive.spacing(32, 40),
    paddingHorizontal: responsive.spacing(20, 28),
    paddingBottom: responsive.spacing(32, 40),
  },
  navigationButtons: {
    gap: responsive.spacing(12, 16),
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive.spacing(12, 16),
    paddingHorizontal: responsive.spacing(16, 20),
    gap: responsive.spacing(6, 8),
  },
  navButtonText: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.tertiary,
    fontWeight: '500',
  },
  completeButton: {
    borderRadius: responsive.width(14, 18),
    overflow: 'hidden',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButton: {
    borderRadius: responsive.width(14, 18),
    overflow: 'hidden',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  completeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive.spacing(14, 18),
    paddingHorizontal: responsive.spacing(24, 32),
    borderRadius: responsive.width(14, 18),
    gap: responsive.spacing(8, 10),
  },
  completeButtonText: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '700',
    color: colors.background.primary,
  },
});
