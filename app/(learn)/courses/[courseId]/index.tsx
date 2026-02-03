import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { useLearningStore } from '@/stores/learningStore';
import { useQuizStore } from '@/stores/quizStore';
import { getCourseById } from '@/data/courses';
import { getQuizByCourseId } from '@/data/quiz-questions';

const STAGE_COLORS: Record<string, string> = {
  beginner: '#10B981',
  intermediate: colors.accent.purple,
  advanced: colors.accent.cyan,
  master: colors.accent.gold,
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
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Course not found</Text>
            <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
              <Text style={styles.backLinkText}>← Go Back</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const stageColor = STAGE_COLORS[course.stage] || colors.accent.gold;
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
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          </View>

          {/* Course Info */}
          <View style={styles.courseHeader}>
            <View style={[styles.stageTag, { backgroundColor: stageColor + '30' }]}>
              <Text style={[styles.stageTagText, { color: stageColor }]}>
                {course.stage.toUpperCase()}
              </Text>
            </View>

            <Text style={styles.courseIcon}>{course.icon}</Text>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>

            {/* Course Meta */}
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>{course.lessons.length}</Text>
                <Text style={styles.metaLabel}>Lessons</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>~{course.estimatedTime}</Text>
                <Text style={styles.metaLabel}>Minutes</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>{course.requiredScore}%</Text>
                <Text style={styles.metaLabel}>Pass Score</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={[styles.progressValue, { color: stageColor }]}>
                  {completedCount}/{course.lessons.length} lessons
                </Text>
              </View>
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

          {/* Lessons Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lessons</Text>

            {course.lessons.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📝</Text>
                <Text style={styles.emptyText}>
                  Lessons are being prepared...
                </Text>
                <Text style={styles.emptySubtext}>
                  Check back soon!
                </Text>
              </View>
            ) : (
              course.lessons.map((lesson, index) => {
                const completed = isLessonCompleted(lesson.id);
                const isFirstIncomplete = !completed &&
                  course.lessons.slice(0, index).every((l) => isLessonCompleted(l.id));

                return (
                  <TouchableOpacity
                    key={lesson.id}
                    activeOpacity={0.9}
                    onPress={() => {
                      router.push({
                        pathname: '/(learn)/courses/[courseId]/[lessonId]',
                        params: { courseId: course.id, lessonId: lesson.id },
                      });
                    }}
                    style={styles.lessonCard}
                  >
                    <LinearGradient
                      colors={
                        completed
                          ? [stageColor + '20', stageColor + '10']
                          : isFirstIncomplete
                          ? [colors.accent.gold + '15', colors.accent.gold + '08']
                          : [colors.background.tertiary, colors.background.secondary]
                      }
                      style={styles.lessonGradient}
                    >
                      <View style={styles.lessonContent}>
                        <View
                          style={[
                            styles.lessonNumber,
                            completed && { backgroundColor: stageColor },
                            isFirstIncomplete && { backgroundColor: colors.accent.gold },
                          ]}
                        >
                          {completed ? (
                            <Text style={styles.checkmark}>✓</Text>
                          ) : (
                            <Text
                              style={[
                                styles.lessonNumberText,
                                isFirstIncomplete && { color: colors.background.primary },
                              ]}
                            >
                              {lesson.order}
                            </Text>
                          )}
                        </View>

                        <View style={styles.lessonInfo}>
                          <Text style={styles.lessonTitle}>{lesson.title}</Text>
                          {isFirstIncomplete && (
                            <Text style={styles.continueLabel}>Continue →</Text>
                          )}
                          {completed && (
                            <Text style={styles.completedLabel}>Completed</Text>
                          )}
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })
            )}
          </View>

          {/* Quiz Section */}
          {quiz && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Course Quiz</Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  router.push({
                    pathname: '/(learn)/quiz/[quizId]',
                    params: { quizId: quiz.id },
                  });
                }}
                style={styles.quizCard}
              >
                <LinearGradient
                  colors={
                    quizPassed
                      ? ['#10B981' + '25', '#10B981' + '10']
                      : [colors.accent.purple + '20', colors.accent.purple + '10']
                  }
                  style={styles.quizGradient}
                >
                  <View style={styles.quizContent}>
                    <View
                      style={[
                        styles.quizIcon,
                        quizPassed && { backgroundColor: '#10B981' },
                      ]}
                    >
                      <Text style={styles.quizIconText}>
                        {quizPassed ? '✓' : '🧠'}
                      </Text>
                    </View>

                    <View style={styles.quizInfo}>
                      <Text style={styles.quizTitle}>{quiz.title}</Text>
                      <Text style={styles.quizMeta}>
                        {quiz.questions.length} questions • Pass: {quiz.passingScore}%
                      </Text>
                      {quizBestScore !== null && (
                        <Text
                          style={[
                            styles.quizScore,
                            { color: quizPassed ? '#10B981' : colors.text.tertiary },
                          ]}
                        >
                          Best score: {quizBestScore}%
                        </Text>
                      )}
                    </View>

                    <View style={styles.quizArrow}>
                      <Text style={styles.arrowIcon}>→</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
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
    paddingVertical: spacing.md,
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

  // Course Header
  courseHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  stageTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  stageTagText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  courseIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  courseTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  courseDescription: {
    fontSize: 15,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  metaLabel: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  metaDivider: {
    width: 1,
    backgroundColor: colors.background.tertiary,
  },

  // Progress
  progressSection: {
    width: '100%',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.tertiary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Section
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.text.tertiary,
  },

  // Lesson Card
  lessonCard: {
    marginBottom: spacing.sm,
    borderRadius: 12,
    overflow: 'hidden',
    ...shadows.sm,
  },
  lessonGradient: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  lessonNumber: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  lessonNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  checkmark: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '700',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text.primary,
  },
  continueLabel: {
    fontSize: 12,
    color: colors.accent.gold,
    fontWeight: '600',
    marginTop: 2,
  },
  completedLabel: {
    fontSize: 12,
    color: '#10B981',
    marginTop: 2,
  },

  // Quiz Card
  quizCard: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.md,
  },
  quizGradient: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  quizContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  quizIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.accent.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  quizIconText: {
    fontSize: 22,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  quizMeta: {
    fontSize: 13,
    color: colors.text.tertiary,
  },
  quizScore: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  quizArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: 'bold',
  },
});
