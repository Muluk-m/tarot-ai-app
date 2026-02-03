/**
 * Spread Selection Screen - 牌阵选择
 * iPad 和 iOS 适配
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useCardStore } from '@/stores/cardStore';
import { useReadingStore } from '@/stores/readingStore';
import { SPREADS } from '@/data/spreads';
import { colors } from '@/theme/colors';

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  isTablet,
  StarIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Badge,
} from '@/components/ui';
import { IconButton } from '@/components/ui/Buttons';

type SpreadKey = 'single' | 'three';

interface SpreadOption {
  key: SpreadKey;
  config: typeof SPREADS.single;
  Icon: React.FC<{ size?: number; color?: string }>;
  primaryColor: string;
  bgColor: string;
}

export default function SpreadSelection() {
  const router = useRouter();
  const { setSpreadType } = useCardStore();
  const { clearCurrentReading } = useReadingStore();

  const handleSelectSpread = (spreadKey: SpreadKey) => {
    clearCurrentReading();
    setSpreadType(spreadKey);
    router.push('/(reading)/shuffle');
  };

  const spreadOptions: SpreadOption[] = [
    {
      key: 'single',
      config: SPREADS.single,
      Icon: StarIcon,
      primaryColor: '#D4AF37',
      bgColor: 'rgba(212, 175, 55, 0.1)',
    },
    {
      key: 'three',
      config: SPREADS.three,
      Icon: SparklesIcon,
      primaryColor: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
  ];

  return (
    <ScreenContainer>
      <SafeScrollView maxWidth="md">
        {/* Header */}
        <Row justify="space-between" align="center" style={styles.header}>
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />
          <Text style={styles.headerTitle}>选择牌阵</Text>
          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Select Your Spread</Text>
          <Text style={styles.subtitle}>
            Choose a reading type to begin your journey
          </Text>
        </View>

        {/* Unlimited Badge */}
        <View style={styles.unlimitedBadge}>
          <SparklesIcon size={16} color="#D4AF37" />
          <Text style={styles.unlimitedText}>Unlimited Readings</Text>
        </View>

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Spread Options */}
        <View style={[styles.optionsContainer, isTablet && styles.optionsContainerTablet]}>
          {spreadOptions.map((option) => (
            <Pressable
              key={option.key}
              onPress={() => handleSelectSpread(option.key)}
              style={({ pressed }) => [
                styles.optionCard,
                isTablet && styles.optionCardTablet,
                {
                  backgroundColor: option.bgColor,
                  borderColor: pressed
                    ? option.primaryColor
                    : `${option.primaryColor}40`,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              {/* Icon */}
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${option.primaryColor}20` },
                ]}
              >
                <option.Icon
                  size={responsive.width(36, 44)}
                  color={option.primaryColor}
                />
              </View>

              {/* Title */}
              <Text style={[styles.optionTitle, { color: option.primaryColor }]}>
                {option.config.name}
              </Text>

              {/* Description */}
              <Text style={styles.optionDescription}>
                {option.config.description}
              </Text>

              {/* Card Count Badge */}
              <Badge
                text={`${option.config.cardCount} ${option.config.cardCount === 1 ? 'Card' : 'Cards'}`}
                theme={option.key === 'single' ? 'gold' : 'purple'}
              />

              {/* Arrow Indicator */}
              <View
                style={[
                  styles.arrowContainer,
                  { backgroundColor: `${option.primaryColor}15` },
                ]}
              >
                <ChevronRightIcon size={20} color={option.primaryColor} />
              </View>
            </Pressable>
          ))}
        </View>

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>For entertainment purposes only</Text>

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
    fontSize: responsive.fontSize(18, 20),
    fontWeight: '600',
    color: colors.text.primary,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: responsive.spacing(16, 20),
  },
  title: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: responsive.spacing(8, 12),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: responsive.fontSize(20, 24),
  },
  unlimitedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    paddingHorizontal: responsive.spacing(16, 20),
    paddingVertical: responsive.spacing(10, 12),
    borderRadius: responsive.width(20, 24),
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    gap: responsive.spacing(8, 10),
  },
  unlimitedText: {
    color: colors.accent.gold,
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  optionsContainer: {
    gap: responsive.spacing(16, 20),
  },
  optionsContainerTablet: {
    flexDirection: 'row',
  },
  optionCard: {
    flex: isTablet ? 1 : undefined,
    borderRadius: responsive.width(20, 24),
    padding: responsive.spacing(24, 32),
    borderWidth: 2,
    alignItems: 'center',
  },
  optionCardTablet: {
    minHeight: 280,
    justifyContent: 'center',
  },
  iconContainer: {
    width: responsive.width(72, 88),
    height: responsive.width(72, 88),
    borderRadius: responsive.width(36, 44),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(16, 20),
  },
  optionTitle: {
    fontSize: responsive.fontSize(22, 26),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: responsive.spacing(8, 12),
    letterSpacing: 0.3,
  },
  optionDescription: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: responsive.spacing(16, 20),
    lineHeight: responsive.fontSize(20, 24),
    maxWidth: 260,
  },
  arrowContainer: {
    position: 'absolute',
    right: responsive.spacing(16, 20),
    top: '50%',
    marginTop: -16,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: {
    color: colors.text.tertiary,
    fontSize: responsive.fontSize(12, 14),
    textAlign: 'center',
    opacity: 0.6,
  },
});
