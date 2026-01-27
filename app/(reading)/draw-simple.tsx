import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCardStore } from '@/stores/cardStore';
import { useReadingStore } from '@/stores/readingStore';
import { useUserStore } from '@/stores/userStore';
import type { TarotCard } from '@/types/tarot.types';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DrawSimple() {
  const router = useRouter();
  const { deck, spreadType, drawCards } = useCardStore();
  const { clearCurrentReading } = useReadingStore();
  const { incrementDailyUsage, incrementTotalReadings } = useUserStore();

  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [fadeAnim] = useState(new Animated.Value(0));

  const cardCount = spreadType === 'single' ? 1 : 3;
  const positions = spreadType === 'three' ? (['past', 'present', 'future'] as const) : undefined;

  useEffect(() => {
    drawCards(cardCount);
    const cards = deck.slice(0, cardCount);
    setDrawnCards(cards);

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCardTap = (index: number) => {
    setRevealedIndices((prev) => new Set(prev).add(index));
  };

  const allCardsRevealed = revealedIndices.size === drawnCards.length;

  const handleGetReading = () => {
    try {
      clearCurrentReading();
      incrementDailyUsage();
      incrementTotalReadings();
      router.push('/(reading)/result');
    } catch (error) {
      console.error('Error navigating to result:', error);
      alert('Failed to navigate to result: ' + error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#2E1A47', '#1E2638']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.title}>
            {spreadType === 'single' ? 'Your Daily Card' : 'Your Three Cards'}
          </Text>
          <Text style={styles.subtitle}>
            {allCardsRevealed
              ? 'All cards revealed! Get your reading below'
              : 'Tap each card to reveal its wisdom'}
          </Text>

          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(revealedIndices.size / drawnCards.length) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {revealedIndices.size} / {drawnCards.length}
            </Text>
          </View>
        </Animated.View>

        {/* Cards Grid */}
        <Animated.View
          style={[
            styles.cardsContainer,
            { opacity: fadeAnim, transform: [{ scale: fadeAnim }] },
          ]}
        >
          {drawnCards.map((card, index) => {
            const isRevealed = revealedIndices.has(index);
            return (
              <TouchableOpacity
                key={card.id}
                style={[
                  styles.cardWrapper,
                  spreadType === 'single' && styles.cardWrapperSingle,
                ]}
                onPress={() => handleCardTap(index)}
                disabled={isRevealed}
                activeOpacity={0.8}
              >
                {isRevealed ? (
                  // Revealed card (front)
                  <LinearGradient
                    colors={[colors.accent.gold + '30', colors.accent.gold + '10']}
                    style={styles.cardFront}
                  >
                    <View style={styles.cardFrontContent}>
                      {/* Position label */}
                      {positions && (
                        <View style={styles.positionBadge}>
                          <Text style={styles.positionLabel}>
                            {positions[index].toUpperCase()}
                          </Text>
                        </View>
                      )}

                      {/* Card icon/symbol */}
                      <View style={styles.cardSymbol}>
                        <Text style={styles.cardSymbolText}>✨</Text>
                      </View>

                      {/* Card name */}
                      <Text style={styles.cardName}>{card.name}</Text>

                      {/* Divider */}
                      <View style={styles.cardDivider} />

                      {/* Keywords preview */}
                      <View style={styles.keywordsContainer}>
                        {card.uprightKeywords.slice(0, 3).map((keyword, i) => (
                          <View key={i} style={styles.keywordPill}>
                            <Text style={styles.keywordText}>{keyword}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </LinearGradient>
                ) : (
                  // Hidden card (back)
                  <LinearGradient
                    colors={[colors.accent.purple, colors.accent.purpleLight]}
                    style={styles.cardBack}
                  >
                    <View style={styles.cardBackContent}>
                      <Text style={styles.cardBackIcon}>🔮</Text>
                      <Text style={styles.cardBackText}>TAP TO REVEAL</Text>
                      <View style={styles.cardBackPattern}>
                        {[...Array(5)].map((_, i) => (
                          <View key={i} style={styles.cardBackLine} />
                        ))}
                      </View>
                    </View>
                  </LinearGradient>
                )}
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* Action button */}
        {allCardsRevealed && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleGetReading}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.accent.gold, colors.accent.goldLight]}
                style={styles.actionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.actionButtonText}>✨ Get AI Reading</Text>
                <View style={styles.actionButtonArrow}>
                  <Text style={styles.actionButtonArrowText}>→</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>

      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
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
    paddingTop: spacing.xxxl + spacing.xl,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.accent.gold,
    textAlign: 'center',
    marginBottom: spacing.sm,
    textShadowColor: colors.accent.gold + '40',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 15,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },

  // Progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
    maxWidth: 300,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.background.tertiary,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.accent.gold + '30',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent.gold,
    minWidth: 45,
  },

  // Cards
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  cardWrapper: {
    width: (SCREEN_WIDTH - spacing.lg * 4) / 3,
    minWidth: 100,
    aspectRatio: 0.7,
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.lg,
  },
  cardWrapperSingle: {
    width: SCREEN_WIDTH - spacing.lg * 4,
    maxWidth: 280,
  },

  // Card Back
  cardBack: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.accent.gold + '60',
  },
  cardBackContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  cardBackIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  cardBackText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },
  cardBackPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
    padding: spacing.md,
    opacity: 0.1,
  },
  cardBackLine: {
    height: 1,
    backgroundColor: colors.text.primary,
  },

  // Card Front
  cardFront: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.accent.gold + '60',
  },
  cardFrontContent: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
  },
  positionBadge: {
    backgroundColor: colors.accent.purple + '40',
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  positionLabel: {
    color: colors.accent.purple,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardSymbol: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
    ...shadows.md,
  },
  cardSymbolText: {
    fontSize: 28,
  },
  cardName: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  cardDivider: {
    width: 40,
    height: 2,
    backgroundColor: colors.accent.gold + '40',
    marginVertical: spacing.sm,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  keywordPill: {
    backgroundColor: colors.background.tertiary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent.gold + '20',
  },
  keywordText: {
    color: colors.text.tertiary,
    fontSize: 10,
    fontWeight: '600',
  },

  // Action Button
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  actionButtonText: {
    color: colors.background.primary,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  actionButtonArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonArrowText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Back Button
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
