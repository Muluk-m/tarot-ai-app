/**
 * Quizzes Screen - Quiz List
 * iPad and iOS adaptive layout
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { useQuizStore } from '@/stores/quizStore';
import { ALL_QUIZZES, type Quiz } from '@/data/quiz-questions';

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  SectionHeader,
  StatCard,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  TrophyIcon,
  ZapIcon,
  BookIcon,
} from '@/components/ui';
import { IconButton } from '@/components/ui/Buttons';

export default function QuizzesScreen() {
  const router = useRouter();
  const { hasPassedQuiz, getBestScore, getTotalQuizzesPassed, getPerfectScores } = useQuizStore();

  const courseQuizzes = ALL_QUIZZES.filter((q) => q.category === 'course');
  const dailyQuizzes = ALL_QUIZZES.filter((q) => q.category === 'daily');
  const challengeQuizzes = ALL_QUIZZES.filter((q) => q.category === 'challenge');

  const renderQuizCard = (quiz: Quiz, color: string, Icon: React.FC<any>) => {
    const passed = hasPassedQuiz(quiz.id);
    const bestScore = getBestScore(quiz.id);

    return (
      <Pressable
        key={quiz.id}
        onPress={() => {
          router.push({
            pathname: '/(learn)/quiz/[quizId]',
            params: { quizId: quiz.id },
          });
        }}
        style={({ pressed }) => [
          styles.quizCard,
          passed && styles.quizCardPassed,
          pressed && styles.quizCardPressed,
        ]}>
        <View style={[styles.quizIcon, { backgroundColor: passed ? '#10B981' : color }]}>
          {passed ? (
            <CheckIcon size={22} color={colors.text.primary} />
          ) : (
            <Icon size={22} color={colors.text.primary} />
          )}
        </View>

        <View style={styles.quizInfo}>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          <Text style={styles.quizMeta}>
            {quiz.questions.length} questions · Pass {quiz.passingScore}%
          </Text>
          {bestScore !== null && (
            <Text style={[styles.quizScore, { color: passed ? '#10B981' : colors.text.tertiary }]}>
              Best: {bestScore}%
            </Text>
          )}
        </View>

        <View style={styles.quizArrow}>
          <ChevronRightIcon size={20} color={colors.text.secondary} />
        </View>
      </Pressable>
    );
  };

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
          <Text style={styles.headerTitle}>Quizzes</Text>
          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        {/* Stats */}
        <StatCard
          items={[
            { value: getTotalQuizzesPassed(), label: 'Passed' },
            { value: getPerfectScores(), label: 'Perfect' },
            { value: ALL_QUIZZES.length, label: 'Total' },
          ]}
          style={styles.statsCard}
        />

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Daily Challenge */}
        {dailyQuizzes.length > 0 && (
          <>
            <SectionHeader title="Daily Challenge" subtitle="A quick quiz every day" />
            <View style={styles.quizList}>
              {dailyQuizzes.map((quiz) => renderQuizCard(quiz, colors.accent.gold, ZapIcon))}
            </View>
            <Spacer size={responsive.spacing(24, 32)} />
          </>
        )}

        {/* Course Quizzes */}
        {courseQuizzes.length > 0 && (
          <>
            <SectionHeader title="Course Quizzes" subtitle="Quizzes paired with courses" />
            <View style={styles.quizList}>
              {courseQuizzes.map((quiz) => renderQuizCard(quiz, colors.accent.purple, BookIcon))}
            </View>
            <Spacer size={responsive.spacing(24, 32)} />
          </>
        )}

        {/* Challenge Quizzes */}
        {challengeQuizzes.length > 0 && (
          <>
            <SectionHeader title="Challenge Quizzes" subtitle="Test your advanced knowledge" />
            <View style={styles.quizList}>
              {challengeQuizzes.map((quiz) => renderQuizCard(quiz, colors.accent.cyan, TrophyIcon))}
            </View>
          </>
        )}

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
  statsCard: {
    marginTop: responsive.spacing(4, 8),
  },

  // Quiz List
  quizList: {
    gap: responsive.spacing(12, 16),
  },
  quizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(16, 20),
    padding: responsive.spacing(14, 18),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  quizCardPassed: {
    borderColor: 'rgba(16, 185, 129, 0.25)',
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
  },
  quizCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  quizIcon: {
    width: responsive.width(48, 56),
    height: responsive.width(48, 56),
    borderRadius: responsive.width(14, 16),
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
