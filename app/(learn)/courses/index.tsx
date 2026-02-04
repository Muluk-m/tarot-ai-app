/**
 * Courses Screen - Course List
 * iPad and iOS adaptive layout
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { useLearningStore } from '@/stores/learningStore';
import { getCoursesByStage, type Course } from '@/data/courses';
import type { Stage } from '@/types/learning.types';

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  SectionHeader,
  SeedlingIcon,
  BookIcon,
  StarIcon,
  TrophyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LockIcon,
  CheckIcon,
  ClockIcon,
  LayersIcon,
} from '@/components/ui';
import { IconButton } from '@/components/ui/Buttons';

// Stage configuration
const STAGES: { key: Stage; title: string; Icon: React.FC<any>; color: string }[] = [
  { key: 'beginner', title: 'Beginner', Icon: SeedlingIcon, color: '#10B981' },
  { key: 'intermediate', title: 'Intermediate', Icon: BookIcon, color: colors.accent.purple },
  { key: 'advanced', title: 'Advanced', Icon: StarIcon, color: colors.accent.cyan },
  { key: 'master', title: 'Master', Icon: TrophyIcon, color: colors.accent.gold },
];

export default function CoursesScreen() {
  const router = useRouter();
  const [selectedStage, setSelectedStage] = useState<Stage>('beginner');

  const { completedCourses, completedLessons, isCourseCompleted } = useLearningStore();

  const getProgress = (course: Course): number => {
    if (course.lessons.length === 0) return 0;
    const completed = course.lessons.filter((l) => completedLessons.includes(l.id)).length;
    return Math.round((completed / course.lessons.length) * 100);
  };

  const isUnlocked = (course: Course): boolean => {
    if (!course.unlockRequirement) return true;
    return completedCourses.includes(course.unlockRequirement);
  };

  const filteredCourses = getCoursesByStage(selectedStage);
  const stageInfo = STAGES.find((s) => s.key === selectedStage)!;

  return (
    <ScreenContainer>
      <SafeScrollView maxWidth="lg">
        {/* Header */}
        <Row justify="space-between" align="center" style={styles.header}>
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />
          <Text style={styles.headerTitle}>Courses</Text>
          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        {/* Stage Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}>
          {STAGES.map((stage) => {
            const isSelected = selectedStage === stage.key;
            const stageCourses = getCoursesByStage(stage.key);
            const completedCount = stageCourses.filter((c) => isCourseCompleted(c.id)).length;
            const StageIcon = stage.Icon;

            return (
              <Pressable
                key={stage.key}
                onPress={() => setSelectedStage(stage.key)}
                style={[styles.tab, isSelected && { borderColor: stage.color }]}>
                <View style={[styles.tabIconContainer, { backgroundColor: stage.color + '20' }]}>
                  <StageIcon size={responsive.width(22, 26)} color={stage.color} />
                </View>
                <Text style={[styles.tabTitle, isSelected && { color: colors.text.primary }]}>
                  {stage.title}
                </Text>
                <Text style={[styles.tabProgress, { color: stage.color }]}>
                  {completedCount}/{stageCourses.length}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Spacer size={responsive.spacing(16, 24)} />

        {/* Stage Header */}
        <SectionHeader
          title={`${stageInfo.title} Stage`}
          subtitle={`${filteredCourses.length} courses`}
        />

        {/* Course List */}
        <View style={styles.courseList}>
          {filteredCourses.map((course, index) => {
            const unlocked = isUnlocked(course);
            const progress = getProgress(course);
            const completed = isCourseCompleted(course.id);

            return (
              <Pressable
                key={course.id}
                onPress={() => {
                  if (unlocked) {
                    router.push({
                      pathname: '/(learn)/courses/[courseId]',
                      params: { courseId: course.id },
                    });
                  }
                }}
                style={({ pressed }) => [
                  styles.courseCard,
                  !unlocked && styles.lockedCard,
                  pressed && unlocked && styles.cardPressed,
                ]}>
                <View style={styles.courseContent}>
                  {/* Course Number */}
                  <View
                    style={[
                      styles.courseNumber,
                      completed && { backgroundColor: stageInfo.color },
                    ]}>
                    {completed ? (
                      <CheckIcon size={18} color={colors.text.primary} />
                    ) : (
                      <Text
                        style={[
                          styles.courseNumberText,
                          completed && { color: colors.text.primary },
                        ]}>
                        {course.order}
                      </Text>
                    )}
                  </View>

                  {/* Course Info */}
                  <View style={styles.courseInfo}>
                    <Row align="center" gap={8}>
                      <Text
                        style={[styles.courseTitle, !unlocked && styles.lockedText]}
                        numberOfLines={1}>
                        {course.title}
                      </Text>
                      {!unlocked && <LockIcon size={14} color={colors.text.quaternary} />}
                    </Row>

                    <Text
                      style={[styles.courseDescription, !unlocked && styles.lockedText]}
                      numberOfLines={2}>
                      {course.description}
                    </Text>

                    <Row gap={responsive.spacing(12, 16)} style={styles.courseMeta}>
                      <Row align="center" gap={4}>
                        <LayersIcon size={14} color={colors.text.quaternary} />
                        <Text style={styles.courseMetaText}>{course.lessons.length} lessons</Text>
                      </Row>
                      <Row align="center" gap={4}>
                        <ClockIcon size={14} color={colors.text.quaternary} />
                        <Text style={styles.courseMetaText}>~{course.estimatedTime} min</Text>
                      </Row>
                    </Row>

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
                        <Text style={[styles.progressText, { color: stageInfo.color }]}>
                          {progress}%
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Arrow */}
                  {unlocked && (
                    <View style={styles.arrowContainer}>
                      <ChevronRightIcon size={20} color={colors.text.tertiary} />
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Spacer size={responsive.spacing(32, 48)} />
      </SafeScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: responsive.spacing(20, 24),
  },
  headerTitle: {
    fontSize: responsive.fontSize(22, 26),
    fontWeight: '700',
    color: colors.text.primary,
  },

  // Tabs
  tabsContainer: {
    paddingBottom: responsive.spacing(4, 8),
    gap: responsive.spacing(10, 14),
  },
  tab: {
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(16, 20),
    padding: responsive.spacing(12, 16),
    minWidth: responsive.width(90, 110),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    marginRight: responsive.spacing(10, 14),
  },
  tabIconContainer: {
    width: responsive.width(40, 48),
    height: responsive.width(40, 48),
    borderRadius: responsive.width(12, 14),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(8, 10),
  },
  tabTitle: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
    color: colors.text.tertiary,
    marginBottom: responsive.spacing(4, 6),
  },
  tabProgress: {
    fontSize: responsive.fontSize(12, 14),
    fontWeight: '600',
  },

  // Course List
  courseList: {
    gap: responsive.spacing(12, 16),
  },
  courseCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(16, 20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  lockedCard: {
    opacity: 0.6,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  courseContent: {
    flexDirection: 'row',
    padding: responsive.spacing(14, 18),
    alignItems: 'flex-start',
  },
  courseNumber: {
    width: responsive.width(40, 48),
    height: responsive.width(40, 48),
    borderRadius: responsive.width(12, 14),
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing(12, 16),
  },
  courseNumberText: {
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '700',
    color: colors.text.secondary,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
  },
  courseDescription: {
    fontSize: responsive.fontSize(13, 15),
    color: colors.text.tertiary,
    lineHeight: responsive.fontSize(18, 22),
    marginTop: responsive.spacing(4, 6),
    marginBottom: responsive.spacing(8, 10),
  },
  lockedText: {
    color: colors.text.quaternary,
  },
  courseMeta: {
    marginTop: responsive.spacing(4, 6),
  },
  courseMetaText: {
    fontSize: responsive.fontSize(12, 14),
    color: colors.text.quaternary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive.spacing(10, 12),
    gap: responsive.spacing(8, 10),
  },
  progressBar: {
    flex: 1,
    height: responsive.width(6, 8),
    backgroundColor: colors.background.tertiary,
    borderRadius: responsive.width(3, 4),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: responsive.width(3, 4),
  },
  progressText: {
    fontSize: responsive.fontSize(12, 14),
    fontWeight: '600',
    width: responsive.width(36, 44),
    textAlign: 'right',
  },
  arrowContainer: {
    width: responsive.width(32, 40),
    height: responsive.width(32, 40),
    borderRadius: responsive.width(10, 12),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: responsive.spacing(8, 12),
    alignSelf: 'center',
  },
});
