import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { TarotCardDisplay } from '@/components/tarot/TarotCardDisplay';
import { useReadingStore } from '@/stores/readingStore';
import { useCardStore } from '@/stores/cardStore';
import { colors } from '@/theme/colors';

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
    console.log('🎴 [Result] Component mounted');
    console.log('🎴 [Result] drawnCards length:', drawnCards.length);
    console.log('🎴 [Result] drawnCards:', drawnCards.map(c => c.name));
    console.log('🎴 [Result] currentReading before clear:', currentReading ? 'exists' : 'null');
    console.log('🎴 [Result] isGenerating:', isGenerating);
    console.log('🎴 [Result] spreadType:', spreadType);

    // IMPORTANT: Always clear any existing reading first to ensure fresh generation
    if (currentReading) {
      console.log('🎴 [Result] ⚠️ Found existing reading, clearing it now...');
    }

    // Start generating reading when component mounts
    if (drawnCards.length > 0 && !isGenerating) {
      console.log('🎴 [Result] ✅ Conditions met, calling generateReading...');
      generateReading(spreadType, drawnCards);
    } else {
      console.log('🎴 [Result] ❌ Conditions NOT met:');
      console.log('  - drawnCards.length > 0:', drawnCards.length > 0);
      console.log('  - !isGenerating:', !isGenerating);
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
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Reading</Text>
          <Text style={styles.subtitle}>
            {spreadType === 'single' ? 'Daily Card Guidance' : 'Past, Present & Future'}
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
        <View style={styles.interpretationContainer}>
          <View style={styles.interpretationHeader}>
            <Text style={styles.interpretationTitle}>✨ AI Interpretation</Text>
          </View>

          {/* Loading State */}
          {isGenerating && streamingText === '' && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.accent.gold} />
              <Text style={styles.loadingText}>Consulting the cosmos...</Text>
              <Text style={styles.loadingSubtext}>Channeling mystical energies...</Text>
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
              <Text style={styles.completionText}>✓ Reading Complete</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        {!isGenerating && currentReading && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleReturnHome}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>✨ New Reading</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleViewHistory}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>View History</Text>
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
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  interpretationContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.accent.gold + '40',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
  },
  interpretationHeader: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent.gold + '30',
  },
  interpretationTitle: {
    fontSize: 20,
    fontWeight: '600',
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
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: colors.accent.gold,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  primaryButtonText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.background.tertiary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent.purple,
  },
  secondaryButtonText: {
    color: colors.accent.purple,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 11,
    color: colors.text.tertiary,
    textAlign: 'center',
    opacity: 0.6,
    fontStyle: 'italic',
    marginTop: 8,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.background.tertiary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent.gold,
    opacity: 0.7,
  },
  backButtonText: {
    color: colors.accent.gold,
    fontSize: 14,
    fontWeight: '500',
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
