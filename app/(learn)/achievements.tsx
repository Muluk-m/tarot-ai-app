import React, { useState } from 'react';
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
import { useAchievementStore } from '@/stores/achievementStore';
import { useLearningStore } from '@/stores/learningStore';
import { useQuizStore } from '@/stores/quizStore';
import { useJournalStore } from '@/stores/journalStore';
import { useReadingStore } from '@/stores/readingStore';
import {
  KNOWLEDGE_ACHIEVEMENTS,
  PRACTICE_ACHIEVEMENTS,
  SPECIAL_ACHIEVEMENTS,
  type Achievement,
} from '@/data/achievements';

type Category = 'all' | 'knowledge' | 'practice' | 'special';

const CATEGORIES: { key: Category; title: string; icon: string }[] = [
  { key: 'all', title: 'All', icon: '🏆' },
  { key: 'knowledge', title: 'Knowledge', icon: '📚' },
  { key: 'practice', title: 'Practice', icon: '🎴' },
  { key: 'special', title: 'Special', icon: '⭐' },
];

export default function AchievementsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const {
    isUnlocked,
    getUnlockedAchievements,
    getTotalUnlocked,
    getUnlockPercentage,
  } = useAchievementStore();

  const { masteredCards, completedCourses, completedLessons, studyStreak } = useLearningStore();
  const { getPerfectScores } = useQuizStore();
  const { getTotalEntries } = useJournalStore();
  const { readingHistory } = useReadingStore();

  const getProgress = (achievement: Achievement): number => {
    const { requirement } = achievement;

    switch (requirement.type) {
      case 'cards-mastered':
        return Math.min((masteredCards.length / requirement.target) * 100, 100);
      case 'courses-completed':
        return Math.min((completedCourses.length / requirement.target) * 100, 100);
      case 'lessons-completed':
        return Math.min((completedLessons.length / requirement.target) * 100, 100);
      case 'study-streak':
        return Math.min((studyStreak / requirement.target) * 100, 100);
      case 'quiz-perfect':
        return Math.min((getPerfectScores() / requirement.target) * 100, 100);
      case 'journal-entries':
        return Math.min((getTotalEntries() / requirement.target) * 100, 100);
      case 'readings-completed':
        return Math.min((readingHistory.length / requirement.target) * 100, 100);
      default:
        return 0;
    }
  };

  const getProgressText = (achievement: Achievement): string => {
    const { requirement } = achievement;

    let current = 0;
    switch (requirement.type) {
      case 'cards-mastered':
        current = masteredCards.length;
        break;
      case 'courses-completed':
        current = completedCourses.length;
        break;
      case 'lessons-completed':
        current = completedLessons.length;
        break;
      case 'study-streak':
        current = studyStreak;
        break;
      case 'quiz-perfect':
        current = getPerfectScores();
        break;
      case 'journal-entries':
        current = getTotalEntries();
        break;
      case 'readings-completed':
        current = readingHistory.length;
        break;
    }

    return `${Math.min(current, requirement.target)} / ${requirement.target}`;
  };

  const getAchievements = (): Achievement[] => {
    switch (selectedCategory) {
      case 'knowledge':
        return KNOWLEDGE_ACHIEVEMENTS;
      case 'practice':
        return PRACTICE_ACHIEVEMENTS;
      case 'special':
        return SPECIAL_ACHIEVEMENTS;
      default:
        return [
          ...KNOWLEDGE_ACHIEVEMENTS,
          ...PRACTICE_ACHIEVEMENTS,
          ...SPECIAL_ACHIEVEMENTS,
        ];
    }
  };

  const achievements = getAchievements();
  const unlockedCount = achievements.filter((a) => isUnlocked(a.id)).length;

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
            <Text style={styles.headerTitle}>Achievements</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Progress Card */}
          <View style={styles.progressCard}>
            <LinearGradient
              colors={[colors.accent.gold + '25', colors.accent.gold + '10']}
              style={styles.progressGradient}
            >
              <View style={styles.progressHeader}>
                <View style={styles.trophyContainer}>
                  <Text style={styles.trophyEmoji}>🏆</Text>
                </View>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressTitle}>Your Progress</Text>
                  <Text style={styles.progressSubtitle}>
                    {getTotalUnlocked()} achievements unlocked
                  </Text>
                </View>
                <Text style={styles.progressPercent}>{getUnlockPercentage()}%</Text>
              </View>

              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${getUnlockPercentage()}%` },
                    ]}
                  />
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setSelectedCategory(cat.key)}
                  style={[styles.tab, isSelected && styles.tabSelected]}
                >
                  <Text style={styles.tabIcon}>{cat.icon}</Text>
                  <Text
                    style={[
                      styles.tabTitle,
                      isSelected && styles.tabTitleSelected,
                    ]}
                  >
                    {cat.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Category Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {CATEGORIES.find((c) => c.key === selectedCategory)?.title} Achievements
            </Text>
            <Text style={styles.sectionCount}>
              {unlockedCount} / {achievements.length}
            </Text>
          </View>

          {/* Achievements List */}
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => {
              const unlocked = isUnlocked(achievement.id);
              const progress = getProgress(achievement);
              const hidden = achievement.hidden && !unlocked;

              return (
                <View key={achievement.id} style={styles.achievementCard}>
                  <LinearGradient
                    colors={
                      unlocked
                        ? [colors.accent.gold + '25', colors.accent.gold + '10']
                        : hidden
                        ? [colors.background.secondary + '80', colors.background.tertiary + '50']
                        : [colors.background.secondary, colors.background.tertiary]
                    }
                    style={styles.achievementGradient}
                  >
                    <View style={styles.achievementContent}>
                      <View
                        style={[
                          styles.achievementIcon,
                          unlocked && styles.achievementIconUnlocked,
                          hidden && styles.achievementIconHidden,
                        ]}
                      >
                        <Text style={styles.achievementEmoji}>
                          {hidden ? '❓' : achievement.icon}
                        </Text>
                      </View>

                      <View style={styles.achievementInfo}>
                        <Text
                          style={[
                            styles.achievementTitle,
                            hidden && styles.hiddenText,
                          ]}
                        >
                          {hidden ? 'Hidden Achievement' : achievement.title}
                        </Text>
                        <Text
                          style={[
                            styles.achievementDescription,
                            hidden && styles.hiddenText,
                          ]}
                        >
                          {hidden ? 'Keep learning to unlock!' : achievement.description}
                        </Text>

                        {!unlocked && !hidden && (
                          <View style={styles.achievementProgress}>
                            <View style={styles.miniProgressBar}>
                              <View
                                style={[
                                  styles.miniProgressFill,
                                  { width: `${progress}%` },
                                ]}
                              />
                            </View>
                            <Text style={styles.progressTextSmall}>
                              {getProgressText(achievement)}
                            </Text>
                          </View>
                        )}

                        {unlocked && (
                          <View style={styles.unlockedBadge}>
                            <Text style={styles.unlockedText}>✓ Unlocked</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              );
            })}
          </View>

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

  // Progress Card
  progressCard: {
    marginBottom: spacing.lg,
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  progressGradient: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent.gold + '40',
    borderRadius: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  trophyContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  trophyEmoji: {
    fontSize: 28,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  progressSubtitle: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  progressPercent: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.accent.gold,
  },
  progressBarContainer: {
    marginTop: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.tertiary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: 4,
  },

  // Tabs
  tabsContainer: {
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    gap: spacing.xs,
    marginRight: spacing.sm,
  },
  tabSelected: {
    backgroundColor: colors.accent.gold + '30',
    borderWidth: 1,
    borderColor: colors.accent.gold + '50',
  },
  tabIcon: {
    fontSize: 16,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.tertiary,
  },
  tabTitleSelected: {
    color: colors.accent.gold,
    fontWeight: '600',
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  sectionCount: {
    fontSize: 14,
    color: colors.text.tertiary,
  },

  // Achievement Card
  achievementsList: {
    gap: spacing.sm,
  },
  achievementCard: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.sm,
  },
  achievementGradient: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  achievementContent: {
    flexDirection: 'row',
    padding: spacing.md,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  achievementIconUnlocked: {
    backgroundColor: colors.accent.gold + '40',
  },
  achievementIconHidden: {
    backgroundColor: colors.background.tertiary + '80',
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 13,
    color: colors.text.tertiary,
    lineHeight: 18,
  },
  hiddenText: {
    color: colors.text.quaternary,
  },
  achievementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  miniProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.background.tertiary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: 2,
  },
  progressTextSmall: {
    fontSize: 12,
    color: colors.text.tertiary,
    width: 50,
    textAlign: 'right',
  },
  unlockedBadge: {
    marginTop: spacing.sm,
    backgroundColor: colors.accent.gold + '30',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  unlockedText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent.gold,
  },
});
