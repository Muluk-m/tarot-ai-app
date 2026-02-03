/**
 * Reusable Card Components
 * 统一的卡片组件库
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { ChevronRightIcon } from './Icons';
import { responsive, isTablet } from './Layout';

// 主题色定义
export const CARD_THEMES = {
  gold: {
    gradient: ['rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.05)'],
    border: 'rgba(212, 175, 55, 0.3)',
    accent: '#D4AF37',
    iconBg: 'rgba(212, 175, 55, 0.15)',
  },
  purple: {
    gradient: ['rgba(139, 92, 246, 0.15)', 'rgba(139, 92, 246, 0.05)'],
    border: 'rgba(139, 92, 246, 0.2)',
    accent: '#8B5CF6',
    iconBg: 'rgba(139, 92, 246, 0.15)',
  },
  cyan: {
    gradient: ['rgba(34, 211, 238, 0.12)', 'rgba(34, 211, 238, 0.04)'],
    border: 'rgba(34, 211, 238, 0.2)',
    accent: '#22D3EE',
    iconBg: 'rgba(34, 211, 238, 0.15)',
  },
  green: {
    gradient: ['rgba(16, 185, 129, 0.12)', 'rgba(16, 185, 129, 0.04)'],
    border: 'rgba(16, 185, 129, 0.2)',
    accent: '#10B981',
    iconBg: 'rgba(16, 185, 129, 0.15)',
  },
  silver: {
    gradient: ['rgba(148, 163, 184, 0.12)', 'rgba(148, 163, 184, 0.04)'],
    border: 'rgba(148, 163, 184, 0.2)',
    accent: '#94A3B8',
    iconBg: 'rgba(148, 163, 184, 0.15)',
  },
  red: {
    gradient: ['rgba(239, 68, 68, 0.12)', 'rgba(239, 68, 68, 0.04)'],
    border: 'rgba(239, 68, 68, 0.2)',
    accent: '#EF4444',
    iconBg: 'rgba(239, 68, 68, 0.15)',
  },
  dark: {
    gradient: ['#1E2638', '#2E1A47'],
    border: 'rgba(212, 175, 55, 0.3)',
    accent: '#D4AF37',
    iconBg: 'rgba(212, 175, 55, 0.15)',
  },
} as const;

export type CardTheme = keyof typeof CARD_THEMES;

// Progress Ring Component
export const ProgressRing: React.FC<{
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}> = ({ progress, size = 60, strokeWidth = 4, color = '#D4AF37' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg width={size} height={size}>
      <Defs>
        <SvgLinearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={color} />
          <Stop offset="1" stopColor={color} stopOpacity={0.6} />
        </SvgLinearGradient>
      </Defs>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeWidth}
        fill="none"
      />
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

interface HeroCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onPress: () => void;
  progress?: number;
  progressLabel?: string;
  actionText?: string;
  theme?: CardTheme;
  style?: ViewStyle;
}

/**
 * Hero 卡片 - 主要入口卡片
 */
