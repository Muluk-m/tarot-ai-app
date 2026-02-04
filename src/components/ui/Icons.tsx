/**
 * Unified SVG Icon Library
 * 统一的 SVG 图标库 - 极简线条风格
 */

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path, Circle, Rect, Line, Polyline } from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

// Default props for icons
const _defaultProps: Required<IconProps> = {
  size: 24,
  color: '#D4AF37',
  strokeWidth: 2,
};
void _defaultProps; // Suppress unused variable warning - kept for documentation

// 书本图标 - 学习
export const BookIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5A2.5 2.5 0 016.5 17H20"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 7h8M8 11h6" stroke={color} strokeWidth={strokeWidth * 0.75} strokeLinecap="round" />
  </Svg>
);

// 卡片堆叠图标 - 闪卡/卡牌
export const CardsIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="12" height="16" rx="2" stroke={color} strokeWidth={strokeWidth} />
    <Rect
      x="9"
      y="4"
      width="12"
      height="16"
      rx="2"
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
    />
    <Circle cx="15" cy="12" r="3" stroke={color} strokeWidth={strokeWidth * 0.75} fill="none" />
  </Svg>
);

// 奖杯图标 - 成就/测验
export const TrophyIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9H4.5A2.5 2.5 0 012 6.5v0A2.5 2.5 0 014.5 4H6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M18 9h1.5A2.5 2.5 0 0022 6.5v0A2.5 2.5 0 0019.5 4H18"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M6 4h12v8a6 6 0 01-6 6v0a6 6 0 01-6-6V4z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M12 18v3M8 21h8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

// 时钟图标 - 历史
export const ClockIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M12 6v6l4 2"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 星星闪烁图标 - 神秘/特殊
export const SparkleIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <Circle cx="19" cy="5" r="2" stroke={color} strokeWidth={strokeWidth * 0.75} />
    <Circle cx="5" cy="19" r="2" stroke={color} strokeWidth={strokeWidth * 0.75} />
  </Svg>
);

// 右箭头图标
export const ChevronRightIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18l6-6-6-6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 左箭头图标
export const ChevronLeftIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 上箭头图标
export const ChevronUpIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 15l-6-6-6 6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 下箭头图标
export const ChevronDownIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9l6 6 6-6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Close/X icon
export const CloseIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Alias for CloseIcon
export const XIcon = CloseIcon;

// 勾选图标
export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M20 6L9 17l-5-5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 播放图标
export const PlayIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 3l14 9-14 9V3z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 暂停图标
export const PauseIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="6" y="4" width="4" height="16" rx="1" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="14" y="4" width="4" height="16" rx="1" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

// 洗牌图标
export const ShuffleIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 刷新图标
export const RefreshIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 4v6h6M23 20v-6h-6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 设置图标
export const SettingsIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 用户图标
export const UserIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

// 星星图标 - 收藏
export const StarIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 心形图标 - 喜欢
export const HeartIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 分享图标
export const ShareIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </Svg>
);

