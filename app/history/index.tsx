/**
 * History List Screen - 历史记录列表
 * iPad 和 iOS 适配
 */

import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useReadingStore } from '@/stores/readingStore';
import { TarotCardDisplay } from '@/components/tarot/TarotCardDisplay';
import { colors } from '@/theme/colors';

// UI Components
import {
  ScreenContainer,
  Row,
  Spacer,
  responsive,
  isTablet,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  StarIcon,
  BookIcon,
  CrystalBallIcon,
} from '@/components/ui';
import { IconButton } from '@/components/ui/Buttons';

export default function History() {
  const router = useRouter();
  const { readingHistory } = useReadingStore();

  const handleReadingPress = (id: string) => {
    router.push(`/history/${id}`);
  };

  const renderHistoryItem = ({ item }: { item: any }) => {
    const firstCard = item.cards[0]?.card;

    return (
      <Pressable
        onPress={() => handleReadingPress(item.id)}
        style={({ pressed }) => [
          styles.historyItem,
          pressed && styles.historyItemPressed,
        ]}
      >
        <LinearGradient
          colors={['rgba(212, 175, 55, 0.08)', 'rgba(139, 92, 246, 0.05)']}
          style={styles.historyItemGradient}
        >
          {/* Card Preview */}
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

          {/* Reading Info */}
          <View style={styles.readingInfo}>
            <Row align="center" gap={8}>
              {item.spreadType === 'single' ? (
                <StarIcon size={16} color={colors.accent.gold} />
              ) : (
                <SparklesIcon size={16} color={colors.accent.gold} />
              )}
              <Text style={styles.spreadType}>
                {item.spreadType === 'single' ? 'Daily Vision' : 'Tri-Realm Spread'}
              </Text>
            </Row>
            <Text style={styles.date}>{item.dateFormatted}</Text>
            <Text style={styles.preview} numberOfLines={2}>
              {item.interpretation?.substring(0, 100)}...
            </Text>
          </View>

          {/* Arrow */}
          <View style={styles.arrowContainer}>
            <ChevronRightIcon size={20} color={colors.text.tertiary} />
          </View>

          {/* Favorite Indicator */}
          {item.favorite && (
            <View style={styles.favoriteIndicator}>
              <StarIcon size={20} color="#FFD700" />
            </View>
          )}
        </LinearGradient>
      </Pressable>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <CrystalBallIcon size={responsive.width(60, 80)} color={colors.accent.gold} />
      </View>
      <Text style={styles.emptyTitle}>No Visions Yet</Text>
      <Text style={styles.emptySubtitle}>
        Begin your celestial journey by gazing into the cosmic realm
      </Text>

      <Spacer size={responsive.spacing(24, 32)} />

      <Pressable
        onPress={() => router.push('/')}
        style={({ pressed }) => [
          styles.emptyButton,
          pressed && styles.emptyButtonPressed,
        ]}
      >
        <LinearGradient
          colors={[colors.accent.gold, colors.accent.goldLight]}
          style={styles.emptyButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Row align="center" gap={10}>
            <SparklesIcon size={20} color={colors.background.primary} />
            <Text style={styles.emptyButtonText}>Receive Your First Vision</Text>
          </Row>
        </LinearGradient>
      </Pressable>
    </View>
  );

  return (
    <ScreenContainer>
      {/* Aurora Background Gradient */}
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#2E1A47', '#1E2638']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <Row justify="space-between" align="center">
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />
          <Text style={styles.headerTitle}>历史记录</Text>
          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        <Spacer size={responsive.spacing(16, 20)} />

        <View style={styles.titleSection}>
          <Row align="center" gap={12}>
            <BookIcon size={responsive.width(28, 34)} color={colors.accent.gold} />
            <Text style={styles.title}>Vision Archive</Text>
          </Row>
          <Text style={styles.subtitle}>
            {readingHistory.length} {readingHistory.length === 1 ? 'vision' : 'visions'} preserved
          </Text>
        </View>
      </View>

      {/* History List */}
      <FlatList
        data={readingHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          readingHistory.length === 0 && styles.listContentEmpty,
        ]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? 'tablet' : 'phone'}
        columnWrapperStyle={isTablet ? styles.columnWrapper : undefined}
      />
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
  header: {
    paddingTop: responsive.spacing(16, 24),
    paddingHorizontal: responsive.spacing(20, 32),
    paddingBottom: responsive.spacing(16, 20),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.2)',
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
    fontWeight: '800',
    color: colors.accent.gold,
    textShadowColor: 'rgba(212, 175, 55, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.secondary,
    marginTop: responsive.spacing(6, 8),
  },
  listContent: {
    padding: responsive.spacing(16, 24),
  },
  listContentEmpty: {
    flex: 1,
  },
  columnWrapper: {
    gap: responsive.spacing(16, 20),
  },
  historyItem: {
    flex: isTablet ? 1 : undefined,
    borderRadius: responsive.width(16, 20),
    marginBottom: responsive.spacing(12, 16),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  historyItemPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  historyItemGradient: {
    flexDirection: 'row',
    padding: responsive.spacing(16, 20),
    alignItems: 'center',
  },
  cardPreview: {
    marginRight: responsive.spacing(14, 18),
  },
  readingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  spreadType: {
    fontSize: responsive.fontSize(15, 17),
    fontWeight: '700',
    color: colors.accent.gold,
  },
  date: {
    fontSize: responsive.fontSize(12, 14),
    color: colors.text.tertiary,
    marginTop: responsive.spacing(4, 6),
    marginBottom: responsive.spacing(8, 10),
  },
  preview: {
    fontSize: responsive.fontSize(13, 15),
    color: colors.text.secondary,
    lineHeight: responsive.fontSize(18, 22),
  },
  arrowContainer: {
    marginLeft: responsive.spacing(8, 12),
  },
  favoriteIndicator: {
    position: 'absolute',
    top: responsive.spacing(12, 16),
    right: responsive.spacing(12, 16),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive.spacing(32, 64),
  },
  emptyIconContainer: {
    width: responsive.width(100, 130),
    height: responsive.width(100, 130),
    borderRadius: responsive.width(50, 65),
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(24, 32),
  },
  emptyTitle: {
    fontSize: responsive.fontSize(26, 32),
    fontWeight: '800',
    color: colors.accent.gold,
    marginBottom: responsive.spacing(12, 16),
    textShadowColor: 'rgba(212, 175, 55, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  emptySubtitle: {
    fontSize: responsive.fontSize(15, 17),
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: responsive.fontSize(22, 26),
  },
  emptyButton: {
    borderRadius: responsive.width(16, 20),
    overflow: 'hidden',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  emptyButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  emptyButtonGradient: {
    paddingVertical: responsive.spacing(16, 20),
    paddingHorizontal: responsive.spacing(28, 36),
    alignItems: 'center',
  },
  emptyButtonText: {
    color: colors.background.primary,
    fontSize: responsive.fontSize(16, 20),
    fontWeight: '700',
  },
});
