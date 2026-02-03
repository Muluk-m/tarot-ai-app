/**
 * Draw Screen - 抽卡
 * iPad 和 iOS 适配
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { CardDrawInteraction } from '@/components/reading/CardDrawInteraction';
import { useCardStore } from '@/stores/cardStore';
import { useReadingStore } from '@/stores/readingStore';
import { useUserStore } from '@/stores/userStore';
import type { TarotCard } from '@/types/tarot.types';
import { colors } from '@/theme/colors';
import { v4 as uuidv4 } from '@/utils/uuid';

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  isTablet,
  ChevronLeftIcon,
  SparklesIcon,
  ChevronRightIcon,
} from '@/components/ui';
import { IconButton } from '@/components/ui/Buttons';

export default function Draw() {
  const router = useRouter();
  const { deck, spreadType, drawCards } = useCardStore();
  const { setCurrentReading } = useReadingStore();
  const { incrementDailyUsage, incrementTotalReadings } = useUserStore();

  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());

  const cardCount = spreadType === 'single' ? 1 : 3;
  const positions = spreadType === 'three' ? (['past', 'present', 'future'] as const) : undefined;

  useEffect(() => {
    drawCards(cardCount);
    const cards = deck.slice(0, cardCount);
    setDrawnCards(cards);
  }, []);

  const handleCardReveal = (card: TarotCard) => {
    const cardIndex = drawnCards.findIndex((c) => c.id === card.id);
    if (cardIndex !== -1) {
      setRevealedCards((prev) => new Set(prev).add(cardIndex));
    }
  };

  const allCardsRevealed = revealedCards.size === drawnCards.length && drawnCards.length > 0;

  const handleGetReading = () => {
    const reading = {
      id: uuidv4(),
      timestamp: Date.now(),
      dateFormatted: new Date().toLocaleString(),
      spreadType,
      cards: drawnCards.map((card, index) => ({
        card,
        position: positions ? positions[index] : undefined,
      })),
      interpretation: '',
    };

    setCurrentReading(reading);
    incrementDailyUsage();
    incrementTotalReadings();

    router.push('/(reading)/result');
  };

  return (
    <ScreenContainer>
      <SafeScrollView maxWidth="lg">
        {/* Header */}
        <Row justify="space-between" align="center" style={styles.header}>
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />
          <Text style={styles.headerTitle}>抽取卡牌</Text>
          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Draw Your Cards</Text>
          <Text style={styles.subtitle}>
            {spreadType === 'single'
              ? 'Tap the card to reveal your guidance'
              : 'Tap each card to reveal your reading'}
          </Text>
        </View>

        <Spacer size={responsive.spacing(24, 36)} />

        {/* Cards Container */}
        <View style={[styles.cardsContainer, isTablet && styles.cardsContainerTablet]}>
          {drawnCards.map((card, index) => (
            <CardDrawInteraction
              key={card.id}
              card={card}
              position={positions?.[index]}
              size={spreadType === 'single' ? 'large' : 'medium'}
              onReveal={handleCardReveal}
            />
          ))}
        </View>

        {/* Progress Indicator */}
        {!allCardsRevealed && drawnCards.length > 0 && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {revealedCards.size} / {drawnCards.length} cards revealed
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(revealedCards.size / drawnCards.length) * 100}%` },
                ]}
              />
            </View>
          </View>
        )}

        {/* Get Reading Button */}
        {allCardsRevealed && (
          <View style={styles.actionContainer}>
            <Pressable
              onPress={handleGetReading}
              style={({ pressed }) => [
                styles.getReadingButton,
                pressed && styles.getReadingButtonPressed,
              ]}
            >
              <LinearGradient
                colors={[colors.accent.gold, colors.accent.goldLight]}
                style={styles.getReadingButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Row align="center" gap={responsive.spacing(10, 14)}>
                  <SparklesIcon size={responsive.width(20, 24)} color={colors.background.primary} />
                  <Text style={styles.getReadingButtonText}>Get AI Reading</Text>
                  <View style={styles.buttonArrow}>
                    <ChevronRightIcon size={18} color={colors.background.primary} />
                  </View>
                </Row>
              </LinearGradient>
            </Pressable>

            <Text style={styles.actionHint}>
              Your personalized interpretation awaits...
            </Text>
          </View>
        )}

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
  },
  title: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: responsive.spacing(8, 12),
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: responsive.fontSize(20, 24),
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: responsive.spacing(20, 32),
    marginBottom: responsive.spacing(24, 36),
  },
  cardsContainerTablet: {
    gap: responsive.spacing(32, 48),
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: responsive.spacing(24, 32),
    paddingHorizontal: responsive.spacing(24, 48),
  },
  progressText: {
    color: colors.text.tertiary,
    fontSize: responsive.fontSize(14, 16),
    fontStyle: 'italic',
    marginBottom: responsive.spacing(12, 16),
  },
  progressBar: {
    width: '100%',
    maxWidth: 200,
    height: 4,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: 2,
  },
  actionContainer: {
    alignItems: 'center',
  },
  getReadingButton: {
    borderRadius: responsive.width(16, 20),
    overflow: 'hidden',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    minWidth: responsive.width(260, 320),
  },
  getReadingButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  getReadingButtonGradient: {
    paddingVertical: responsive.spacing(16, 20),
    paddingHorizontal: responsive.spacing(28, 36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  getReadingButtonText: {
    color: colors.background.primary,
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonArrow: {
    width: responsive.width(28, 34),
    height: responsive.width(28, 34),
    borderRadius: responsive.width(14, 17),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionHint: {
    color: colors.text.secondary,
    fontSize: responsive.fontSize(12, 14),
    marginTop: responsive.spacing(12, 16),
    fontStyle: 'italic',
    opacity: 0.8,
  },
});
