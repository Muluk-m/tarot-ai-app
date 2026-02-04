/**
 * Achievements Screen
 * iPad and iOS adaptive layout
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
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

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  SectionHeader,
  ChevronLeftIcon,
  TrophyIcon,
  BookIcon,
  CardsIcon,
  StarIcon,
  CheckIcon,
  LockIcon,
} from '@/components/ui';
import { IconButton } from '@/components/ui/Buttons';

type Category = 'all' | 'knowledge' | 'practice' | 'special';

const CATEGORIES: { key: Category; title: string; Icon: React.FC<any>; color: string }[] = [
  { key: 'all', title: 'All', Icon: TrophyIcon, color: colors.accent.gold },
  { key: 'knowledge', title: 'Knowledge', Icon: BookIcon, color: '#10B981' },
  { key: 'practice', title: 'Practice', Icon: CardsIcon, color: colors.accent.purple },
  { key: 'special', title: 'Special', Icon: StarIcon, color: colors.accent.cyan },
];

export default function AchievementsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const { isUnlocked, getTotalUnlocked, getUnlockPercentage } = useAchievementStore();

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
        return [...KNOWLEDGE_ACHIEVEMENTS, ...PRACTICE_ACHIEVEMENTS, ...SPECIAL_ACHIEVEMENTS];
    }
  };

  const achievements = getAchievements();
  const unlockedCount = achievements.filter((a) => isUnlocked(a.id)).length;
  const totalUnlocked = getTotalUnlocked();
  const unlockPercentage = getUnlockPercentage();
  const categoryInfo = CATEGORIES.find((c) => c.key === selectedCategory)!;

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
          <Text style={styles.headerTitle}>Achievements</Text>
          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.trophyContainer}>
              <TrophyIcon size={responsive.width(28, 32)} color={colors.background.primary} />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressSubtitle}>{totalUnlocked} achievements unlocked</Text>
            </View>
            <Text style={styles.progressPercent}>{unlockPercentage}%</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${unlockPercentage}%` }]} />
            </View>
          </View>
        </View>

        <Spacer size={responsive.spacing(20, 28)} />

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            const CatIcon = cat.Icon;

            return (
              <Pressable
                key={cat.key}
                onPress={() => setSelectedCategory(cat.key)}
                style={[styles.tab, isSelected && { borderColor: cat.color }]}>
                <View style={[styles.tabIconContainer, { backgroundColor: cat.color + '20' }]}>
                  <CatIcon size={responsive.width(20, 24)} color={cat.color} />
                </View>
                <Text style={[styles.tabTitle, isSelected && { color: colors.text.primary }]}>
                  {cat.title}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Spacer size={responsive.spacing(16, 24)} />

        {/* Section Header */}
        <SectionHeader
          title={`${categoryInfo.title} Achievements`}
          subtitle={`${unlockedCount} / ${achievements.length} unlocked`}
        />

        {/* Achievements List */}
        <View style={styles.achievementsList}>
          {achievements.map((achievement) => {
            const unlocked = isUnlocked(achievement.id);
            const progress = getProgress(achievement);
            const hidden = achievement.hidden && !unlocked;

            return (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  unlocked && styles.achievementCardUnlocked,
                  hidden && styles.achievementCardHidden,
                ]}>
                <View
                  style={[
                    styles.achievementIcon,
                    unlocked && styles.achievementIconUnlocked,
                    hidden && styles.achievementIconHidden,
                  ]}>
                  {hidden ? (
                    <LockIcon size={20} color={colors.text.quaternary} />
                  ) : unlocked ? (
                    <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                  ) : (
                    <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                  )}
                </View>

                <View style={styles.achievementInfo}>
                  <Text style={[styles.achievementTitle, hidden && styles.hiddenText]}>
                    {hidden ? 'Hidden Achievement' : achievement.title}
                  </Text>
                  <Text style={[styles.achievementDescription, hidden && styles.hiddenText]}>
                    {hidden ? 'Keep learning to unlock!' : achievement.description}
                  </Text>

                  {!unlocked && !hidden && (
                    <View style={styles.achievementProgress}>
                      <View style={styles.miniProgressBar}>
                        <View style={[styles.miniProgressFill, { width: `${progress}%` }]} />
                      </View>
                      <Text style={styles.progressTextSmall}>{getProgressText(achievement)}</Text>
                    </View>
                  )}

                  {unlocked && (
                    <View style={styles.unlockedBadge}>
                      <CheckIcon size={12} color={colors.accent.gold} />
                      <Text style={styles.unlockedText}>Unlocked</Text>
                    </View>
                  )}
                </View>
              </View>
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

  // Progress Card
  progressCard: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: responsive.width(16, 20),
    padding: responsive.spacing(16, 20),
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing(12, 16),
  },
  trophyContainer: {
    width: responsive.width(52, 64),
    height: responsive.width(52, 64),
    borderRadius: responsive.width(16, 18),
    backgroundColor: colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing(14, 18),
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '700',
    color: colors.text.primary,
  },
  progressSubtitle: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.tertiary,
    marginTop: 2,
  },
  progressPercent: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '800',
    color: colors.accent.gold,
  },
  progressBarContainer: {
    marginTop: responsive.spacing(4, 8),
  },
  progressBar: {
    height: responsive.width(8, 10),
    backgroundColor: colors.background.tertiary,
    borderRadius: responsive.width(4, 5),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: responsive.width(4, 5),
  },

  // Tabs
  tabsContainer: {
    paddingBottom: responsive.spacing(4, 8),
    gap: responsive.spacing(10, 14),
  },
  tab: {
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    padding: responsive.spacing(12, 16),
    minWidth: responsive.width(80, 100),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    marginRight: responsive.spacing(10, 14),
  },
  tabIconContainer: {
    width: responsive.width(36, 44),
    height: responsive.width(36, 44),
    borderRadius: responsive.width(10, 12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(6, 8),
  },
  tabTitle: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
    color: colors.text.tertiary,
  },

  // Achievement List
  achievementsList: {
    gap: responsive.spacing(10, 14),
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    padding: responsive.spacing(14, 18),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  achievementCardUnlocked: {
    borderColor: 'rgba(212, 175, 55, 0.25)',
    backgroundColor: 'rgba(212, 175, 55, 0.06)',
  },
  achievementCardHidden: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: responsive.width(48, 56),
    height: responsive.width(48, 56),
    borderRadius: responsive.width(14, 16),
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing(12, 16),
  },
  achievementIconUnlocked: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  achievementIconHidden: {
    backgroundColor: colors.background.tertiary,
  },
  achievementEmoji: {
    fontSize: responsive.fontSize(22, 26),
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: responsive.fontSize(13, 15),
    color: colors.text.tertiary,
    lineHeight: responsive.fontSize(18, 22),
  },
  hiddenText: {
    color: colors.text.quaternary,
  },
  achievementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive.spacing(8, 10),
    gap: responsive.spacing(8, 10),
  },
  miniProgressBar: {
    flex: 1,
    height: responsive.width(4, 6),
    backgroundColor: colors.background.tertiary,
    borderRadius: responsive.width(2, 3),
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: responsive.width(2, 3),
  },
  progressTextSmall: {
    fontSize: responsive.fontSize(12, 14),
    color: colors.text.tertiary,
    width: responsive.width(50, 60),
    textAlign: 'right',
  },
  unlockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive.spacing(8, 10),
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: responsive.spacing(10, 12),
    paddingVertical: responsive.spacing(4, 6),
    borderRadius: responsive.width(8, 10),
    gap: responsive.spacing(4, 6),
  },
  unlockedText: {
    fontSize: responsive.fontSize(12, 14),
    fontWeight: '600',
    color: colors.accent.gold,
  },
});
