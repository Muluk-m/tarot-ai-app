import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { useLearningStore } from '@/stores/learningStore';
import { ALL_COURSES, getCoursesByStage, type Course } from '@/data/courses';
import type { Stage } from '@/types/learning.types';

const STAGES: { key: Stage; title: string; icon: string; color: string }[] = [
  { key: 'beginner', title: 'Beginner', icon: '🌱', color: '#10B981' },
  { key: 'intermediate', title: 'Intermediate', icon: '📖', color: colors.accent.purple },
  { key: 'advanced', title: 'Advanced', icon: '⭐', color: colors.accent.cyan },
  { key: 'master', title: 'Master', icon: '🏆', color: colors.accent.gold },
];

export default function CoursesScreen() {
  const router = useRouter();
  const [selectedStage, setSelectedStage] = useState<Stage>('beginner');

  const { completedCourses, completedLessons, isCourseCompleted } = useLearningStore();

  const getProgress = (course: Course): number => {
    if (course.lessons.length === 0) return 0;
    const completed = course.lessons.filter((l) =>
      completedLessons.includes(l.id)
    ).length;
    return Math.round((completed / course.lessons.length) * 100);
  };

  const isUnlocked = (course: Course): boolean => {
    if (!course.unlockRequirement) return true;
    return completedCourses.includes(course.unlockRequirement);
  };

  const filteredCourses = getCoursesByStage(selectedStage);
  const stageInfo = STAGES.find((s) => s.key === selectedStage)!;

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
          <Text style={styles.headerTitle}>Courses</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Stage Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {STAGES.map((stage) => {
            const isSelected = selectedStage === stage.key;
            const stageCourses = getCoursesByStage(stage.key);
            const completedCount = stageCourses.filter((c) =>
              isCourseCompleted(c.id)
            ).length;

            return (
              <TouchableOpacity
                key={stage.key}
                onPress={() => setSelectedStage(stage.key)}
                style={[
                  styles.tab,
                  isSelected && { borderColor: stage.color },
                ]}
              >
                <Text style={styles.tabIcon}>{stage.icon}</Text>
                <Text
                  style={[
                    styles.tabTitle,
                    isSelected && { color: colors.text.primary },
                  ]}
                >
                  {stage.title}
                </Text>
                <Text style={styles.tabProgress}>
                  {completedCount}/{stageCourses.length}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Course List */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.stageHeader}>
            <Text style={[styles.stageTitle, { color: stageInfo.color }]}>
              {stageInfo.icon} {stageInfo.title} Stage
            </Text>
            <Text style={styles.stageSubtitle}>
              {filteredCourses.length} courses
            </Text>
          </View>

          {filteredCourses.map((course, index) => {
            const unlocked = isUnlocked(course);
            const progress = getProgress(course);
            const completed = isCourseCompleted(course.id);

            return (
              <TouchableOpacity
                key={course.id}
                activeOpacity={unlocked ? 0.9 : 1}
                onPress={() => {
                  if (unlocked) {
                    router.push({
                      pathname: '/(learn)/courses/[courseId]',
                      params: { courseId: course.id },
                    });
                  }
                }}
                style={[styles.courseCard, !unlocked && styles.lockedCard]}
              >
                <LinearGradient
                  colors={
                    completed
                      ? [stageInfo.color + '30', stageInfo.color + '15']
                      : unlocked
                      ? [colors.background.tertiary, colors.background.secondary]
                      : [colors.background.secondary + '50', colors.background.primary + '50']
                  }
                  style={styles.courseGradient}
                >
                  <View style={styles.courseContent}>
                    <View style={styles.courseNumber}>
                      <Text
                        style={[
                          styles.courseNumberText,
                          completed && { color: stageInfo.color },
                        ]}
                      >
                        {course.order}
                      </Text>
                    </View>

                    <View style={styles.courseInfo}>
                      <View style={styles.courseHeader}>
                        <Text
                          style={[
                            styles.courseTitle,
                            !unlocked && styles.lockedText,
                          ]}
                        >
                          {course.icon} {course.title}
                        </Text>
                        {completed && (
                          <Text style={styles.completedBadge}>✓</Text>
                        )}
                        {!unlocked && (
                          <Text style={styles.lockIcon}>🔒</Text>
                        )}
                      </View>

                      <Text
                        style={[
                          styles.courseDescription,
                          !unlocked && styles.lockedText,
                        ]}
                        numberOfLines={2}
                      >
                        {course.description}
                      </Text>

                      <View style={styles.courseMeta}>
                        <Text style={styles.courseMetaText}>
                          📚 {course.lessons.length} lessons
                        </Text>
                        <Text style={styles.courseMetaText}>
                          ⏱️ ~{course.estimatedTime} min
                        </Text>
                      </View>

                      {unlocked && progress > 0 && !completed && (
                        <View style={styles.progressContainer}>
                          <View style={styles.progressBar}>
                            <View
                              style={[
                                styles.progressFill,
                                { width: `${progress}%`, backgroundColor: stageInfo.color },
                              ]}
                            />
                          </View>
                          <Text style={styles.progressText}>{progress}%</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}

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
  placeholder: {
    width: 40,
  },

  // Tabs
  tabsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: spacing.md,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    marginRight: spacing.sm,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  tabProgress: {
    fontSize: 12,
    color: colors.text.tertiary,
  },

  // Content
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  stageHeader: {
    marginBottom: spacing.lg,
  },
  stageTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  stageSubtitle: {
    fontSize: 14,
    color: colors.text.tertiary,
  },

  // Course Card
  courseCard: {
    marginBottom: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.md,
  },
  lockedCard: {
    opacity: 0.6,
  },
  courseGradient: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  courseContent: {
    flexDirection: 'row',
    padding: spacing.md,
  },
  courseNumber: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  courseNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.secondary,
  },
  courseInfo: {
    flex: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
  },
  completedBadge: {
    fontSize: 16,
    color: '#10B981',
    marginLeft: spacing.sm,
  },
  lockIcon: {
    fontSize: 14,
    marginLeft: spacing.sm,
  },
  courseDescription: {
    fontSize: 13,
    color: colors.text.tertiary,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  lockedText: {
    color: colors.text.quaternary,
  },
  courseMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  courseMetaText: {
    fontSize: 12,
    color: colors.text.quaternary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.background.tertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.text.tertiary,
    width: 36,
    textAlign: 'right',
  },
});
