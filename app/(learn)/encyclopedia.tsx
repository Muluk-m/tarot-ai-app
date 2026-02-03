import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { useLearningStore } from '@/stores/learningStore';
import { TAROT_DECK } from '@/data/tarot-deck';
import type { TarotCard } from '@/types/tarot.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - spacing.lg * 3) / 2;

type Filter = 'all' | 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

const FILTERS: { key: Filter; title: string; icon: string }[] = [
  { key: 'all', title: 'All', icon: '🎴' },
  { key: 'major', title: 'Major', icon: '⭐' },
  { key: 'wands', title: 'Wands', icon: '🔥' },
  { key: 'cups', title: 'Cups', icon: '💧' },
  { key: 'swords', title: 'Swords', icon: '⚔️' },
  { key: 'pentacles', title: 'Pentacles', icon: '💰' },
];

export default function EncyclopediaScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const { masteredCards, learningCards, isCardMastered } = useLearningStore();

  const getFilteredCards = (): TarotCard[] => {
    switch (selectedFilter) {
      case 'major':
        return TAROT_DECK.filter((c) => c.arcana === 'major');
      case 'wands':
        return TAROT_DECK.filter((c) => c.suit === 'wands');
      case 'cups':
        return TAROT_DECK.filter((c) => c.suit === 'cups');
      case 'swords':
        return TAROT_DECK.filter((c) => c.suit === 'swords');
      case 'pentacles':
        return TAROT_DECK.filter((c) => c.suit === 'pentacles');
      default:
        return TAROT_DECK;
    }
  };

  const cards = getFilteredCards();
  const masteredCount = cards.filter((c) => isCardMastered(c.id.toString())).length;

  const renderCard = ({ item: card }: { item: TarotCard }) => {
    const mastered = isCardMastered(card.id.toString());
    const learning = learningCards.includes(card.id.toString());

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedCard(card)}
        style={styles.cardItem}
      >
        <LinearGradient
          colors={
            mastered
              ? ['#10B981' + '25', '#10B981' + '10']
              : learning
              ? [colors.accent.gold + '20', colors.accent.gold + '10']
              : [colors.background.secondary, colors.background.tertiary]
          }
          style={styles.cardGradient}
        >
          <Text style={styles.cardSymbol}>{card.symbolEmoji}</Text>
          <Text style={styles.cardName} numberOfLines={2}>
            {card.name}
          </Text>
          {mastered && (
            <View style={styles.masteredBadge}>
              <Text style={styles.masteredText}>✓</Text>
            </View>
          )}
          {learning && !mastered && (
            <View style={styles.learningBadge}>
              <Text style={styles.learningText}>📖</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  // Card Detail Modal
  if (selectedCard) {
    const mastered = isCardMastered(selectedCard.id.toString());

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
          style={styles.backgroundGradient}
        />

        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.detailContent}>
            {/* Header */}
            <View style={styles.detailHeader}>
              <TouchableOpacity
                onPress={() => setSelectedCard(null)}
                style={styles.backButton}
              >
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>
            </View>

            {/* Card Display */}
            <View style={styles.detailCardContainer}>
              <LinearGradient
                colors={[colors.accent.gold + '25', colors.accent.gold + '10']}
                style={styles.detailCardGradient}
              >
                <Text style={styles.detailSymbol}>{selectedCard.symbolEmoji}</Text>
                <Text style={styles.detailName}>{selectedCard.name}</Text>

                <View style={styles.arcanaTag}>
                  <Text style={styles.arcanaText}>
                    {selectedCard.arcana === 'major'
                      ? 'Major Arcana'
                      : `${selectedCard.suit?.charAt(0).toUpperCase()}${selectedCard.suit?.slice(1)} • Minor Arcana`}
                  </Text>
                </View>

                {mastered && (
                  <View style={styles.masteryStatus}>
                    <Text style={styles.masteryIcon}>🏆</Text>
                    <Text style={styles.masteryText}>Mastered</Text>
                  </View>
                )}
              </LinearGradient>
            </View>

            {/* Keywords */}
            <View style={styles.detailSection}>
              <Text style={styles.sectionLabel}>Keywords</Text>
              <View style={styles.keywordsContainer}>
                {selectedCard.uprightKeywords.map((keyword, i) => (
                  <View key={i} style={styles.keywordPill}>
                    <Text style={styles.keywordText}>{keyword}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Meaning */}
            <View style={styles.detailSection}>
              <Text style={styles.sectionLabel}>Meaning</Text>
              <Text style={styles.meaningText}>{selectedCard.uprightMeaning}</Text>
            </View>

            {/* Element */}
            {selectedCard.element && (
              <View style={styles.detailSection}>
                <Text style={styles.sectionLabel}>Element</Text>
                <View style={styles.elementContainer}>
                  <Text style={styles.elementEmoji}>
                    {selectedCard.element === 'fire'
                      ? '🔥'
                      : selectedCard.element === 'water'
                      ? '💧'
                      : selectedCard.element === 'air'
                      ? '🌪️'
                      : '🌍'}
                  </Text>
                  <Text style={styles.elementText}>
                    {selectedCard.element.charAt(0).toUpperCase() +
                      selectedCard.element.slice(1)}
                  </Text>
                </View>
              </View>
            )}

            {/* Bottom spacing */}
            <View style={{ height: spacing.xxl }} />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Card Encyclopedia</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>
            {masteredCards.length} of 78 cards mastered
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(masteredCards.length / 78) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter.key;
            const filterCards = filter.key === 'all'
              ? TAROT_DECK
              : filter.key === 'major'
              ? TAROT_DECK.filter((c) => c.arcana === 'major')
              : TAROT_DECK.filter((c) => c.suit === filter.key);
            const filterMastered = filterCards.filter((c) =>
              isCardMastered(c.id.toString())
            ).length;

            return (
              <TouchableOpacity
                key={filter.key}
                onPress={() => setSelectedFilter(filter.key)}
                style={[styles.filterTab, isSelected && styles.filterTabSelected]}
              >
                <Text style={styles.filterIcon}>{filter.icon}</Text>
                <Text
                  style={[
                    styles.filterTitle,
                    isSelected && styles.filterTitleSelected,
                  ]}
                >
                  {filter.title}
                </Text>
                <Text style={styles.filterCount}>
                  {filterMastered}/{filterCards.length}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Cards Grid */}
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
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
  safeArea: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },

  // Progress
  progressSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.background.tertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: 3,
  },

  // Filters
  filtersContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  filterTab: {
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 14,
    marginRight: spacing.sm,
    minWidth: 70,
  },
  filterTabSelected: {
    backgroundColor: colors.accent.gold + '30',
    borderWidth: 1,
    borderColor: colors.accent.gold + '50',
  },
  filterIcon: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  filterTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.tertiary,
  },
  filterTitleSelected: {
    color: colors.accent.gold,
    fontWeight: '600',
  },
  filterCount: {
    fontSize: 10,
    color: colors.text.quaternary,
    marginTop: 2,
  },

  // Grid
  gridContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  // Card Item
  cardItem: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.sm,
  },
  cardGradient: {
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 120,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  cardSymbol: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  cardName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  },
  masteredBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  masteredText: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '700',
  },
  learningBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent.gold + '50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  learningText: {
    fontSize: 12,
  },

  // Detail View
  detailContent: {
    paddingHorizontal: spacing.lg,
  },
  detailHeader: {
    paddingVertical: spacing.md,
  },
  detailCardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    ...shadows.goldGlow,
  },
  detailCardGradient: {
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent.gold + '40',
    borderRadius: 24,
  },
  detailSymbol: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  detailName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accent.gold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  arcanaTag: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  arcanaText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  masteryStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981' + '30',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    gap: spacing.xs,
  },
  masteryIcon: {
    fontSize: 16,
  },
  masteryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },

  // Detail Sections
  detailSection: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  keywordPill: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
  },
  keywordText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  meaningText: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 26,
  },
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: spacing.sm,
  },
  elementEmoji: {
    fontSize: 20,
  },
  elementText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});
