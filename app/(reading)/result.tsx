/**
 * Result Screen - AI 解读结果
 * iPad 和 iOS 适配
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { TarotCardDisplay } from '@/components/tarot/TarotCardDisplay';
import { useReadingStore } from '@/stores/readingStore';
import { useCardStore } from '@/stores/cardStore';
import { colors } from '@/theme/colors';

// UI Components
import {
  ScreenContainer,
  Row,
  Spacer,
  responsive,
  isTablet,
  ChevronLeftIcon,
  SparklesIcon,
  StarIcon,
  BookIcon,
  CheckIcon,
  AlertIcon,
  RefreshIcon,
} from '@/components/ui';
import { IconButton } from '@/components/ui/Buttons';

export default function Result() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const { spreadType, drawnCards } = useCardStore();
  const {
    currentReading,
    isGenerating,
    streamingText,
    error,
    generateReading,
  } = useReadingStore();

  const positions = spreadType === 'three' ? (['past', 'present', 'future'] as const) : undefined;

  useEffect(() => {
    if (drawnCards.length > 0 && !isGenerating) {
      generateReading(spreadType, drawnCards);
    }
  }, []);

  useEffect(() => {
    if (streamingText && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [streamingText]);

  const handleReturnHome = () => {
    router.push('/');
  };

  const handleViewHistory = () => {
    router.push('/history');
  };

  const handleRetry = () => {
    generateReading(spreadType, drawnCards);
  };

  return (
    <ScreenContainer>
      {/* Aurora Background Gradient */}
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#2E1A47', '#1E2638']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Row justify="space-between" align="center" style={styles.header}>
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />
          <Text style={styles.headerTitle}>解读结果</Text>
          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>你的命运</Text>
          <Row align="center" gap={8}>
            {spreadType === 'single' ? (
              <StarIcon size={18} color={colors.accent.gold} />
            ) : (
              <SparklesIcon size={18} color={colors.accent.gold} />
            )}
            <Text style={styles.subtitle}>
              {spreadType === 'single' ? '每日星象指引' : '三界启示录'}
            </Text>
          </Row>
        </View>

        <Spacer size={responsive.spacing(20, 28)} />

        {/* Cards Display */}
        <View style={[styles.cardsContainer, isTablet && styles.cardsContainerTablet]}>
          {drawnCards.map((card, index) => (
            <TarotCardDisplay
              key={card.id}
              card={card}
              size={spreadType === 'single' ? 'large' : 'medium'}
              showName={true}
              showPosition={spreadType === 'three'}
              position={positions?.[index]}
              glowEffect={true}
            />
          ))}
        </View>

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Interpretation Section */}
        <View style={styles.interpretationContainer}>
          <LinearGradient
            colors={['rgba(212, 175, 55, 0.08)', 'rgba(139, 92, 246, 0.05)']}
            style={styles.interpretationGradient}
          />

          {/* Interpretation Header */}
          <Row align="center" gap={10} style={styles.interpretationHeader}>
            <SparklesIcon size={22} color={colors.accent.gold} />
            <Text style={styles.interpretationTitle}>星象解读</Text>
          </Row>

          {/* Loading State */}
          {isGenerating && streamingText === '' && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.accent.gold} />
              <Spacer size={16} />
              <Text style={styles.loadingText}>正在凝视星象...</Text>
              <Text style={styles.loadingSubtext}>引导宇宙智慧...</Text>
            </View>
          )}

          {/* Streaming Text with Markdown Rendering */}
          {streamingText && (
            <View style={styles.markdownContainer}>
              <Markdown style={markdownStyles}>{streamingText}</Markdown>
              {isGenerating && <Text style={styles.cursor}>|</Text>}
            </View>
          )}

          {/* Error State */}
          {error && (
            <View style={styles.errorContainer}>
              <AlertIcon size={48} color={colors.error} />
              <Spacer size={16} />
              <Text style={styles.errorText}>{error}</Text>
              <Spacer size={16} />
              <Pressable
                onPress={handleRetry}
                style={({ pressed }) => [
                  styles.retryButton,
                  pressed && styles.retryButtonPressed,
                ]}
              >
                <Row align="center" gap={8}>
                  <RefreshIcon size={18} color={colors.background.primary} />
                  <Text style={styles.retryButtonText}>重试</Text>
                </Row>
              </Pressable>
            </View>
          )}

          {/* Completion Badge */}
          {!isGenerating && currentReading && (
            <View style={styles.completionBadge}>
              <Row align="center" gap={6}>
                <CheckIcon size={14} color={colors.accent.purple} />
                <Text style={styles.completionText}>解读完成</Text>
              </Row>
            </View>
          )}
        </View>

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Action Buttons */}
        {!isGenerating && currentReading && (
          <View style={styles.actionsContainer}>
            {/* Primary Button - New Vision */}
            <Pressable
              onPress={handleReturnHome}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}
            >
              <LinearGradient
                colors={[colors.accent.gold, colors.accent.goldLight]}
                style={styles.primaryButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Row align="center" gap={10}>
                  <SparklesIcon size={20} color={colors.background.primary} />
                  <Text style={styles.primaryButtonText}>新的解读</Text>
                </Row>
              </LinearGradient>
            </Pressable>

            <Spacer size={responsive.spacing(12, 16)} />

            {/* Secondary Button - Past Visions */}
            <Pressable
              onPress={handleViewHistory}
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.secondaryButtonPressed,
              ]}
            >
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.15)', 'rgba(139, 92, 246, 0.08)']}
                style={styles.secondaryButtonGradient}
              >
                <Row align="center" gap={10}>
                  <BookIcon size={20} color={colors.accent.purple} />
                  <Text style={styles.secondaryButtonText}>历史记录</Text>
                </Row>
              </LinearGradient>
            </Pressable>
          </View>
        )}

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          本解读仅供娱乐和自我反思参考。
        </Text>

        <Spacer size={responsive.spacing(32, 48)} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    paddingHorizontal: responsive.spacing(20, 32),
    paddingTop: responsive.spacing(16, 24),
    paddingBottom: responsive.spacing(24, 40),
  },
  header: {
    marginBottom: responsive.spacing(16, 20),
  },
  headerTitle: {
    fontSize: responsive.fontSize(18, 20),
    fontWeight: '600',
    color: colors.text.primary,
  },
  titleSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: responsive.fontSize(32, 40),
    fontWeight: '800',
    color: colors.accent.gold,
    marginBottom: responsive.spacing(8, 12),
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(212, 175, 55, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: responsive.fontSize(15, 18),
    color: colors.text.secondary,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: responsive.spacing(12, 20),
  },
  cardsContainerTablet: {
    gap: responsive.spacing(24, 36),
  },
  interpretationContainer: {
    borderRadius: responsive.width(20, 24),
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    overflow: 'hidden',
    backgroundColor: 'rgba(10, 14, 26, 0.8)',
  },
  interpretationGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  interpretationHeader: {
    padding: responsive.spacing(16, 20),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.2)',
  },
  interpretationTitle: {
    fontSize: responsive.fontSize(20, 24),
    fontWeight: '700',
    color: colors.accent.gold,
    letterSpacing: 0.3,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: responsive.spacing(40, 60),
  },
  loadingText: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  loadingSubtext: {
    fontSize: responsive.fontSize(12, 14),
    color: colors.text.tertiary,
    marginTop: 8,
    opacity: 0.7,
  },
  markdownContainer: {
    padding: responsive.spacing(16, 24),
    minHeight: 200,
  },
  cursor: {
    fontSize: 16,
    color: colors.accent.gold,
    fontWeight: '700',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: responsive.spacing(40, 60),
    paddingHorizontal: responsive.spacing(20, 32),
  },
  errorText: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.error,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.accent.gold,
    paddingVertical: responsive.spacing(12, 14),
    paddingHorizontal: responsive.spacing(24, 28),
    borderRadius: responsive.width(10, 12),
  },
  retryButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  retryButtonText: {
    color: colors.background.primary,
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
  },
  completionBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: responsive.spacing(16, 20),
    paddingVertical: responsive.spacing(8, 10),
    borderRadius: responsive.width(20, 24),
    marginVertical: responsive.spacing(16, 20),
  },
  completionText: {
    color: colors.accent.purple,
    fontSize: responsive.fontSize(12, 14),
    fontWeight: '600',
  },
  actionsContainer: {
    paddingHorizontal: responsive.spacing(8, 24),
  },
  primaryButton: {
    borderRadius: responsive.width(16, 20),
    overflow: 'hidden',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonGradient: {
    paddingVertical: responsive.spacing(18, 22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.background.primary,
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderRadius: responsive.width(16, 20),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  secondaryButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  secondaryButtonGradient: {
    paddingVertical: responsive.spacing(16, 20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: colors.accent.purple,
    fontSize: responsive.fontSize(16, 20),
    fontWeight: '700',
  },
  disclaimer: {
    fontSize: responsive.fontSize(11, 13),
    color: colors.text.quaternary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: responsive.spacing(24, 48),
  },
});

// Markdown styles for rich text rendering
const markdownStyles = StyleSheet.create({
  body: {
    color: colors.text.primary,
    fontSize: responsive.fontSize(16, 18),
    lineHeight: responsive.fontSize(26, 30),
    letterSpacing: 0.3,
  },
  heading1: {
    color: colors.accent.gold,
    fontSize: responsive.fontSize(24, 28),
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  heading2: {
    color: colors.accent.gold,
    fontSize: responsive.fontSize(20, 24),
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  heading3: {
    color: colors.accent.purple,
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  paragraph: {
    color: colors.text.primary,
    fontSize: responsive.fontSize(16, 18),
    lineHeight: responsive.fontSize(26, 30),
    marginBottom: 12,
  },
  strong: {
    color: colors.accent.gold,
    fontWeight: '700',
  },
  em: {
    color: colors.accent.purple,
    fontStyle: 'italic',
  },
  bullet_list: {
    marginBottom: 12,
  },
  ordered_list: {
    marginBottom: 12,
  },
  list_item: {
    color: colors.text.primary,
    fontSize: responsive.fontSize(16, 18),
    lineHeight: responsive.fontSize(24, 28),
    marginBottom: 6,
  },
  bullet_list_icon: {
    color: colors.accent.gold,
    fontSize: responsive.fontSize(16, 18),
    marginRight: 8,
  },
  code_inline: {
    backgroundColor: colors.background.tertiary,
    color: colors.accent.purple,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: responsive.fontSize(14, 16),
    fontFamily: 'monospace',
  },
  code_block: {
    backgroundColor: colors.background.tertiary,
    color: colors.text.primary,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    fontSize: responsive.fontSize(14, 16),
    fontFamily: 'monospace',
  },
  blockquote: {
    backgroundColor: 'rgba(42, 47, 62, 0.5)',
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.gold,
    paddingLeft: 12,
    paddingVertical: 8,
    marginVertical: 8,
    fontStyle: 'italic',
  },
  hr: {
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    height: 1,
    marginVertical: 16,
  },
  link: {
    color: colors.accent.purple,
    textDecorationLine: 'underline',
  },
});
