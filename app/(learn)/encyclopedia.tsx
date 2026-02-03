/**
 * Encyclopedia Screen - Card Encyclopedia
 * iPad and iOS adaptive layout
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { useLearningStore } from '@/stores/learningStore';
import { TAROT_DECK } from '@/data/tarot-deck';
import { TarotCardSVG } from '@/components/cards/svg';
import type { TarotCard } from '@/types/tarot.types';

// UI Components
import {
  ScreenContainer,
  SafeScrollView,
  Row,
  Spacer,
  responsive,
  isTablet,
  isLargeTablet,
  SectionHeader,
  ChevronLeftIcon,
  CheckIcon,
  BookIcon,
  StarIcon,
  FlameIcon,
  DropletIcon,
  WindIcon,
  MountainIcon,
} from '@/components/ui';
import { IconButton, Button } from '@/components/ui/Buttons';

type Filter = 'all' | 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';

const FILTERS: { key: Filter; title: string; Icon: React.FC<any>; color: string }[] = [
  { key: 'all', title: 'All', Icon: StarIcon, color: colors.accent.gold },
  { key: 'major', title: 'Major', Icon: StarIcon, color: colors.accent.gold },
  { key: 'wands', title: 'Wands', Icon: FlameIcon, color: '#EF4444' },
  { key: 'cups', title: 'Cups', Icon: DropletIcon, color: '#22D3EE' },
  { key: 'swords', title: 'Swords', Icon: WindIcon, color: '#94A3B8' },
  { key: 'pentacles', title: 'Pentacles', Icon: MountainIcon, color: '#10B981' },
];

const ELEMENT_NAMES: Record<string, string> = {
  fire: 'Fire',
  water: 'Water',
  air: 'Air',
  earth: 'Earth',
};

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
  const filterInfo = FILTERS.find((f) => f.key === selectedFilter)!;

  // Card columns based on device
  const numColumns = isLargeTablet ? 4 : isTablet ? 3 : 2;

  const renderCard = ({ item: card }: { item: TarotCard }) => {
    const mastered = isCardMastered(card.id.toString());
    const learning = learningCards.includes(card.id.toString());

    return (
      <Pressable
        onPress={() => setSelectedCard(card)}
        style={({ pressed }) => [
          styles.cardItem,
          mastered && styles.cardItemMastered,
          learning && !mastered && styles.cardItemLearning,
          pressed && styles.cardItemPressed,
        ]}
      >
        <View style={styles.cardImageContainer}>
          <TarotCardSVG
            cardId={card.id}
            width={responsive.width(70, 90)}
            height={responsive.width(105, 135)}
            size={isTablet ? 'medium' : 'small'}
            showNumber={false}
          />
        </View>
        <Text style={styles.cardName} numberOfLines={2}>
          {card.name}
        </Text>
        {mastered && (
          <View style={styles.masteredBadge}>
            <CheckIcon size={12} color={colors.text.primary} />
          </View>
        )}
        {learning && !mastered && (
          <View style={styles.learningBadge}>
            <BookIcon size={12} color={colors.accent.gold} />
          </View>
        )}
      </Pressable>
    );
  };

  // Card Detail View
  if (selectedCard) {
    const mastered = isCardMastered(selectedCard.id.toString());

    return (
      <ScreenContainer>
        <SafeScrollView maxWidth="md">
          {/* Header */}
          <Row justify="flex-start" align="center" style={styles.header}>
            <IconButton
              icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
              onPress={() => setSelectedCard(null)}
              variant="filled"
              size="md"
            />
          </Row>

          {/* Card Display */}
          <View style={styles.detailCardContainer}>
            <View style={styles.detailCardWrapper}>
              <TarotCardSVG
                cardId={selectedCard.id}
                width={responsive.width(160, 220)}
                height={responsive.width(240, 330)}
                size={isTablet ? 'large' : 'medium'}
                showNumber={true}
              />
            </View>
            <Text style={styles.detailName}>{selectedCard.name}</Text>

            <View style={styles.arcanaTag}>
              <Text style={styles.arcanaText}>
                {selectedCard.arcana === 'major'
                  ? 'Major Arcana'
                  : `${selectedCard.suit === 'wands' ? 'Wands' : selectedCard.suit === 'cups' ? 'Cups' : selectedCard.suit === 'swords' ? 'Swords' : 'Pentacles'} · Minor Arcana`}
              </Text>
            </View>

            {mastered && (
              <View style={styles.masteryStatus}>
                <CheckIcon size={16} color="#10B981" />
                <Text style={styles.masteryText}>Mastered</Text>
              </View>
            )}
          </View>

          <Spacer size={responsive.spacing(24, 32)} />

          {/* Keywords */}
          <SectionHeader title="Keywords" />
          <View style={styles.keywordsContainer}>
            {selectedCard.uprightKeywords.map((keyword, i) => (
              <View key={i} style={styles.keywordPill}>
                <Text style={styles.keywordText}>{keyword}</Text>
              </View>
            ))}
          </View>

          <Spacer size={responsive.spacing(20, 28)} />

          {/* Meaning */}
          <SectionHeader title="Card Meaning" />
          <Text style={styles.meaningText}>{selectedCard.uprightMeaning}</Text>

          {/* Element */}
          {selectedCard.element && (
            <>
              <Spacer size={responsive.spacing(20, 28)} />
              <SectionHeader title="Element" />
              <View style={styles.elementContainer}>
                {selectedCard.element === 'fire' && (
                  <FlameIcon size={20} color="#EF4444" />
                )}
                {selectedCard.element === 'water' && (
                  <DropletIcon size={20} color="#22D3EE" />
                )}
                {selectedCard.element === 'air' && (
                  <WindIcon size={20} color="#94A3B8" />
                )}
                {selectedCard.element === 'earth' && (
                  <MountainIcon size={20} color="#10B981" />
                )}
                <Text style={styles.elementText}>
                  {ELEMENT_NAMES[selectedCard.element]}
                </Text>
              </View>
            </>
          )}

          <Spacer size={responsive.spacing(32, 48)} />
        </SafeScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      {/* Header - Outside FlatList */}
      <View style={styles.headerContainer}>
        <Row justify="space-between" align="center" style={styles.header}>
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />
          <Text style={styles.headerTitle}>Encyclopedia</Text>
          <View style={{ width: responsive.width(40, 48) }} />
        </Row>

        {/* Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>
            {masteredCards.length} / 78 cards mastered
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
            const FilterIcon = filter.Icon;

            return (
              <Pressable
                key={filter.key}
                onPress={() => setSelectedFilter(filter.key)}
                style={[
                  styles.filterTab,
                  isSelected && { borderColor: filter.color },
                ]}
              >
                <View style={[styles.filterIconContainer, { backgroundColor: filter.color + '20' }]}>
                  <FilterIcon size={responsive.width(18, 22)} color={filter.color} />
                </View>
                <Text
                  style={[
                    styles.filterTitle,
                    isSelected && { color: colors.text.primary },
                  ]}
                >
                  {filter.title}
                </Text>
                <Text style={[styles.filterCount, { color: filter.color }]}>
                  {filterMastered}/{filterCards.length}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Cards Grid */}
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        key={numColumns} // Force re-render when columns change
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Spacer size={responsive.spacing(32, 48)} />}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: responsive.spacing(16, 24),
  },
  header: {
    marginBottom: responsive.spacing(16, 20),
  },
  headerTitle: {
    fontSize: responsive.fontSize(22, 26),
    fontWeight: '700',
    color: colors.text.primary,
  },

  // Progress
  progressSection: {
    marginBottom: responsive.spacing(16, 20),
  },
  progressLabel: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.tertiary,
    marginBottom: responsive.spacing(8, 10),
  },
  progressBar: {
    height: responsive.width(8, 10),
    backgroundColor: colors.background.tertiary,
    borderRadius: responsive.width(4, 5),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: responsive.width(4, 5),
  },

  // Filters
  filtersContainer: {
    paddingBottom: responsive.spacing(16, 20),
    gap: responsive.spacing(10, 14),
  },
  filterTab: {
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    padding: responsive.spacing(10, 14),
    minWidth: responsive.width(70, 90),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    marginRight: responsive.spacing(10, 14),
  },
  filterIconContainer: {
    width: responsive.width(32, 40),
    height: responsive.width(32, 40),
    borderRadius: responsive.width(10, 12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(6, 8),
  },
  filterTitle: {
    fontSize: responsive.fontSize(12, 14),
    fontWeight: '600',
    color: colors.text.tertiary,
    marginBottom: 2,
  },
  filterCount: {
    fontSize: responsive.fontSize(10, 12),
    fontWeight: '600',
  },

  // Grid
  gridContent: {
    paddingHorizontal: responsive.spacing(16, 24),
  },
  gridRow: {
    justifyContent: 'flex-start',
    gap: responsive.spacing(12, 16),
    marginBottom: responsive.spacing(12, 16),
  },

  // Card Item
  cardItem: {
    width: responsive.width(90, 110),
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    padding: responsive.spacing(10, 14),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
  },
  cardItemMastered: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  cardItemLearning: {
    borderColor: 'rgba(212, 175, 55, 0.3)',
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
  },
  cardItemPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  cardImageContainer: {
    marginBottom: responsive.spacing(8, 12),
  },
  cardName: {
    fontSize: responsive.fontSize(11, 13),
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  },
  masteredBadge: {
    position: 'absolute',
    top: responsive.spacing(6, 8),
    right: responsive.spacing(6, 8),
    width: responsive.width(20, 24),
    height: responsive.width(20, 24),
    borderRadius: responsive.width(10, 12),
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  learningBadge: {
    position: 'absolute',
    top: responsive.spacing(6, 8),
    right: responsive.spacing(6, 8),
    width: responsive.width(20, 24),
    height: responsive.width(20, 24),
    borderRadius: responsive.width(10, 12),
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Detail View
  detailCardContainer: {
    alignItems: 'center',
  },
  detailCardWrapper: {
    marginBottom: responsive.spacing(20, 28),
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  detailName: {
    fontSize: responsive.fontSize(26, 32),
    fontWeight: '700',
    color: colors.accent.gold,
    textAlign: 'center',
    marginBottom: responsive.spacing(12, 16),
  },
  arcanaTag: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: responsive.spacing(14, 18),
    paddingVertical: responsive.spacing(8, 10),
    borderRadius: responsive.width(12, 14),
    marginBottom: responsive.spacing(12, 16),
  },
  arcanaText: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.secondary,
    fontWeight: '500',
  },
  masteryStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: responsive.spacing(14, 18),
    paddingVertical: responsive.spacing(8, 10),
    borderRadius: responsive.width(12, 14),
    gap: responsive.spacing(6, 8),
  },
  masteryText: {
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
    color: '#10B981',
  },

  // Keywords
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing(8, 12),
  },
  keywordPill: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: responsive.spacing(14, 18),
    paddingVertical: responsive.spacing(10, 12),
    borderRadius: responsive.width(12, 14),
  },
  keywordText: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.secondary,
  },

  // Meaning
  meaningText: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.secondary,
    lineHeight: responsive.fontSize(26, 30),
  },

  // Element
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: responsive.spacing(14, 18),
    paddingVertical: responsive.spacing(10, 14),
    borderRadius: responsive.width(12, 14),
    alignSelf: 'flex-start',
    gap: responsive.spacing(10, 12),
  },
  elementText: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.secondary,
  },
});
