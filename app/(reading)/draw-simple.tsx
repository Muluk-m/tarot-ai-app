import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCardStore } from '@/stores/cardStore';
import { useReadingStore } from '@/stores/readingStore';
import { useUserStore } from '@/stores/userStore';
import type { TarotCard } from '@/types/tarot.types';
import { colors } from '@/theme/colors';

export default function DrawSimple() {
  const router = useRouter();
  const { deck, spreadType, drawCards } = useCardStore();
  const { clearCurrentReading } = useReadingStore();
  const { incrementDailyUsage, incrementTotalReadings } = useUserStore();

  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  const cardCount = spreadType === 'single' ? 1 : 3;
  const positions = spreadType === 'three' ? (['past', 'present', 'future'] as const) : undefined;

  useEffect(() => {
    drawCards(cardCount);
    const cards = deck.slice(0, cardCount);
    setDrawnCards(cards);
  }, []);

  const handleCardTap = (index: number) => {
    setRevealedIndices((prev) => new Set(prev).add(index));
  };

  const allCardsRevealed = revealedIndices.size === drawnCards.length;

  const handleGetReading = () => {
    try {
      // Clear any previous reading so result.tsx will generate a new one
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Draw Your Cards</Text>
        <Text style={styles.subtitle}>Tap each card to reveal</Text>

        <View style={styles.cardsContainer}>
          {drawnCards.map((card, index) => (
            <TouchableOpacity
              key={card.id}
              style={styles.cardButton}
              onPress={() => handleCardTap(index)}
              disabled={revealedIndices.has(index)}
            >
              {revealedIndices.has(index) ? (
                <View style={styles.cardFront}>
                  <Text style={styles.cardName}>{card.name}</Text>
                  {positions && (
                    <Text style={styles.positionLabel}>{positions[index]}</Text>
                  )}
                </View>
              ) : (
                <View style={styles.cardBack}>
                  <Text style={styles.cardBackText}>TAP</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {!allCardsRevealed && (
          <Text style={styles.progressText}>
            {revealedIndices.size} / {drawnCards.length} revealed
          </Text>
        )}

        {allCardsRevealed && (
          <TouchableOpacity
            style={styles.getReadingButton}
            onPress={handleGetReading}
          >
            <Text style={styles.buttonText}>Get AI Reading</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back</Text>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 40,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  cardButton: {
    width: 140,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardBack: {
    flex: 1,
    backgroundColor: colors.accent.purple,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.accent.gold,
  },
  cardBackText: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardFront: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 3,
    borderColor: colors.accent.gold,
  },
  cardName: {
    color: colors.accent.gold,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  positionLabel: {
    color: colors.text.secondary,
    fontSize: 12,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  progressText: {
    color: colors.text.tertiary,
    fontSize: 14,
    marginBottom: 20,
  },
  getReadingButton: {
    backgroundColor: colors.accent.gold,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: '700',
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
  },
  backButtonText: {
    color: colors.accent.gold,
    fontSize: 14,
  },
});
