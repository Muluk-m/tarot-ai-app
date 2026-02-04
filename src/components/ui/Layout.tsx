/**
 * Responsive Layout Components
 * iPad 和 iOS 自适应布局组件
 */

import React from 'react';
import { View, ScrollView, Dimensions, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';

// 获取屏幕信息
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 设备类型判断
export const isTablet = SCREEN_WIDTH >= 768;
export const isLargeTablet = SCREEN_WIDTH >= 1024;
export const isSmallPhone = SCREEN_WIDTH < 375;

// 响应式断点
export const BREAKPOINTS = {
  sm: 375, // Small phones
  md: 414, // Regular phones
  lg: 768, // iPad mini / small tablets
  xl: 1024, // iPad / large tablets
  xxl: 1366, // iPad Pro
} as const;

// 响应式尺寸计算
export const responsive = {
  // 根据屏幕宽度返回值
  width: (phone: number, tablet: number, largeTablet?: number) => {
    if (isLargeTablet && largeTablet !== undefined) return largeTablet;
    if (isTablet) return tablet;
    return phone;
  },
  // 百分比宽度
  wp: (percent: number) => (SCREEN_WIDTH * percent) / 100,
  // 百分比高度
  hp: (percent: number) => (SCREEN_HEIGHT * percent) / 100,
  // 字体大小
  fontSize: (phone: number, tablet?: number) => {
    if (isTablet) return tablet || phone * 1.2;
    return phone;
  },
  // 间距
  spacing: (phone: number, tablet?: number) => {
    if (isTablet) return tablet || phone * 1.25;
    return phone;
  },
  // 列数
  columns: (phone: number, tablet: number, largeTablet?: number) => {
    if (isLargeTablet && largeTablet !== undefined) return largeTablet;
    if (isTablet) return tablet;
    return phone;
  },
};

// 网格列宽计算
export const getColumnWidth = (
  columns: number,
  gap: number,
  containerPadding: number = 0
): number => {
  const totalGap = gap * (columns - 1);
  const availableWidth = SCREEN_WIDTH - containerPadding * 2 - totalGap;
  return availableWidth / columns;
};

// 最大内容宽度
export const MAX_CONTENT_WIDTH = {
  sm: 400,
  md: 600,
  lg: 800,
  xl: 1000,
  full: SCREEN_WIDTH,
} as const;

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
  gradientColors?: string[];
}

/**
 * 屏幕容器 - 带渐变背景
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  gradient = true,
  gradientColors = ['#0A0E1A', '#1A0E2E', '#0A0E1A'],
}) => {
  return (
    <View style={[styles.screenContainer, style]}>
      {gradient && (
        <LinearGradient
          colors={gradientColors as [string, string, string]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      )}
      {children}
    </View>
  );
};

interface ContentContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  maxWidth?: keyof typeof MAX_CONTENT_WIDTH | number;
  center?: boolean;
}

/**
 * 内容容器 - 限制最大宽度并居中（适配 iPad）
 */
export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  style,
  maxWidth = 'lg',
  center = true,
}) => {
  const width = typeof maxWidth === 'number' ? maxWidth : MAX_CONTENT_WIDTH[maxWidth];

  return (
    <View
      style={[
        styles.contentContainer,
        {
          maxWidth: isTablet ? width : '100%',
          alignSelf: center ? 'center' : 'flex-start',
          width: '100%',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

interface SafeScrollViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  bounces?: boolean;
  maxWidth?: keyof typeof MAX_CONTENT_WIDTH | number;
}

/**
 * 安全滚动视图 - 处理安全区域
 */
export const SafeScrollView: React.FC<SafeScrollViewProps> = ({
  children,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  bounces = true,
  maxWidth = 'lg',
}) => {
  const insets = useSafeAreaInsets();
  const width = typeof maxWidth === 'number' ? maxWidth : MAX_CONTENT_WIDTH[maxWidth];

  return (
    <ScrollView
      style={[styles.scrollView, style]}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: insets.top + responsive.spacing(16, 24),
          paddingBottom: insets.bottom + responsive.spacing(24, 32),
          paddingHorizontal: responsive.spacing(16, 24),
        },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      bounces={bounces}>
      <View
        style={[
          {
            maxWidth: isTablet ? width : '100%',
            alignSelf: 'center',
            width: '100%',
          },
        ]}>
        {children}
      </View>
    </ScrollView>
  );
};

interface GridProps {
  children: React.ReactNode;
  columns?: number | { phone: number; tablet: number; largeTablet?: number };
  gap?: number;
  style?: ViewStyle;
}

/**
 * 网格布局组件
 */
export const Grid: React.FC<GridProps> = ({
  children,
  columns = { phone: 2, tablet: 3, largeTablet: 4 },
  gap = responsive.spacing(12, 16),
  style,
}) => {
  const columnCount =
    typeof columns === 'number'
      ? columns
      : responsive.columns(columns.phone, columns.tablet, columns.largeTablet);

  return (
    <View style={[styles.grid, { gap }, style]}>
      {React.Children.map(children, (child, index) => (
        <View
          style={{
            width: `${(100 - (columnCount - 1) * (gap / SCREEN_WIDTH) * 100) / columnCount}%`,
          }}>
          {child}
        </View>
      ))}
    </View>
  );
};

interface RowProps {
  children: React.ReactNode;
  gap?: number;
  style?: ViewStyle;
  wrap?: boolean;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

/**
 * 行布局组件
 */
export const Row: React.FC<RowProps> = ({
  children,
  gap = 12,
  style,
  wrap = false,
  align = 'center',
  justify = 'flex-start',
}) => {
  return (
    <View
      style={[
        styles.row,
        {
          gap,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          alignItems: align,
          justifyContent: justify,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
}

/**
 * 内容区块组件
 */
export const Section: React.FC<SectionProps> = ({ children, style }) => {
  return <View style={[styles.section, style]}>{children}</View>;
};

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
}

/**
 * 间距组件
 */
export const Spacer: React.FC<SpacerProps> = ({ size = 16, horizontal = false }) => {
  return (
    <View
      style={{
        [horizontal ? 'width' : 'height']: size,
      }}
    />
  );
};

interface DividerProps {
  color?: string;
  thickness?: number;
  style?: ViewStyle;
}

/**
 * 分割线组件
 */
export const Divider: React.FC<DividerProps> = ({
  color = 'rgba(255, 255, 255, 0.08)',
  thickness = 1,
  style,
}) => {
  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor: color,
          width: '100%',
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  contentContainer: {
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
  section: {
    marginBottom: responsive.spacing(24, 32),
  },
});

export default {
  ScreenContainer,
  ContentContainer,
  SafeScrollView,
  Grid,
  Row,
  Section,
  Spacer,
  Divider,
  responsive,
  isTablet,
  isLargeTablet,
  isSmallPhone,
  BREAKPOINTS,
  MAX_CONTENT_WIDTH,
  getColumnWidth,
};
