import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { useQuizStore } from '@/stores/quizStore';
import { ALL_QUIZZES, type Quiz } from '@/data/quiz-questions';

export default function QuizzesScreen() {
  const router = useRouter();
  const { hasPassedQuiz, getBestScore, getTotalQuizzesPassed, getPerfectScores } = useQuizStore();

  const courseQuizzes = ALL_QUIZZES.filter((q) => q.category === 'course');
  const dailyQuizzes = ALL_QUIZZES.filter((q) => q.category === 'daily');
  const challengeQuizzes = ALL_QUIZZES.filter((q) => q.category === 'challenge');

  const renderQuizCard = (quiz: Quiz, color: string) => {
    const passed = hasPassedQuiz(quiz.id);
    const bestScore = getBestScore(quiz.id);

    return (
      <TouchableOpacity
        key={quiz.id}
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
            passed
              ? ['#10B981' + '25', '#10B981' + '10']
              : [color + '20', color + '10']
          }
          style={styles.quizGradient}
        >
          <View style={styles.quizContent}>
            <View
              style={[
                styles.quizIcon,
                { backgroundColor: passed ? '#10B981' : color },
              ]}
            >
              <Text style={styles.quizIconText}>
                {passed ? '✓' : '🧠'}
              </Text>
            </View>

            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <Text style={styles.quizMeta}>
                {quiz.questions.length} questions • Pass: {quiz.passingScore}%
              </Text>
              {bestScore !== null && (
                <Text
                  style={[
                    styles.quizScore,
                    { color: passed ? '#10B981' : colors.text.tertiary },
                  ]}
                >
                  Best: {bestScore}%
                </Text>
              )}
            </View>

            <View style={styles.quizArrow}>
              <Text style={styles.arrowIcon}>→</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

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
            <Text style={styles.headerTitle}>Quizzes</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{getTotalQuizzesPassed()}</Text>
              <Text style={styles.statLabel}>Passed</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{getPerfectScores()}</Text>
              <Text style={styles.statLabel}>Perfect</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{ALL_QUIZZES.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>

          {/* Daily Challenge */}
          {dailyQuizzes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Daily Challenge</Text>
              {dailyQuizzes.map((quiz) => renderQuizCard(quiz, colors.accent.gold))}
            </View>
          )}

          {/* Course Quizzes */}
          {courseQuizzes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Course Quizzes</Text>
              {courseQuizzes.map((quiz) => renderQuizCard(quiz, colors.accent.purple))}
            </View>
          )}

          {/* Challenge Quizzes */}
          {challengeQuizzes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Challenge Quizzes</Text>
              {challengeQuizzes.map((quiz) => renderQuizCard(quiz, colors.accent.cyan))}
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
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

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.background.tertiary,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.accent.gold,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
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

  // Quiz Card
  quizCard: {
    marginBottom: spacing.md,
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
    padding: spacing.md,
  },
  quizIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
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