// 信息图标
export const InfoIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M12 16v-4M12 8h.01"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 问号图标
export const HelpIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 17h.01"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 眼睛图标 - 查看
export const EyeIcon: React.FC<IconProps> = ({ size = 24, color = '#D4AF37', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

// 锁图标 - 锁定
export const LockIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="11"
      width="18"
      height="11"
      rx="2"
      ry="2"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <Path
      d="M7 11V7a5 5 0 0110 0v4"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 解锁图标
export const UnlockIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="11"
      width="18"
      height="11"
      rx="2"
      ry="2"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <Path
      d="M7 11V7a5 5 0 019.9-1"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 日历图标
export const CalendarIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <Path
      d="M16 2v4M8 2v4M3 10h18"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 奖章图标 - 成就
export const AwardIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="6" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 闪电图标 - 快速/能量
export const ZapIcon: React.FC<IconProps> = ({ size = 24, color = '#D4AF37', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 目标图标
export const TargetIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

// 趋势上升图标
export const TrendingUpIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline
      points="23 6 13.5 15.5 8.5 10.5 1 18"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polyline
      points="17 6 23 6 23 12"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 图层图标
export const LayersIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L2 7l10 5 10-5-10-5z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 17l10 5 10-5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 12l10 5 10-5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 网格图标 - 百科
export const GridIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);

// 列表图标
export const ListIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line
      x1="8"
      y1="6"
      x2="21"
      y2="6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="8"
      y1="12"
      x2="21"
      y2="12"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="8"
      y1="18"
      x2="21"
      y2="18"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Circle cx="4" cy="6" r="1" fill={color} />
    <Circle cx="4" cy="12" r="1" fill={color} />
    <Circle cx="4" cy="18" r="1" fill={color} />
  </Svg>
);

// 笔记本图标 - 日记
export const BookmarkIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 编辑图标
export const EditIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 垃圾桶图标
export const TrashIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="10"
      y1="11"
      x2="10"
      y2="17"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="14"
      y1="11"
      x2="14"
      y2="17"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

// 月亮图标 - 神秘
export const MoonIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 太阳图标
export const SunIcon: React.FC<IconProps> = ({ size = 24, color = '#D4AF37', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="5" stroke={color} strokeWidth={strokeWidth} />
    <Line
      x1="12"
      y1="1"
      x2="12"
      y2="3"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="12"
      y1="21"
      x2="12"
      y2="23"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="4.22"
      y1="4.22"
      x2="5.64"
      y2="5.64"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="18.36"
      y1="18.36"
      x2="19.78"
      y2="19.78"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="1"
      y1="12"
      x2="3"
      y2="12"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="21"
      y1="12"
      x2="23"
      y2="12"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="4.22"
      y1="19.78"
      x2="5.64"
      y2="18.36"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="18.36"
      y1="5.64"
      x2="19.78"
      y2="4.22"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

// 主页图标
export const HomeIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 22V12h6v10"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 加号图标
export const PlusIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

// 减号图标
export const MinusIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

// 多星闪烁图标 - 魔法/特殊 (SparklesIcon - 复数)
export const SparklesIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3L13.2 7.8L18 9L13.2 10.2L12 15L10.8 10.2L6 9L10.8 7.8L12 3Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <Path
      d="M5 16L5.6 18.4L8 19L5.6 19.6L5 22L4.4 19.6L2 19L4.4 18.4L5 16Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.75}
      strokeLinejoin="round"
    />
    <Path
      d="M19 14L19.6 16.4L22 17L19.6 17.6L19 20L18.4 17.6L16 17L18.4 16.4L19 14Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.75}
      strokeLinejoin="round"
    />
  </Svg>
);

// 水晶球图标 - 占卜/预测
export const CrystalBallIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="10" r="7" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M8 20h8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Path d="M10 17h4v3h-4z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <Path
      d="M9 8c1.5-1.5 4-1.5 5.5 0"
      stroke={color}
      strokeWidth={strokeWidth * 0.75}
      strokeLinecap="round"
    />
  </Svg>
);

// 警告图标
export const AlertIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="12"
      y1="9"
      x2="12"
      y2="13"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1="12"
      y1="17"
      x2="12.01"
      y2="17"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);

// 幼苗图标 - 成长/入门
export const SeedlingIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 22V12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Path
      d="M12 12c0-4.5-4-6-6-6 0 3 1.5 6 6 6z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 8c0-4-3.5-5-5-5 0 2.5 1.5 5 5 5z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 12c0-4.5 4-6 6-6 0 3-1.5 6-6 6z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 火焰图标 - 火元素
export const FlameIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#EF4444',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22c4.97 0 9-4.03 9-9 0-2.39-.94-4.68-2.64-6.36C16.64 5.06 14.97 2 12 2c0 3-2.5 5-5 7 0 1.5.5 3 1.5 4.5C7.09 13.91 6 15.31 6 17c0 3 2.69 5 6 5z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 22c-1.66 0-3-1.34-3-3 0-1.09.59-2.04 1.47-2.55C11.1 16.1 12 15.5 12 14c0 .5 2 2 2 4.5 0 1.93-1.57 3.5-2 3.5z"
      stroke={color}
      strokeWidth={strokeWidth * 0.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 水滴图标 - 水元素
export const DropletIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#22D3EE',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 风图标 - 风元素
export const WindIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#94A3B8',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 山图标 - 土元素
export const MountainIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#10B981',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 3l4 8 5-5 5 15H2L8 3z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 搜索图标
export const SearchIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#D4AF37',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth={strokeWidth} />
    <Path
      d="M21 21l-4.35-4.35"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