export const HeroCard: React.FC<HeroCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  progress,
  progressLabel,
  actionText = '立即开始',
  theme = 'dark',
  style,
}) => {
  const themeColors = CARD_THEMES[theme];

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.heroCard, style]}>
      <LinearGradient
        colors={themeColors.gradient}
        style={[styles.heroGradient, { borderColor: themeColors.border }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.heroDecoTop} />
        <View style={styles.heroDecoBottom} />

        <View style={styles.heroContent}>
          <View style={styles.heroLeft}>
            <View style={[styles.heroIconContainer, { backgroundColor: themeColors.iconBg }]}>
              {icon}
            </View>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>{title}</Text>
              <Text style={styles.heroSubtitle}>{subtitle}</Text>
              {progress !== undefined && (
                <View style={styles.heroProgressContainer}>
                  <View style={styles.heroProgressBar}>
                    <View style={[styles.heroProgressFill, { width: `${progress}%`, backgroundColor: themeColors.accent }]} />
                  </View>
                  <Text style={[styles.heroProgressText, { color: themeColors.accent }]}>{progress}%</Text>
                </View>
              )}
            </View>
          </View>
          {progress !== undefined && (
            <View style={styles.heroRight}>
              <ProgressRing progress={progress} size={responsive.width(60, 70)} strokeWidth={5} color={themeColors.accent} />
              {progressLabel && <Text style={styles.heroStageText}>{progressLabel}</Text>}
            </View>
          )}
        </View>

        <View style={[styles.heroAction, { backgroundColor: themeColors.iconBg }]}>
          <Text style={[styles.heroActionText, { color: themeColors.accent }]}>{actionText}</Text>
          <ChevronRightIcon size={16} color={themeColors.accent} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

interface QuickCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onPress: () => void;
  theme?: CardTheme;
  style?: ViewStyle;
}

/**
 * 快速访问卡片 - 网格布局
 */
export const QuickCard: React.FC<QuickCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  theme = 'gold',
  style,
}) => {
  const themeColors = CARD_THEMES[theme];

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.quickCard, style]}>
      <LinearGradient colors={themeColors.gradient} style={[styles.quickCardGradient, { borderColor: themeColors.border }]}>
        <View style={[styles.quickCardIcon, { backgroundColor: themeColors.iconBg }]}>
          {icon}
        </View>
        <Text style={styles.quickCardTitle}>{title}</Text>
        <Text style={styles.quickCardSubtitle}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

interface ListCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onPress: () => void;
  rightElement?: React.ReactNode;
  showArrow?: boolean;
  theme?: CardTheme;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * 列表卡片 - 单行项目
 */
export const ListCard: React.FC<ListCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  rightElement,
  showArrow = true,
  theme = 'silver',
  disabled = false,
  style,
}) => {
  const themeColors = CARD_THEMES[theme];

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.9}
      onPress={disabled ? undefined : onPress}
      style={[styles.listCard, disabled && styles.listCardDisabled, style]}
    >
      <LinearGradient
        colors={themeColors.gradient}
        style={[styles.listCardGradient, { borderColor: themeColors.border }]}
      >
        <View style={styles.listCardContent}>
          <View style={[styles.listCardIcon, { backgroundColor: themeColors.iconBg }]}>
            {icon}
          </View>
          <View style={styles.listCardText}>
            <Text style={[styles.listCardTitle, disabled && styles.listCardTitleDisabled]}>{title}</Text>
            {subtitle && <Text style={styles.listCardSubtitle}>{subtitle}</Text>}
          </View>
          {rightElement || (showArrow && <ChevronRightIcon size={20} color={themeColors.accent} />)}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

interface StatCardProps {
  items: Array<{
    value: string | number;
    label: string;
  }>;
  style?: ViewStyle;
}

/**
 * 统计卡片
 */
