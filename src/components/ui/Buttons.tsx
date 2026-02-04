/**
 * Reusable Button Components
 * 统一的按钮组件库
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { responsive } from './Layout';

// 按钮变体
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

// 按钮尺寸
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

// 尺寸配置
const SIZE_CONFIG: Record<
  ButtonSize,
  { paddingH: number; paddingV: number; fontSize: number; iconSize: number; borderRadius: number }
> = {
  sm: { paddingH: 12, paddingV: 8, fontSize: 13, iconSize: 16, borderRadius: 8 },
  md: { paddingH: 16, paddingV: 12, fontSize: 14, iconSize: 18, borderRadius: 10 },
  lg: { paddingH: 20, paddingV: 14, fontSize: 15, iconSize: 20, borderRadius: 12 },
  xl: { paddingH: 24, paddingV: 16, fontSize: 16, iconSize: 22, borderRadius: 14 },
};

// 变体配置
const getVariantStyles = (variant: ButtonVariant, disabled: boolean) => {
  const opacity = disabled ? 0.5 : 1;

  switch (variant) {
    case 'primary':
      return {
        gradient: ['#D4AF37', '#B8962F'],
        textColor: '#0A0E1A',
        borderColor: 'transparent',
        opacity,
      };
    case 'secondary':
      return {
        gradient: ['rgba(212, 175, 55, 0.2)', 'rgba(212, 175, 55, 0.1)'],
        textColor: '#D4AF37',
        borderColor: 'rgba(212, 175, 55, 0.3)',
        opacity,
      };
    case 'outline':
      return {
        gradient: ['transparent', 'transparent'],
        textColor: '#D4AF37',
        borderColor: 'rgba(212, 175, 55, 0.5)',
        opacity,
      };
    case 'ghost':
      return {
        gradient: ['transparent', 'transparent'],
        textColor: '#F8FAFC',
        borderColor: 'transparent',
        opacity,
      };
    case 'danger':
      return {
        gradient: ['#EF4444', '#DC2626'],
        textColor: '#FFFFFF',
        borderColor: 'transparent',
        opacity,
      };
  }
};

/**
 * 主按钮组件
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const sizeConfig = SIZE_CONFIG[size];
  const variantStyles = getVariantStyles(variant, disabled || loading);

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyles.textColor}
          style={{ marginRight: title ? 8 : 0 }}
        />
      ) : (
        icon && iconPosition === 'left' && <View style={{ marginRight: 8 }}>{icon}</View>
      )}
      <Text
        style={[
          styles.buttonText,
          {
            fontSize: responsive.fontSize(sizeConfig.fontSize, sizeConfig.fontSize + 2),
            color: variantStyles.textColor,
          },
          textStyle,
        ]}>
        {title}
      </Text>
      {!loading && icon && iconPosition === 'right' && (
        <View style={{ marginLeft: 8 }}>{icon}</View>
      )}
    </>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={disabled || loading ? undefined : onPress}
      disabled={disabled || loading}
      style={[fullWidth && { width: '100%' }, { opacity: variantStyles.opacity }, style]}>
      <LinearGradient
        colors={variantStyles.gradient}
        style={[
          styles.button,
          {
            paddingHorizontal: responsive.spacing(sizeConfig.paddingH, sizeConfig.paddingH + 4),
            paddingVertical: responsive.spacing(sizeConfig.paddingV, sizeConfig.paddingV + 2),
            borderRadius: sizeConfig.borderRadius,
            borderWidth: variantStyles.borderColor !== 'transparent' ? 1 : 0,
            borderColor: variantStyles.borderColor,
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        {content}
      </LinearGradient>
    </TouchableOpacity>
  );
};

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'ghost';
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

const ICON_BUTTON_SIZES = {
  sm: 32,
  md: 40,
  lg: 48,
};

/**
 * 图标按钮
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 'md',
  variant = 'ghost',
  color = colors.accent.gold,
  backgroundColor,
  disabled = false,
  style,
}) => {
  const buttonSize = responsive.width(ICON_BUTTON_SIZES[size], ICON_BUTTON_SIZES[size] + 8);

  const getBgColor = () => {
    if (backgroundColor) return backgroundColor;
    switch (variant) {
      case 'filled':
        return 'rgba(212, 175, 55, 0.15)';
      case 'outlined':
        return 'transparent';
      case 'ghost':
        return 'transparent';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[
        styles.iconButton,
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: getBgColor(),
          borderWidth: variant === 'outlined' ? 1 : 0,
          borderColor: 'rgba(212, 175, 55, 0.3)',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}>
      {icon}
    </TouchableOpacity>
  );
};

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * 选择芯片
 */
export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  icon,
  disabled = false,
  style,
}) => {
  const content = (
    <View
      style={[
        styles.chip,
        selected && styles.chipSelected,
        disabled && styles.chipDisabled,
        style,
      ]}>
      {icon && <View style={{ marginRight: 6 }}>{icon}</View>}
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={disabled ? undefined : onPress}
        disabled={disabled}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

/**
 * 浮动操作按钮
 */
export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onPress,
  label,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[styles.fab, disabled && styles.fabDisabled, style]}>
      <LinearGradient
        colors={['#D4AF37', '#B8962F']}
        style={[styles.fabGradient, label && styles.fabExtended]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        {icon}
        {label && <Text style={styles.fabLabel}>{label}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },

  // Icon Button
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Chip
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing(12, 16),
    paddingVertical: responsive.spacing(8, 10),
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  chipSelected: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  chipDisabled: {
    opacity: 0.5,
  },
  chipText: {
    fontSize: responsive.fontSize(13, 15),
    color: colors.text.secondary,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: colors.accent.gold,
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: responsive.spacing(24, 32),
    right: responsive.spacing(24, 32),
    elevation: 8,
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabDisabled: {
    opacity: 0.5,
  },
  fabGradient: {
    width: responsive.width(56, 64),
    height: responsive.width(56, 64),
    borderRadius: responsive.width(28, 32),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fabExtended: {
    width: 'auto',
    paddingHorizontal: responsive.spacing(20, 24),
  },
  fabLabel: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
    color: '#0A0E1A',
    marginLeft: 8,
  },
});

export default {
  Button,
  IconButton,
  Chip,
  FloatingActionButton,
};
