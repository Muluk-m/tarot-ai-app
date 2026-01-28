import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { TarotCardDisplay } from '@/components/tarot/TarotCardDisplay';
import { useReadingStore } from '@/stores/readingStore';
import { useCardStore } from '@/stores/cardStore';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';

/**
 * Result Screen
 * Displays AI-generated interpretation with typewriter effect
 *
 * Flow:
 * 1. Get drawn cards from cardStore
 * 2. Call generateReading from readingStore (starts streaming)
 * 3. Display streaming text with typewriter effect
 * 4. When complete, save to history automatically
 * 5. Provide option to return home or view history
 */

export default function Result() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const { spreadType, drawnCards } = useCardStore();
  const {
    currentReading,
    isGenerating,
    streamingText,
    error,
    generateReading
  } = useReadingStore();

  const positions = spreadType === 'three' ? (['past', 'present', 'future'] as const) : undefined;

  useEffect(() => {
    // Start generating reading when component mounts
    if (drawnCards.length > 0 && !isGenerating) {
      generateReading(spreadType, drawnCards);
    }
  }, []);

  // Auto-scroll as text appears
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
    <View style={styles.container}>
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
        <View style={styles.header}>
          <Text style={styles.title}>Your Vision</Text>
          <Text style={styles.subtitle}>
            {spreadType === 'single' ? '🌟 Daily Celestial Guidance' : '✨ The Tri-Realm Revelation'}
          </Text>
        </View>

        {/* Cards Display */}
        <View style={styles.cardsContainer}>
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

        {/* Interpretation Section */}
        <LinearGradient
          colors={[colors.accent.gold + '15', colors.accent.purple + '10']}
          style={styles.interpretationContainer}
        >
          <View style={styles.interpretationHeader}>
            <Text style={styles.interpretationTitle}>✨ Celestial Interpretation</Text>
          </View>

          {/* Loading State */}
          {isGenerating && streamingText === '' && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.accent.gold} />
              <Text style={styles.loadingText}>Gazing into the celestial realm...</Text>
              <Text style={styles.loadingSubtext}>Channeling cosmic wisdom...</Text>
            </View>
          )}

          {/* Streaming Text with Markdown Rendering */}
          {streamingText && (
            <ScrollView
              style={styles.markdownScrollContainer}
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
            >
              <Markdown style={markdownStyles}>
                {streamingText}
              </Markdown>

              {/* Blinking cursor during generation */}
              {isGenerating && (
                <Text style={styles.cursor}>|</Text>
              )}
            </ScrollView>
          )}

          {/* Error State */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleRetry}
                activeOpacity={0.8}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Completion indicator */}
          {!isGenerating && currentReading && (
            <View style={styles.completionBadge}>
              <Text style={styles.completionText}>✓ Vision Received</Text>
            </View>
          )}
        </LinearGradient>

        {/* Action Buttons */}
        {!isGenerating && currentReading && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleReturnHome}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.accent.gold, colors.accent.goldLight]}
                style={styles.primaryButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>✨ New Vision</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleViewHistory}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[colors.accent.purple + '20', colors.accent.purple + '10']}
                style={styles.secondaryButtonGradient}
              >
                <Text style={styles.secondaryButtonText}>📖 Past Visions</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          This reading is for entertainment and self-reflection purposes only.
        </Text>
      </ScrollView>

      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
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
    paddingTop: spacing.xxxl + spacing.lg,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.accent.gold,
    marginBottom: spacing.sm,
    letterSpacing: 1,
    textShadowColor: colors.accent.gold + '40',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 15,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xs,
  },
  interpretationContainer: {
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.accent.gold + '40',
    ...shadows.lg,
    marginBottom: spacing.xl,
  },
  interpretationHeader: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent.gold + '30',
  },
  interpretationTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.accent.gold,
    letterSpacing: 0.5,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 16,
    fontStyle: 'italic',
  },
  loadingSubtext: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: 8,
    opacity: 0.7,
  },
  textContainer: {
    minHeight: 200,
  },
  markdownScrollContainer: {
    maxHeight: 400, // Fixed height for scrolling
    minHeight: 200,
  },
  interpretationText: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.text.primary,
    letterSpacing: 0.3,
  },
  cursor: {
    fontSize: 16,
    color: colors.accent.gold,
    fontWeight: '700',
    marginLeft: 2,
    opacity: 1,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.accent.gold,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.background.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  completionBadge: {
    alignSelf: 'center',
    backgroundColor: colors.accent.purple + '30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  completionText: {
    color: colors.accent.purple,
    fontSize: 12,
    fontWeight: '600',
  },
  actionsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  primaryButtonGradient: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.background.primary,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.accent.purple + '40',
    ...shadows.md,
  },
  secondaryButtonGradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.accent.purple,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 11,
    color: colors.text.quaternary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.tertiary + 'CC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent.gold + '40',
  },
  backButtonText: {
    color: colors.accent.gold,
    fontSize: 14,
    fontWeight: '600',
  },
});

// Markdown styles for rich text rendering
const markdownStyles = StyleSheet.create({
  body: {
    color: colors.text.primary,
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  heading1: {
    color: colors.accent.gold,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  heading2: {
    color: colors.accent.gold,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  heading3: {
    color: colors.accent.purple,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
  },
  paragraph: {
    color: colors.text.primary,
    fontSize: 16,
    lineHeight: 26,
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
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 6,
  },
  bullet_list_icon: {
    color: colors.accent.gold,
    fontSize: 16,
    marginRight: 8,
  },
  code_inline: {
    backgroundColor: colors.background.tertiary,
    color: colors.accent.purple,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  code_block: {
    backgroundColor: colors.background.tertiary,
    color: colors.text.primary,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  blockquote: {
    backgroundColor: colors.background.tertiary + '80',
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.gold,
    paddingLeft: 12,
    paddingVertical: 8,
    marginVertical: 8,
    fontStyle: 'italic',
  },
  hr: {
    backgroundColor: colors.accent.gold + '40',
    height: 1,
    marginVertical: 16,
  },
  link: {
    color: colors.accent.purple,
    textDecorationLine: 'underline',
  },
});
