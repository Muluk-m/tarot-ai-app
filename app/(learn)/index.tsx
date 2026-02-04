/**
 * Learning Hub
 * iPad and iOS adaptive layout
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { useLearningStore } from '@/stores/learningStore';
import { useAchievementStore } from '@/stores/achievementStore';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { getLevelInfo, getNextLevelInfo, LEVEL_THRESHOLDS } from '@/data/achievements';

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  isTablet,
  HeroCard,
  QuickCard,
  ListCard,
  StatCard,
  SectionHeader,
  Badge,
  ProgressRing,
  BookIcon,
  CardsIcon,
  TrophyIcon,
  GridIcon,
  AwardIcon,
  EditIcon,
  ChevronLeftIcon,
  TargetIcon,
} from '@/components/ui';
import { IconButton } from '@/components/ui/Buttons';

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
    currentStage,
  } = useLearningStore();

  const { getTotalUnlocked, getUnlockPercentage } = useAchievementStore();
  const { getCardsDueForReview } = useFlashcardStore();

  // Map stage to index for progress calculation
  const stageIndex = { beginner: 1, intermediate: 2, advanced: 3, master: 4 }[currentStage] || 1;
  const stageProgress = ((currentLevel - 1) % 5) * 20; // Progress within current level (0-100)

  // Calculate level progress
  const levelInfo = getLevelInfo(masteredCards.length);
  const nextLevel = getNextLevelInfo(currentLevel);
  const cardsForNextLevel = nextLevel
    ? nextLevel.minCards
    : LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1].minCards;
  const levelProgress = nextLevel
    ? ((masteredCards.length - levelInfo.minCards) / (cardsForNextLevel - levelInfo.minCards)) * 100
    : 100;

  const cardsDue = getCardsDueForReview().length;
  const overallProgress = Math.min(Math.round((stageIndex / 5) * 100 + stageProgress / 5), 100);

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
          <Text style={styles.headerTitle}>Learning Hub</Text>
          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        {/* Level Progress Hero */}
        <HeroCard
          title={levelInfo.title}
          subtitle={`Level ${levelInfo.level} · ${masteredCards.length}/${cardsForNextLevel} cards mastered`}
          icon={<AwardIcon size={responsive.width(28, 32)} color="#D4AF37" />}
          onPress={() => router.push('/(learn)/achievements')}
          progress={levelProgress}
          progressLabel={`${experiencePoints} XP`}
          actionText="View Achievements"
          theme="dark"
        />

        {/* Quick Stats */}
        <StatCard
          items={[
            { value: studyStreak, label: 'Day Streak' },
            { value: completedLessons.length, label: 'Completed' },
            { value: `${overallProgress}%`, label: 'Progress' },
          ]}
          style={styles.statsCard}
        />

        <Spacer size={responsive.spacing(20, 28)} />

        {/* Quick Access - Grid for tablets, column for phones */}
        <SectionHeader title="Quick Start" subtitle="Continue your learning journey" />

        <Row gap={responsive.spacing(12, 16)} style={styles.quickGrid}>
          <QuickCard
            title="Courses"
            subtitle={`${completedCourses.length}/13 completed`}
            icon={<BookIcon size={responsive.width(24, 28)} color="#10B981" />}
            onPress={() => router.push('/(learn)/courses')}
            theme="green"
          />
          <QuickCard
            title="Flashcards"
            subtitle={cardsDue > 0 ? `${cardsDue} cards due` : 'Practice anytime'}
            icon={<CardsIcon size={responsive.width(24, 28)} color="#8B5CF6" />}
            onPress={() => router.push('/(learn)/flashcards')}
            theme="purple"
          />
        </Row>

        {isTablet && (
          <Row gap={responsive.spacing(12, 16)} style={styles.quickGrid}>
            <QuickCard
              title="Quizzes"
              subtitle="Test your knowledge"
              icon={<TrophyIcon size={responsive.width(24, 28)} color="#22D3EE" />}
              onPress={() => router.push('/(learn)/quizzes')}
              theme="cyan"
            />
            <QuickCard
              title="Encyclopedia"
              subtitle={`${masteredCards.length}/78 mastered`}
              icon={<GridIcon size={responsive.width(24, 28)} color="#D4AF37" />}
              onPress={() => router.push('/(learn)/encyclopedia')}
              theme="gold"
            />
          </Row>
        )}

        <Spacer size={responsive.spacing(20, 28)} />

        {/* Learning Modules */}
        <SectionHeader
          title="Learning Modules"
          action={{
            label: 'View All',
            onPress: () => router.push('/(learn)/courses'),
          }}
        />

        <View style={styles.listContainer}>
          {!isTablet && (
            <>
              <ListCard
                title="Quizzes"
                subtitle="Test your tarot knowledge"
                icon={<TrophyIcon size={22} color="#22D3EE" />}
                onPress={() => router.push('/(learn)/quizzes')}
                theme="cyan"
              />
              <Spacer size={responsive.spacing(10, 12)} />
            </>
          )}

          <ListCard
            title="Achievements"
            subtitle={`${getTotalUnlocked()} unlocked (${getUnlockPercentage()}%)`}
            icon={<AwardIcon size={22} color="#D4AF37" />}
            onPress={() => router.push('/(learn)/achievements')}
            theme="gold"
            rightElement={<Badge text={`${getTotalUnlocked()}`} theme="gold" />}
          />

          <Spacer size={responsive.spacing(10, 12)} />

          <ListCard
            title="Journal"
            subtitle="Record your learning insights"
            icon={<EditIcon size={22} color="#F472B6" />}
            onPress={() => router.push('/(learn)/journal')}
            theme="purple"
          />

          <Spacer size={responsive.spacing(10, 12)} />

          {!isTablet && (
            <ListCard
              title="Encyclopedia"
              subtitle={`${masteredCards.length}/78 cards mastered`}
              icon={<GridIcon size={22} color="#D4AF37" />}
              onPress={() => router.push('/(learn)/encyclopedia')}
              theme="gold"
            />
          )}
        </View>

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Daily Goal */}
        <View style={styles.dailyGoalCard}>
          <Row align="center" gap={responsive.spacing(12, 16)}>
            <View style={styles.dailyGoalIcon}>
              <TargetIcon size={24} color="#F59E0B" />
            </View>
            <View style={styles.dailyGoalText}>
              <Text style={styles.dailyGoalTitle}>Daily Goal</Text>
              <Text style={styles.dailyGoalSubtitle}>Complete 3 card lessons</Text>
            </View>
            <View style={styles.dailyGoalProgress}>
              <ProgressRing progress={66} size={48} strokeWidth={4} color="#F59E0B" />
              <Text style={styles.dailyGoalProgressText}>2/3</Text>
            </View>
          </Row>
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
  statsCard: {
    marginTop: responsive.spacing(8, 12),
  },
  quickGrid: {
    marginBottom: responsive.spacing(12, 16),
  },
  listContainer: {
    marginBottom: responsive.spacing(8, 12),
  },
  dailyGoalCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderRadius: responsive.width(16, 20),
    padding: responsive.spacing(16, 20),
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  dailyGoalIcon: {
    width: responsive.width(44, 52),
    height: responsive.width(44, 52),
    borderRadius: responsive.width(12, 14),
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyGoalText: {
    flex: 1,
  },
  dailyGoalTitle: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  dailyGoalSubtitle: {
    fontSize: responsive.fontSize(13, 15),
    color: colors.text.tertiary,
  },
  dailyGoalProgress: {
    alignItems: 'center',
    position: 'relative',
  },
  dailyGoalProgressText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -8 }],
    fontSize: responsive.fontSize(12, 14),
    fontWeight: '700',
    color: '#F59E0B',
  },
});