export const StatCard: React.FC<StatCardProps> = ({ items, style }) => {
  return (
    <View style={[styles.statsCard, style]}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <View style={styles.statDivider} />}
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

/**
 * 区块标题
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  style,
}) => {
  return (
    <View style={[styles.sectionHeader, style]}>
      <View style={styles.sectionHeaderLeft}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>
      {action && (
        <TouchableOpacity onPress={action.onPress} style={styles.sectionAction}>
          <Text style={styles.sectionActionText}>{action.label}</Text>
          <ChevronRightIcon size={16} color={colors.accent.gold} />
        </TouchableOpacity>
      )}
    </View>
  );
};

interface BadgeProps {
  text: string;
  icon?: React.ReactNode;
  theme?: CardTheme;
  style?: ViewStyle;
}

/**
 * 徽章组件
 */
export const Badge: React.FC<BadgeProps> = ({
  text,
  icon,
  theme = 'gold',
  style,
}) => {
  const themeColors = CARD_THEMES[theme];

  return (
    <View style={[styles.badge, { backgroundColor: themeColors.iconBg }, style]}>
      {icon}
      <Text style={[styles.badgeText, { color: themeColors.accent }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Hero Card
  heroCard: {
    marginBottom: responsive.spacing(20, 24),
    borderRadius: responsive.width(20, 24),
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  heroGradient: {
    borderWidth: 1,
    borderRadius: responsive.width(20, 24),
    padding: responsive.spacing(16, 20),
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
    marginBottom: responsive.spacing(12, 16),
  },
  heroLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroIconContainer: {
    width: responsive.width(48, 56),
    height: responsive.width(48, 56),
    borderRadius: responsive.width(14, 16),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing(12, 16),
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: responsive.fontSize(12, 14),
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
    borderRadius: 3,
  },
  heroProgressText: {
    fontSize: responsive.fontSize(11, 13),
    fontWeight: '600',
    minWidth: 35,
  },
  heroRight: {
    alignItems: 'center',
    marginLeft: responsive.spacing(12, 16),
  },
  heroStageText: {
    fontSize: responsive.fontSize(10, 12),
    color: colors.text.tertiary,
    marginTop: 6,
    fontWeight: '500',
  },
  heroAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive.spacing(10, 12),
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 4,
  },
  heroActionText: {
    fontSize: responsive.fontSize(13, 15),
    fontWeight: '600',
  },

  // Quick Card
  quickCard: {
    flex: 1,
    borderRadius: responsive.width(16, 20),
    overflow: 'hidden',
  },
  quickCardGradient: {
    padding: responsive.spacing(14, 18),
    minHeight: responsive.width(110, 130),
    borderWidth: 1,
    borderRadius: responsive.width(16, 20),
  },
  quickCardIcon: {
    width: responsive.width(40, 48),
    height: responsive.width(40, 48),
    borderRadius: responsive.width(12, 14),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(8, 12),
  },
  quickCardTitle: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  quickCardSubtitle: {
    fontSize: responsive.fontSize(11, 13),
    color: colors.text.tertiary,
  },

  // List Card
  listCard: {
    borderRadius: responsive.width(14, 16),
    overflow: 'hidden',
  },
  listCardDisabled: {
    opacity: 0.5,
  },
  listCardGradient: {
    borderWidth: 1,
    borderRadius: responsive.width(14, 16),
  },
  listCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsive.spacing(12, 16),
  },
  listCardIcon: {
    width: responsive.width(40, 44),
    height: responsive.width(40, 44),
    borderRadius: responsive.width(10, 12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing(12, 16),
  },
  listCardText: {
    flex: 1,
  },
  listCardTitle: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  listCardTitleDisabled: {
    color: colors.text.tertiary,
  },
  listCardSubtitle: {
    fontSize: responsive.fontSize(11, 13),
    color: colors.text.tertiary,
  },

  // Stat Card
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: responsive.width(14, 16),
    padding: responsive.spacing(14, 18),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: responsive.fontSize(22, 26),
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: responsive.fontSize(10, 12),
    color: colors.text.tertiary,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginHorizontal: responsive.spacing(8, 12),
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.spacing(12, 16),
  },
  sectionHeaderLeft: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: responsive.fontSize(16, 20),
    fontWeight: '700',
    color: colors.text.primary,
  },
  sectionSubtitle: {
    fontSize: responsive.fontSize(12, 14),
    color: colors.text.tertiary,
    marginTop: 2,
  },
  sectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sectionActionText: {
    fontSize: responsive.fontSize(13, 15),
    color: colors.accent.gold,
    fontWeight: '500',
  },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: responsive.fontSize(11, 13),
    fontWeight: '600',
  },
});

export default {
  HeroCard,
  QuickCard,
  ListCard,
  StatCard,
  SectionHeader,
  Badge,
  ProgressRing,
  CARD_THEMES,
};
