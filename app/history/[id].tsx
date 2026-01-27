import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useReadingStore } from '@/stores/readingStore';
import { TarotCardDisplay } from '@/components/tarot/TarotCardDisplay';
import { colors } from '@/theme/colors';

/**
 * History Detail Screen
 * Displays full reading details including cards and interpretation
 */

export default function HistoryDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { readingHistory, toggleFavorite, deleteFromHistory } = useReadingStore();

  const reading = readingHistory.find((r) => r.id === id);

  if (!reading) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>🔮</Text>
          <Text style={styles.errorTitle}>Reading Not Found</Text>
          <Text style={styles.errorSubtitle}>This reading may have been deleted</Text>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const positions = reading.spreadType === 'three' ? (['past', 'present', 'future'] as const) : undefined;

  const handleToggleFavorite = () => {
    toggleFavorite(id);
  };

  const handleDelete = () => {
    // TODO: Add confirmation dialog
    deleteFromHistory(id);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>
                {reading.spreadType === 'single' ? '🌟 Daily Card' : '✨ Three Card Spread'}
              </Text>
              <Text style={styles.date}>{reading.dateFormatted}</Text>
            </View>

            <TouchableOpacity
              onPress={handleToggleFavorite}
              style={styles.favoriteButton}
              activeOpacity={0.7}
            >
              <Text style={styles.favoriteIcon}>{reading.favorite ? '⭐' : '☆'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards Display */}
        <View style={styles.cardsContainer}>
          {reading.cards.map((cardData, index) => (
            <TarotCardDisplay
              key={cardData.card.id}
              card={cardData.card}
              size={reading.spreadType === 'single' ? 'large' : 'medium'}
              showName={true}
              showPosition={reading.spreadType === 'three'}
              position={positions?.[index]}
              glowEffect={true}
            />
          ))}
        </View>

        {/* Interpretation */}
        <View style={styles.interpretationContainer}>
          <View style={styles.interpretationHeader}>
            <Text style={styles.interpretationTitle}>✨ Interpretation</Text>
          </View>
          <Text style={styles.interpretationText}>{reading.interpretation}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.newReadingButton}
            onPress={() => router.push('/')}
            activeOpacity={0.8}
          >
            <Text style={styles.newReadingButtonText}>✨ New Reading</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteButtonText}>🗑️ Delete Reading</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 32,
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
  },
  interpretationText: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.text.primary,
    letterSpacing: 0.3,
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  newReadingButton: {
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
  newReadingButtonText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  deleteButton: {
    backgroundColor: colors.background.tertiary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error,
  },
  deleteButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  errorIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
  },
  errorSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  errorButton: {
    backgroundColor: colors.accent.gold,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  errorButtonText: {
    color: colors.background.primary,
    fontSize: 16,
    fontWeight: '600',
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
