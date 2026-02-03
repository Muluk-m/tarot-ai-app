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
import Svg, { Path, Circle, G, Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { useLearningStore } from '@/stores/learningStore';

// SVG Icons - No emojis, using proper vector icons
const BookIcon = ({ size = 24, color = '#D4AF37' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5A2.5 2.5 0 016.5 17H20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 7h8M8 11h6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

const CardsIcon = ({ size = 24, color = '#8B5CF6' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="12" height="16" rx="2" stroke={color} strokeWidth={2} />
    <Path d="M9 4V2M9 22v-2" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Rect x="9" y="4" width="12" height="16" rx="2" stroke={color} strokeWidth={2} fill="none" />
    <Circle cx="15" cy="12" r="3" stroke={color} strokeWidth={1.5} fill="none" />
  </Svg>
);

const TrophyIcon = ({ size = 24, color = '#F59E0B' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9H4.5A2.5 2.5 0 012 6.5v0A2.5 2.5 0 014.5 4H6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M18 9h1.5A2.5 2.5 0 0022 6.5v0A2.5 2.5 0 0019.5 4H18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M6 4h12v8a6 6 0 01-6 6v0a6 6 0 01-6-6V4z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M12 18v3M8 21h8" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const HistoryIcon = ({ size = 24, color = '#22D3EE' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SparkleIcon = ({ size = 24, color = '#D4AF37' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Circle cx="19" cy="5" r="2" stroke={color} strokeWidth={1.5} />
    <Circle cx="5" cy="19" r="2" stroke={color} strokeWidth={1.5} />
  </Svg>
);

const ChevronRightIcon = ({ size = 20, color = '#D4AF37' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Progress Ring Component
const ProgressRing = ({ progress, size = 60, strokeWidth = 4 }: { progress: number; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg width={size} height={size}>
      <Defs>
        <SvgLinearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#D4AF37" />
          <Stop offset="1" stopColor="#F4D03F" />
        </SvgLinearGradient>
      </Defs>
      {/* Background circle */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#2A2F3E"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress circle */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
};

export default function Index() {
  const router = useRouter();
  const { currentStage, stageProgress, totalXp } = useLearningStore();

  // Calculate overall learning progress
  const overallProgress = Math.min(Math.round((currentStage / 5) * 100 + stageProgress / 5), 100);

  // Stage names
  const stageNames = ['入门学徒', '塔罗见习', '神秘探索者', '星象解读师', '大师'];
  const currentStageName = stageNames[Math.min(currentStage - 1, 4)] || '入门学徒';

  return (
    <View style={styles.container}>
      {/* Animated background gradient */}
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Compact Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.appName}>Celestial Eye</Text>
            <View style={styles.levelBadge}>
              <SparkleIcon size={12} color="#D4AF37" />
              <Text style={styles.levelText}>{currentStageName}</Text>
            </View>
          </View>
          <View style={styles.xpContainer}>
            <Text style={styles.xpValue}>{totalXp}</Text>
            <Text style={styles.xpLabel}>XP</Text>
          </View>
        </View>

        {/* Main Learning Card - Hero */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push('/(learn)')}
          style={styles.heroCard}
        >
          <LinearGradient
            colors={['#1E2638', '#2E1A47']}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Decorative elements */}
            <View style={styles.heroDecoTop} />
            <View style={styles.heroDecoBottom} />

            <View style={styles.heroContent}>
              <View style={styles.heroLeft}>
                <View style={styles.heroIconContainer}>
                  <BookIcon size={32} color="#D4AF37" />
                </View>
                <View style={styles.heroTextContainer}>
                  <Text style={styles.heroTitle}>继续学习之旅</Text>
                  <Text style={styles.heroSubtitle}>
                    掌握78张塔罗牌的奥秘
                  </Text>
                  <View style={styles.heroProgressContainer}>
                    <View style={styles.heroProgressBar}>
                      <View style={[styles.heroProgressFill, { width: `${overallProgress}%` }]} />
                    </View>
                    <Text style={styles.heroProgressText}>{overallProgress}%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.heroRight}>
                <ProgressRing progress={overallProgress} size={70} strokeWidth={5} />
                <Text style={styles.heroStageText}>第 {currentStage} 阶段</Text>
              </View>
            </View>

            {/* Action hint */}
            <View style={styles.heroAction}>
              <Text style={styles.heroActionText}>立即开始</Text>
              <ChevronRightIcon size={16} color="#D4AF37" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick Access Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>快速开始</Text>
        </View>

        <View style={styles.quickAccessGrid}>
          {/* Flashcards */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(learn)/flashcards')}
            style={styles.quickCard}
          >
            <LinearGradient
              colors={['rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.05)']}
              style={styles.quickCardGradient}
            >
              <View style={styles.quickCardIcon}>
                <CardsIcon size={28} color="#D4AF37" />
              </View>
              <Text style={styles.quickCardTitle}>闪卡记忆</Text>
              <Text style={styles.quickCardSubtitle}>快速复习卡牌</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Quiz */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(learn)/quizzes')}
            style={styles.quickCard}
          >
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.15)', 'rgba(139, 92, 246, 0.05)']}
              style={styles.quickCardGradient}
            >
              <View style={styles.quickCardIcon}>
                <TrophyIcon size={28} color="#8B5CF6" />
              </View>
              <Text style={styles.quickCardTitle}>知识测验</Text>
              <Text style={styles.quickCardSubtitle}>检验学习成果</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Practice Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>实践练习</Text>
          <Text style={styles.sectionSubtitle}>运用所学知识</Text>
        </View>

        {/* Practice Cards */}
        <View style={styles.practiceContainer}>
          {/* Single Card Reading */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              const { setSpreadType } = require('@/stores/cardStore').useCardStore.getState();
              const { clearCurrentReading } = require('@/stores/readingStore').useReadingStore.getState();
              clearCurrentReading();
              setSpreadType('single');
              router.push('/(reading)/shuffle');
            }}
            style={styles.practiceCard}
          >
            <LinearGradient
              colors={['rgba(34, 211, 238, 0.12)', 'rgba(34, 211, 238, 0.04)']}
              style={styles.practiceCardGradient}
            >
              <View style={styles.practiceCardContent}>
                <View style={[styles.practiceCardIcon, { backgroundColor: 'rgba(34, 211, 238, 0.15)' }]}>
                  <SparkleIcon size={24} color="#22D3EE" />
                </View>
                <View style={styles.practiceCardText}>
                  <Text style={styles.practiceCardTitle}>单牌解读</Text>
                  <Text style={styles.practiceCardSubtitle}>每日一卡，深入理解</Text>
                </View>
                <ChevronRightIcon size={20} color="#22D3EE" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Three Card Reading */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              const { setSpreadType } = require('@/stores/cardStore').useCardStore.getState();
              const { clearCurrentReading } = require('@/stores/readingStore').useReadingStore.getState();
              clearCurrentReading();
              setSpreadType('three');
              router.push('/(reading)/shuffle');
            }}
            style={styles.practiceCard}
          >
            <LinearGradient
              colors={['rgba(16, 185, 129, 0.12)', 'rgba(16, 185, 129, 0.04)']}
              style={styles.practiceCardGradient}
            >
              <View style={styles.practiceCardContent}>
                <View style={[styles.practiceCardIcon, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                  <CardsIcon size={24} color="#10B981" />
                </View>
                <View style={styles.practiceCardText}>
                  <Text style={styles.practiceCardTitle}>三牌阵练习</Text>
                  <Text style={styles.practiceCardSubtitle}>过去·现在·未来</Text>
                </View>
                <ChevronRightIcon size={20} color="#10B981" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* History */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/history')}
            style={styles.practiceCard}
          >
            <LinearGradient
              colors={['rgba(148, 163, 184, 0.12)', 'rgba(148, 163, 184, 0.04)']}
              style={styles.practiceCardGradient}
            >
              <View style={styles.practiceCardContent}>
                <View style={[styles.practiceCardIcon, { backgroundColor: 'rgba(148, 163, 184, 0.15)' }]}>
                  <HistoryIcon size={24} color="#94A3B8" />
                </View>
                <View style={styles.practiceCardText}>
                  <Text style={styles.practiceCardTitle}>解读历史</Text>
                  <Text style={styles.practiceCardSubtitle}>回顾过往记录</Text>
                </View>
                <ChevronRightIcon size={20} color="#94A3B8" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Stats Summary */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>78</Text>
            <Text style={styles.statLabel}>卡牌总数</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>学习阶段</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalXp}</Text>
            <Text style={styles.statLabel}>累计经验</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          学习塔罗，探索自我
        </Text>
      </ScrollView>
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
  scrollContent: {
    paddingTop: spacing.xxxl + spacing.md,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerLeft: {
    flex: 1,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.accent.gold,
    letterSpacing: 1,
    marginBottom: 4,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent.gold,
  },
  xpContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  xpValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent.gold,
  },
  xpLabel: {
    fontSize: 10,
    color: colors.text.tertiary,
    fontWeight: '600',
  },

  // Hero Card
  heroCard: {
    marginBottom: spacing.xl,
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  heroGradient: {
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 24,
    padding: spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  heroDecoTop: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },
  heroDecoBottom: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heroLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: colors.text.tertiary,
    marginBottom: 10,
  },
  heroProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  heroProgressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: 3,
  },
  heroProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent.gold,
    minWidth: 35,
  },
  heroRight: {
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  heroStageText: {
    fontSize: 11,
    color: colors.text.tertiary,
    marginTop: 6,
    fontWeight: '500',
  },
  heroAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 4,
  },
  heroActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent.gold,
  },

  // Section Headers
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.text.tertiary,
    marginTop: 2,
  },

  // Quick Access Grid
  quickAccessGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  quickCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  quickCardGradient: {
    padding: spacing.lg,
    minHeight: 130,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
  },
  quickCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  quickCardSubtitle: {
    fontSize: 12,
    color: colors.text.tertiary,
  },

  // Practice Cards
  practiceContainer: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  practiceCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  practiceCardGradient: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
  },
  practiceCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  practiceCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  practiceCardText: {
    flex: 1,
  },
  practiceCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  practiceCardSubtitle: {
    fontSize: 12,
    color: colors.text.tertiary,
  },

  // Stats Card
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.text.tertiary,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginHorizontal: spacing.sm,
  },

  // Footer
  footer: {
    fontSize: 12,
    color: colors.text.quaternary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
