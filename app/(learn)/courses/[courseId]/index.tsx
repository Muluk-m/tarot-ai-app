/**
 * Course Detail Screen
 * iPad and iOS adaptive layout
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/theme/colors';
import { useLearningStore } from '@/stores/learningStore';
import { useQuizStore } from '@/stores/quizStore';
import { getCourseById } from '@/data/courses';
import { getQuizByCourseId } from '@/data/quiz-questions';

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  isTablet,
  SectionHeader,
  Badge,
  StatCard,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  ClockIcon,
  LayersIcon,
  TargetIcon,
  TrophyIcon,
  BookIcon,
  PlayIcon,
} from '@/components/ui';
import { IconButton, Button } from '@/components/ui/Buttons';

const STAGE_COLORS: Record<string, string> = {
  beginner: '#10B981',
  intermediate: colors.accent.purple,
  advanced: colors.accent.cyan,
  master: colors.accent.gold,
};

const STAGE_NAMES: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  master: 'Master',
};

export default function CourseDetailScreen() {
  const router = useRouter();
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  const { completedLessons, isLessonCompleted, isCourseCompleted } = useLearningStore();
  const { hasPassedQuiz, getBestScore } = useQuizStore();

  const course = getCourseById(courseId);
  const quiz = getQuizByCourseId(courseId);

  if (!course) {
    return (
      <ScreenContainer>
        <SafeScrollView maxWidth="md">
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Course not found</Text>
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

  const stageColor = STAGE_COLORS[course.stage] || colors.accent.gold;
  const stageName = STAGE_NAMES[course.stage] || course.stage;
  const completedCount = course.lessons.filter((l) =>
    isLessonCompleted(l.id)
  ).length;
  const progress = course.lessons.length > 0
    ? Math.round((completedCount / course.lessons.length) * 100)
    : 0;
  const courseCompleted = isCourseCompleted(course.id);
  const quizPassed = quiz ? hasPassedQuiz(quiz.id) : false;
  const quizBestScore = quiz ? getBestScore(quiz.id) : null;

  return (
    <ScreenContainer>
      <SafeScrollView maxWidth="md">
        {/* Header */}
        <Row justify="flex-start" align="center" style={styles.header}>
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />
        </Row>

        {/* Course Info */}
        <View style={styles.courseHeader}>
          {/* Stage Tag */}
          <View style={[styles.stageTag, { backgroundColor: stageColor + '20' }]}>
            <Text style={[styles.stageTagText, { color: stageColor }]}>
              {stageName}
            </Text>
          </View>

          {/* Course Icon */}
          <View style={[styles.courseIconContainer, { borderColor: stageColor }]}>
            <BookIcon size={responsive.width(36, 44)} color={stageColor} />
          </View>

          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseDescription}>{course.description}</Text>

          {/* Course Stats */}
          <StatCard
            items={[
              { value: course.lessons.length, label: 'Lessons' },
              { value: `~${course.estimatedTime}`, label: 'Minutes' },
              { value: `${course.requiredScore}%`, label: 'Pass Score' },
            ]}
            style={styles.statsCard}
          />

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <Row justify="space-between" style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={[styles.progressValue, { color: stageColor }]}>
                {completedCount}/{course.lessons.length} lessons
              </Text>
            </Row>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%`, backgroundColor: stageColor },
                ]}
              />
            </View>
          </View>
        </View>

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Lessons Section */}
        <SectionHeader title="Course Content" subtitle={`${course.lessons.length} lessons`} />

        {course.lessons.length === 0 ? (
          <View style={styles.emptyState}>
            <BookIcon size={48} color={colors.text.quaternary} />
            <Text style={styles.emptyText}>Content coming soon...</Text>
            <Text style={styles.emptySubtext}>Stay tuned</Text>
          </View>
        ) : (
          <View style={styles.lessonList}>
            {course.lessons.map((lesson, index) => {
              const completed = isLessonCompleted(lesson.id);
              const isFirstIncomplete = !completed &&
                course.lessons.slice(0, index).every((l) => isLessonCompleted(l.id));

              return (
                <Pressable
                  key={lesson.id}
                  onPress={() => {
                    router.push({
                      pathname: '/(learn)/courses/[courseId]/[lessonId]',
                      params: { courseId: course.id, lessonId: lesson.id },
                    });
                  }}
                  style={({ pressed }) => [
                    styles.lessonCard,
                    completed && styles.lessonCompleted,
                    isFirstIncomplete && styles.lessonCurrent,
                    pressed && styles.lessonPressed,
                  ]}
                >
                  <View
                    style={[
                      styles.lessonNumber,
                      completed && { backgroundColor: stageColor },
                      isFirstIncomplete && { backgroundColor: colors.accent.gold },
                    ]}
                  >
                    {completed ? (
                      <CheckIcon size={16} color={colors.text.primary} />
                    ) : (
                      <Text
                        style={[
                          styles.lessonNumberText,
                          (completed || isFirstIncomplete) && { color: colors.background.primary },
                        ]}
                      >
                        {lesson.order}
                      </Text>
                    )}
                  </View>

                  <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    {isFirstIncomplete && (
                      <Text style={styles.continueLabel}>Continue</Text>
                    )}
                    {completed && (
                      <Text style={styles.completedLabel}>Completed</Text>
                    )}
                  </View>

                  <View style={styles.lessonArrow}>
                    {isFirstIncomplete ? (
                      <PlayIcon size={16} color={colors.accent.gold} />
                    ) : (
                      <ChevronRightIcon size={18} color={colors.text.tertiary} />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}

        {/* Quiz Section */}
        {quiz && (
          <>
            <Spacer size={responsive.spacing(24, 32)} />

            <SectionHeader title="Course Quiz" />

            <Pressable
              onPress={() => {
                router.push({
                  pathname: '/(learn)/quiz/[quizId]',
                  params: { quizId: quiz.id },
                });
              }}
              style={({ pressed }) => [
                styles.quizCard,
                quizPassed && styles.quizPassed,
                pressed && styles.quizPressed,
              ]}
            >
              <View
                style={[
                  styles.quizIcon,
                  quizPassed && { backgroundColor: '#10B981' },
                ]}
              >
                {quizPassed ? (
                  <CheckIcon size={22} color={colors.text.primary} />
                ) : (
                  <TrophyIcon size={22} color={colors.accent.purple} />
                )}
              </View>

              <View style={styles.quizInfo}>
                <Text style={styles.quizTitle}>{quiz.title}</Text>
                <Text style={styles.quizMeta}>
                  {quiz.questions.length} questions · Pass {quiz.passingScore}%
                </Text>
                {quizBestScore !== null && (
                  <Text
                    style={[
                      styles.quizScore,
                      { color: quizPassed ? '#10B981' : colors.text.tertiary },
                    ]}
                  >
                    Best: {quizBestScore}%
                  </Text>
                )}
              </View>

              <View style={styles.quizArrow}>
                <ChevronRightIcon size={20} color={colors.text.secondary} />
              </View>
            </Pressable>
          </>
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
    padding: responsive.spacing(24, 32),
    gap: responsive.spacing(16, 20),
  },
  errorText: {
    fontSize: responsive.fontSize(18, 22),
    color: colors.text.secondary,
  },

  // Course Header
  courseHeader: {
    alignItems: 'center',
  },
  stageTag: {
    paddingHorizontal: responsive.spacing(12, 16),
    paddingVertical: responsive.spacing(6, 8),
    borderRadius: responsive.width(12, 14),
    marginBottom: responsive.spacing(16, 20),
  },
  stageTagText: {
    fontSize: responsive.fontSize(12, 14),
    fontWeight: '700',
    letterSpacing: 1,
  },
  courseIconContainer: {
    width: responsive.width(80, 100),
    height: responsive.width(80, 100),
    borderRadius: responsive.width(24, 30),
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(16, 20),
  },
  courseTitle: {
    fontSize: responsive.fontSize(26, 32),
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: responsive.spacing(8, 12),
  },
  courseDescription: {
    fontSize: responsive.fontSize(15, 17),
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: responsive.fontSize(22, 26),
    marginBottom: responsive.spacing(20, 24),
    paddingHorizontal: responsive.spacing(16, 24),
  },
  statsCard: {
    width: '100%',
    marginBottom: responsive.spacing(20, 24),
  },

  // Progress
  progressSection: {
    width: '100%',
  },
  progressHeader: {
    marginBottom: responsive.spacing(8, 10),
  },
  progressLabel: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.tertiary,
  },
  progressValue: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
  },
  progressBar: {
    height: responsive.width(8, 10),
    backgroundColor: colors.background.tertiary,
    borderRadius: responsive.width(4, 5),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: responsive.width(4, 5),
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    padding: responsive.spacing(32, 40),
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(16, 20),
    gap: responsive.spacing(8, 12),
  },
  emptyText: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
    color: colors.text.secondary,
  },
  emptySubtext: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.tertiary,
  },

  // Lesson List
  lessonList: {
    gap: responsive.spacing(10, 14),
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    padding: responsive.spacing(14, 18),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  lessonCompleted: {
    borderColor: 'rgba(16, 185, 129, 0.2)',
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
  },
  lessonCurrent: {
    borderColor: 'rgba(212, 175, 55, 0.3)',
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
  },
  lessonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  lessonNumber: {
    width: responsive.width(36, 44),
    height: responsive.width(36, 44),
    borderRadius: responsive.width(10, 12),
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing(12, 16),
  },
  lessonNumberText: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
    color: colors.text.secondary,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: responsive.fontSize(15, 17),
    fontWeight: '500',
    color: colors.text.primary,
  },
  continueLabel: {
    fontSize: responsive.fontSize(12, 14),
    color: colors.accent.gold,
    fontWeight: '600',
    marginTop: 2,
  },
  completedLabel: {
    fontSize: responsive.fontSize(12, 14),
    color: '#10B981',
    marginTop: 2,
  },
  lessonArrow: {
    width: responsive.width(32, 40),
    height: responsive.width(32, 40),
    borderRadius: responsive.width(10, 12),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Quiz Card
  quizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: responsive.width(16, 20),
    padding: responsive.spacing(16, 20),
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  quizPassed: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  quizPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  quizIcon: {
    width: responsive.width(48, 56),
    height: responsive.width(48, 56),
    borderRadius: responsive.width(14, 16),
    backgroundColor: colors.accent.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing(14, 18),
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: responsive.fontSize(17, 19),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  quizMeta: {
    fontSize: responsive.fontSize(13, 15),
    color: colors.text.tertiary,
  },
  quizScore: {
    fontSize: responsive.fontSize(13, 15),
    fontWeight: '600',
    marginTop: 2,
  },
  quizArrow: {
    width: responsive.width(36, 44),
    height: responsive.width(36, 44),
    borderRadius: responsive.width(11, 13),
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
