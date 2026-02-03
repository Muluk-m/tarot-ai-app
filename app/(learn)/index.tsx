/**
 * Learning Hub - 学习中心
 * iPad 和 iOS 适配
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
  ZapIcon,
  TargetIcon,
  LayersIcon,
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
    stageProgress,
    totalXp,
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
  const overallProgress = Math.min(Math.round((currentStage / 5) * 100 + stageProgress / 5), 100);

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
          <Text style={styles.headerTitle}>学习中心</Text>
          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        {/* Level Progress Hero */}
        <HeroCard
          title={levelInfo.title}
          subtitle={`Level ${levelInfo.level} · ${masteredCards.length}/${cardsForNextLevel} 卡牌已掌握`}
          icon={<AwardIcon size={responsive.width(28, 32)} color="#D4AF37" />}
          onPress={() => router.push('/(learn)/achievements')}
          progress={levelProgress}
          progressLabel={`${experiencePoints} XP`}
          actionText="查看成就"
          theme="dark"
        />

        {/* Quick Stats */}
        <StatCard
          items={[
            { value: studyStreak, label: '连续学习' },
            { value: completedLessons.length, label: '已完成课程' },
            { value: `${overallProgress}%`, label: '总进度' },
          ]}
          style={styles.statsCard}
        />

        <Spacer size={responsive.spacing(20, 28)} />

        {/* Quick Access - Grid for tablets, column for phones */}
        <SectionHeader title="快速开始" subtitle="继续你的学习之旅" />

        <Row gap={responsive.spacing(12, 16)} style={styles.quickGrid}>
          <QuickCard
            title="课程学习"
            subtitle={`${completedCourses.length}/13 已完成`}
            icon={<BookIcon size={responsive.width(24, 28)} color="#10B981" />}
            onPress={() => router.push('/(learn)/courses')}
            theme="green"
          />
          <QuickCard
            title="闪卡记忆"
            subtitle={cardsDue > 0 ? `${cardsDue} 张待复习` : '随时练习'}
            icon={<CardsIcon size={responsive.width(24, 28)} color="#8B5CF6" />}
            onPress={() => router.push('/(learn)/flashcards')}
            theme="purple"
          />
        </Row>

        {isTablet && (
          <Row gap={responsive.spacing(12, 16)} style={styles.quickGrid}>
            <QuickCard
              title="知识测验"
              subtitle="检验学习成果"
              icon={<TrophyIcon size={responsive.width(24, 28)} color="#22D3EE" />}
              onPress={() => router.push('/(learn)/quizzes')}
              theme="cyan"
            />
            <QuickCard
              title="卡牌百科"
              subtitle={`${masteredCards.length}/78 已掌握`}
              icon={<GridIcon size={responsive.width(24, 28)} color="#D4AF37" />}
              onPress={() => router.push('/(learn)/encyclopedia')}
              theme="gold"
            />
          </Row>
        )}

        <Spacer size={responsive.spacing(20, 28)} />

        {/* Learning Modules */}
        <SectionHeader
          title="学习模块"
          action={{
            label: '查看全部',
            onPress: () => router.push('/(learn)/courses'),
          }}
        />

        <View style={styles.listContainer}>
          {!isTablet && (
            <>
              <ListCard
                title="知识测验"
                subtitle="检验你的塔罗知识"
                icon={<TrophyIcon size={22} color="#22D3EE" />}
                onPress={() => router.push('/(learn)/quizzes')}
                theme="cyan"
              />
              <Spacer size={responsive.spacing(10, 12)} />
            </>
          )}

          <ListCard
            title="成就系统"
            subtitle={`${getTotalUnlocked()} 个已解锁 (${getUnlockPercentage()}%)`}
            icon={<AwardIcon size={22} color="#D4AF37" />}
            onPress={() => router.push('/(learn)/achievements')}
            theme="gold"
            rightElement={
              <Badge text={`${getTotalUnlocked()}`} theme="gold" />
            }
          />

          <Spacer size={responsive.spacing(10, 12)} />

          <ListCard
            title="学习日记"
            subtitle="记录你的学习心得"
            icon={<EditIcon size={22} color="#F472B6" />}
            onPress={() => router.push('/(learn)/journal')}
            theme="purple"
          />

          <Spacer size={responsive.spacing(10, 12)} />

          {!isTablet && (
            <ListCard
              title="卡牌百科"
              subtitle={`${masteredCards.length}/78 张卡牌已掌握`}
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
              <Text style={styles.dailyGoalTitle}>今日目标</Text>
              <Text style={styles.dailyGoalSubtitle}>完成 3 张卡牌学习</Text>
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
