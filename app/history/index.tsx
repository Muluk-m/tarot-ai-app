import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useReadingStore } from '@/stores/readingStore';
import { TarotCardDisplay } from '@/components/tarot/TarotCardDisplay';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';

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
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[colors.accent.gold + '15', colors.accent.purple + '10']}
          style={styles.historyItemGradient}
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
              {item.spreadType === 'single' ? '🌟 Daily Vision' : '✨ Tri-Realm Spread'}
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
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔮</Text>
      <Text style={styles.emptyTitle}>No Visions Yet</Text>
      <Text style={styles.emptySubtitle}>
        Begin your celestial journey by gazing into the cosmic realm
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => router.push('/')}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[colors.accent.gold, colors.accent.goldLight]}
          style={styles.emptyButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.emptyButtonText}>✨ Receive Your First Vision</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Aurora Background Gradient */}
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#2E1A47', '#1E2638']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📖 Vision Archive</Text>
        <Text style={styles.subtitle}>
          {readingHistory.length} {readingHistory.length === 1 ? 'vision' : 'visions'} preserved
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
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    paddingTop: spacing.xxxl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent.gold + '30',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.accent.gold,
    marginBottom: spacing.xs,
    textShadowColor: colors.accent.gold + '40',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 15,
    color: colors.text.secondary,
  },
  listContent: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  historyItem: {
    borderRadius: 20,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.accent.gold + '40',
    ...shadows.md,
  },
  historyItemGradient: {
    flexDirection: 'row',
    padding: spacing.lg,
  },
  cardPreview: {
    marginRight: spacing.md,
  },
  readingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  spreadType: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
  },
  preview: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 19,
  },
  favoriteIndicator: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.accent.gold,
    marginBottom: spacing.md,
    textShadowColor: colors.accent.gold + '40',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  emptySubtitle: {
    fontSize: 15,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xxl,
  },
  emptyButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  emptyButtonGradient: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  emptyButtonText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: '800',
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

