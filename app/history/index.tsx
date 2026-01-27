import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useReadingStore } from '@/stores/readingStore';
import { TarotCardDisplay } from '@/components/tarot/TarotCardDisplay';
import { colors } from '@/theme/colors';

export default function History() {
  const router = useRouter();
  const { readingHistory } = useReadingStore();

  const handleReadingPress = (id: string) => {
    router.push(`/history/${id}`);
  };

  const renderHistoryItem = ({ item }: { item: any }) => {
    const firstCard = item.cards[0]?.card;
    const cardCount = item.cards.length;

    return (
      <TouchableOpacity
        style={styles.historyItem}
        onPress={() => handleReadingPress(item.id)}
        activeOpacity={0.7}
      >
        {/* Card preview */}
        <View style={styles.cardPreview}>
          {firstCard && (
            <TarotCardDisplay
              card={firstCard}
              size="small"
              showName={false}
              glowEffect={false}
            />
          )}
        </View>

        {/* Reading info */}
        <View style={styles.readingInfo}>
          <Text style={styles.spreadType}>
            {item.spreadType === 'single' ? '🌟 Single Card' : '✨ Three Card Spread'}
          </Text>
          <Text style={styles.date}>{item.dateFormatted}</Text>
          <Text style={styles.preview} numberOfLines={2}>
            {item.interpretation.substring(0, 100)}...
          </Text>
        </View>

        {/* Favorite indicator */}
        {item.favorite && (
          <View style={styles.favoriteIndicator}>
            <Text style={styles.favoriteIcon}>⭐</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔮</Text>
      <Text style={styles.emptyTitle}>No Readings Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start your mystical journey with your first tarot reading
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => router.push('/')}
        activeOpacity={0.8}
      >
        <Text style={styles.emptyButtonText}>Get Your First Reading</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Reading History</Text>
        <Text style={styles.subtitle}>
          {readingHistory.length} {readingHistory.length === 1 ? 'reading' : 'readings'}
        </Text>
      </View>

      {/* History list */}
      <FlatList
        data={readingHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

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
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent.gold + '30',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.accent.gold + '40',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPreview: {
    marginRight: 16,
  },
  readingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  spreadType: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent.gold,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginBottom: 8,
  },
  preview: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  favoriteIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  emptyButton: {
    backgroundColor: colors.accent.gold,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  emptyButtonText: {
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

