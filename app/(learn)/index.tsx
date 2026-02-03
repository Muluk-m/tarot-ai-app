import React from 'react';
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
import { useAchievementStore } from '@/stores/achievementStore';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { getLevelInfo, getNextLevelInfo, LEVEL_THRESHOLDS } from '@/data/achievements';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LearnHub() {
  const router = useRouter();

  // Get learning progress
  const {
    masteredCards,
    completedCourses,
    completedLessons,
    studyStreak,
    currentLevel,
    experiencePoints,
  } = useLearningStore();

  const { getTotalUnlocked, getUnlockPercentage } = useAchievementStore();
  const { getCardsDueForReview } = useFlashcardStore();

  // Calculate level progress
  const levelInfo = getLevelInfo(masteredCards.length);
  const nextLevel = getNextLevelInfo(currentLevel);
  const cardsForNextLevel = nextLevel ? nextLevel.minCards : LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1].minCards;
  const levelProgress = nextLevel
    ? ((masteredCards.length - levelInfo.minCards) / (cardsForNextLevel - levelInfo.minCards)) * 100
    : 100;

  const cardsDue = getCardsDueForReview().length;

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
            <Text style={styles.headerTitle}>Learn Tarot</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Level Card */}
          <View style={styles.levelCard}>
            <LinearGradient
              colors={[colors.accent.gold + '20', colors.accent.gold + '08']}
              style={styles.levelGradient}
            >
              <View style={styles.levelHeader}>
                <View style={styles.levelIconContainer}>
                  <Text style={styles.levelIcon}>{levelInfo.icon}</Text>
                </View>
                <View style={styles.levelInfo}>
                  <Text style={styles.levelLabel}>Level {levelInfo.level}</Text>
                  <Text style={styles.levelTitle}>{levelInfo.title}</Text>
                </View>
                <View style={styles.xpBadge}>
                  <Text style={styles.xpText}>{experiencePoints} XP</Text>
                </View>
              </View>

              {/* Progress bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${Math.min(levelProgress, 100)}%` }]} />
                </View>
                <Text style={styles.progressText}>
                  {masteredCards.length} / {cardsForNextLevel} cards mastered
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{studyStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{completedLessons.length}</Text>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{completedCourses.length}</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
          </View>

          {/* Action Cards */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Continue Learning</Text>
          </View>

          {/* Courses Card */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(learn)/courses')}
            style={styles.actionCard}
          >
            <LinearGradient
              colors={['#10B981' + '20', '#10B981' + '08']}
              style={styles.actionCardGradient}
            >
              <View style={styles.actionCardContent}>
                <View style={[styles.actionIconContainer, { backgroundColor: '#10B981' }]}>
                  <Text style={styles.actionIcon}>📚</Text>
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Courses</Text>
                  <Text style={styles.actionSubtitle}>
                    {completedCourses.length} of 13 completed
                  </Text>
                </View>
                <View style={styles.actionArrow}>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Flashcards Card */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(learn)/flashcards')}
            style={styles.actionCard}
          >
            <LinearGradient
              colors={[colors.accent.purple + '20', colors.accent.purple + '08']}
              style={styles.actionCardGradient}
            >
              <View style={styles.actionCardContent}>
                <View style={[styles.actionIconContainer, { backgroundColor: colors.accent.purple }]}>
                  <Text style={styles.actionIcon}>🎴</Text>
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Flashcards</Text>
                  <Text style={styles.actionSubtitle}>
                    {cardsDue > 0 ? `${cardsDue} cards due for review` : 'Practice card recognition'}
                  </Text>
                </View>
                {cardsDue > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cardsDue}</Text>
                  </View>
                )}
                <View style={styles.actionArrow}>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Quiz Card */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(learn)/quizzes')}
            style={styles.actionCard}
          >
            <LinearGradient
              colors={[colors.accent.cyan + '20', colors.accent.cyan + '08']}
              style={styles.actionCardGradient}
            >
              <View style={styles.actionCardContent}>
                <View style={[styles.actionIconContainer, { backgroundColor: colors.accent.cyan }]}>
                  <Text style={styles.actionIcon}>🧠</Text>
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Quizzes</Text>
                  <Text style={styles.actionSubtitle}>Test your knowledge</Text>
                </View>
                <View style={styles.actionArrow}>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Achievements Card */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(learn)/achievements')}
            style={styles.actionCard}
          >
            <LinearGradient
              colors={[colors.accent.gold + '20', colors.accent.gold + '08']}
              style={styles.actionCardGradient}
            >
              <View style={styles.actionCardContent}>
                <View style={[styles.actionIconContainer, { backgroundColor: colors.accent.gold }]}>
                  <Text style={styles.actionIcon}>🏆</Text>
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Achievements</Text>
                  <Text style={styles.actionSubtitle}>
                    {getTotalUnlocked()} unlocked ({getUnlockPercentage()}%)
                  </Text>
                </View>
                <View style={styles.actionArrow}>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Journal Card */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(learn)/journal')}
            style={styles.actionCard}
          >
            <LinearGradient
              colors={['#F472B6' + '20', '#F472B6' + '08']}
              style={styles.actionCardGradient}
            >
              <View style={styles.actionCardContent}>
                <View style={[styles.actionIconContainer, { backgroundColor: '#F472B6' }]}>
                  <Text style={styles.actionIcon}>📝</Text>
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Journal</Text>
                  <Text style={styles.actionSubtitle}>
                    Record your learning journey
                  </Text>
                </View>
                <View style={styles.actionArrow}>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Card Encyclopedia */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(learn)/encyclopedia')}
            style={styles.actionCard}
          >
            <LinearGradient
              colors={[colors.accent.goldLight + '15', colors.accent.goldLight + '05']}
              style={styles.actionCardGradient}
            >
              <View style={styles.actionCardContent}>
                <View style={[styles.actionIconContainer, { backgroundColor: colors.accent.goldLight }]}>
                  <Text style={styles.actionIcon}>🔮</Text>
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Card Encyclopedia</Text>
                  <Text style={styles.actionSubtitle}>
                    {masteredCards.length} of 78 cards mastered
                  </Text>
                </View>
                <View style={styles.actionArrow}>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

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
    paddingBottom: spacing.xxl,
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

  // Level Card
  levelCard: {
    marginBottom: spacing.lg,
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  levelGradient: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent.gold + '40',
    borderRadius: 20,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  levelIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  levelIcon: {
    fontSize: 28,
  },
  levelInfo: {
    flex: 1,
  },
  levelLabel: {
    fontSize: 12,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  levelTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  xpBadge: {
    backgroundColor: colors.accent.gold,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  xpText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.background.primary,
  },
  progressContainer: {
    marginTop: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.tertiary,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'right',
  },

  // Stats Row
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

  // Section Title
  sectionTitle: {
    marginBottom: spacing.md,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.secondary,
  },

  // Action Cards
  actionCard: {
    marginBottom: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.md,
  },
  actionCardGradient: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  actionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  actionArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  arrowIcon: {
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: colors.accent.purple,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: spacing.sm,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text.primary,
  },
});
