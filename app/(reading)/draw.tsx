import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { CardDrawInteraction } from '@/components/reading/CardDrawInteraction';
import { useCardStore } from '@/stores/cardStore';
import { useReadingStore } from '@/stores/readingStore';
import { useUserStore } from '@/stores/userStore';
import type { TarotCard } from '@/types/tarot.types';
import { colors } from '@/theme/colors';
import { v4 as uuidv4 } from '@/utils/uuid';

/**
 * Draw Screen
 * User taps cards to reveal them and proceeds to AI interpretation
 *
 * Flow:
 * 1. Display card backs based on spread type
 * 2. User taps to flip and reveal cards
 * 3. All cards revealed → "Get Reading" button appears
 * 4. Create reading record and navigate to result screen
 */

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
    // Draw cards from shuffled deck
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

  const allCardsRevealed = revealedCards.size === drawnCards.length;

  const handleGetReading = () => {
    // Create reading record
    const reading = {
      id: uuidv4(),
      timestamp: Date.now(),
      dateFormatted: new Date().toLocaleString(),
      spreadType,
      cards: drawnCards.map((card, index) => ({
        card,
        position: positions ? positions[index] : undefined,
      })),
      interpretation: '', // Will be filled by AI
    };

    // Update stores
    setCurrentReading(reading);
    incrementDailyUsage();
    incrementTotalReadings();

    // Navigate to result screen
    router.push('/(reading)/result');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Draw Your Cards</Text>
          <Text style={styles.subtitle}>
            {spreadType === 'single'
              ? 'Tap the card to reveal your guidance'
              : 'Tap each card to reveal your reading'}
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
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

        {/* Progress indicator */}
        {!allCardsRevealed && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {revealedCards.size} / {drawnCards.length} cards revealed
            </Text>
          </View>
        )}

        {/* Get Reading button */}
        {allCardsRevealed && (
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.getReadingButton}
              onPress={handleGetReading}
              activeOpacity={0.8}
            >
              <Text style={styles.getReadingButtonText}>✨ Get AI Reading</Text>
            </TouchableOpacity>

            <Text style={styles.actionHint}>
              Your personalized interpretation awaits...
            </Text>
          </View>
        )}
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
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    color: colors.text.tertiary,
    fontSize: 14,
    fontStyle: 'italic',
  },
  actionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  getReadingButton: {
    backgroundColor: colors.accent.gold,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  getReadingButtonText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  actionHint: {
    color: colors.text.secondary,
    fontSize: 12,
    marginTop: 12,
    fontStyle: 'italic',
    opacity: 0.8,
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
