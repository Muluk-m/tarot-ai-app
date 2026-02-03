/**
 * Flashcards Screen - 闪卡记忆
 * iPad 和 iOS 适配
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { useFlashcardStore } from '@/stores/flashcardStore';
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
  StatCard,
  ChevronLeftIcon,
  CardsIcon,
  CheckIcon,
  XIcon,
  RefreshIcon,
  PlayIcon,
} from '@/components/ui';
import { IconButton, Button } from '@/components/ui/Buttons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type SessionState = 'intro' | 'practice' | 'result';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FlashcardsScreen() {
  const router = useRouter();

  const {
    initializeCard,
    recordReview,
    completeSession,
    getCardsDueForReview,
    getMasteryLevel,
    getTotalReviews,
  } = useFlashcardStore();

  const { masterCard, addLearningCard } = useLearningStore();

  const [sessionState, setSessionState] = useState<SessionState>('intro');
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  const flipProgress = useSharedValue(0);

  const currentCard = cards[currentIndex];
  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0;

  const cardsDue = getCardsDueForReview();
  const totalReviews = getTotalReviews();

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [0, 180]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [180, 360]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
    };
  });

  const handleFlip = () => {
    flipProgress.value = withSpring(isFlipped ? 0 : 1, {
      damping: 15,
      stiffness: 100,
    });
    setIsFlipped(!isFlipped);
  };

  const handleStartSession = () => {
    // Get cards for practice (due cards first, then random)
    let practiceCards: TarotCard[] = [];

    if (cardsDue.length > 0) {
      // Use due cards
      practiceCards = TAROT_DECK.filter((c) =>
        cardsDue.includes(c.id.toString())
      );
    }

    // Fill with random cards if needed (max 10 cards per session)
    if (practiceCards.length < 10) {
      const remainingIds = new Set(practiceCards.map((c) => c.id.toString()));
      const additionalCards = shuffleArray(
        TAROT_DECK.filter((c) => !remainingIds.has(c.id.toString()))
      ).slice(0, 10 - practiceCards.length);
      practiceCards = [...practiceCards, ...additionalCards];
    }

    // Initialize cards in store
    practiceCards.forEach((card) => {
      initializeCard(card.id.toString());
      addLearningCard(card.id.toString());
    });

    setCards(shuffleArray(practiceCards).slice(0, 10));
    setStartTime(Date.now());
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsFlipped(false);
    flipProgress.value = 0;
    setSessionState('practice');
  };

  const handleAnswer = (correct: boolean) => {
    if (!currentCard) return;

    recordReview(currentCard.id.toString(), correct);

    if (correct) {
      setCorrectCount((prev) => prev + 1);

      // Check if card is now mastered (level 5)
      const newLevel = getMasteryLevel(currentCard.id.toString());
      if (newLevel >= 5) {
        masterCard(currentCard.id.toString());
      }
    }

    // Move to next card or finish
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      flipProgress.value = 0;
    } else {
      // Complete session
      const duration = Math.round((Date.now() - startTime) / 1000);
      completeSession(
        'recognition',
        cards.map((c) => c.id.toString()),
        correctCount + (correct ? 1 : 0),
        duration
      );
      setSessionState('result');
    }
  };

  // Intro Screen
  if (sessionState === 'intro') {
    return (
      <ScreenContainer>
        <View style={styles.introContent}>
          <Row justify="flex-start" style={styles.header}>
            <IconButton
              icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
              onPress={() => router.back()}
              variant="filled"
              size="md"
            />
          </Row>

          <View style={styles.introCenter}>
            <View style={styles.flashcardIcon}>
              <CardsIcon size={responsive.width(48, 60)} color={colors.accent.purple} />
            </View>

            <Text style={styles.introTitle}>闪卡记忆</Text>
            <Text style={styles.introDescription}>
              通过卡片复习加深记忆。看到卡牌图案，回忆卡牌名称和含义，然后翻转验证！
            </Text>

            <StatCard
              items={[
                { value: cardsDue.length, label: '待复习' },
                { value: totalReviews, label: '总复习次数' },
              ]}
              style={styles.statsCard}
            />
          </View>

          <Pressable
            onPress={handleStartSession}
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={[colors.accent.purple, '#A78BFA']}
              style={styles.startGradient}
            >
              <PlayIcon size={20} color={colors.text.primary} />
              <Text style={styles.startButtonText}>开始练习</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  // Result Screen
  if (sessionState === 'result') {
    const accuracy = cards.length > 0 ? Math.round((correctCount / cards.length) * 100) : 0;

    return (
      <ScreenContainer>
        <View style={styles.resultContent}>
          <View style={styles.resultCenter}>
            <View
              style={[
                styles.resultIcon,
                { backgroundColor: accuracy >= 70 ? '#10B981' : colors.accent.gold },
              ]}
            >
              {accuracy >= 90 ? (
                <Text style={styles.resultEmoji}>🌟</Text>
              ) : accuracy >= 70 ? (
                <Text style={styles.resultEmoji}>✨</Text>
              ) : (
                <Text style={styles.resultEmoji}>💪</Text>
              )}
            </View>

            <Text style={styles.resultTitle}>练习完成!</Text>

            <Text
              style={[
                styles.resultScore,
                { color: accuracy >= 70 ? '#10B981' : colors.accent.gold },
              ]}
            >
              {accuracy}%
            </Text>

            <Text style={styles.resultSubtitle}>
              {correctCount} / {cards.length} 正确
            </Text>

            <View style={styles.resultMessage}>
              <Text style={styles.resultMessageText}>
                {accuracy >= 90
                  ? '太棒了！你已经掌握了这些卡牌！'
                  : accuracy >= 70
                  ? '很好的进步！继续保持！'
                  : '继续努力！多多练习就会进步！'}
              </Text>
            </View>
          </View>

          <View style={styles.resultButtons}>
            <Pressable
              onPress={handleStartSession}
              style={({ pressed }) => [
                styles.retryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <RefreshIcon size={18} color={colors.text.secondary} />
              <Text style={styles.retryButtonText}>再练一次</Text>
            </Pressable>

            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.doneButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <LinearGradient
                colors={[colors.accent.purple, '#A78BFA']}
                style={styles.doneGradient}
              >
                <Text style={styles.doneButtonText}>完成</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  // Practice Screen
  const cardWidth = isTablet ? SCREEN_WIDTH * 0.5 : SCREEN_WIDTH - responsive.spacing(32, 48) * 2;
  const cardHeight = cardWidth / 0.667;

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.practiceHeader}>
        <IconButton
          icon={<XIcon size={20} color={colors.text.secondary} />}
          onPress={() => {
            setSessionState('intro');
            setCards([]);
          }}
          variant="filled"
          size="md"
        />

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1} / {cards.length}
          </Text>
        </View>
      </View>

      {/* Flashcard */}
      <View style={styles.cardContainer}>
        <Pressable
          onPress={handleFlip}
          style={[styles.cardTouchable, { width: cardWidth, height: cardHeight }]}
        >
          {/* Front of card - SVG */}
          <Animated.View style={[styles.cardFace, styles.cardFront, frontAnimatedStyle]}>
            <View style={styles.cardSvgWrapper}>
              <TarotCardSVG
                cardId={currentCard?.id || 0}
                width={cardWidth}
                height={cardHeight}
                size={isTablet ? 'large' : 'medium'}
                showNumber={true}
              />
            </View>
            <View style={styles.tapHintContainer}>
              <Text style={styles.tapHint}>点击翻转查看答案</Text>
            </View>
          </Animated.View>

          {/* Back of card - Answer */}
          <Animated.View style={[styles.cardFace, styles.cardBack, backAnimatedStyle]}>
            <LinearGradient
              colors={[colors.accent.gold + '30', colors.accent.gold + '15']}
              style={styles.cardBackGradient}
            >
              <Text style={styles.cardName}>{currentCard?.name}</Text>
              <View style={styles.keywordsContainer}>
                {currentCard?.uprightKeywords.slice(0, 4).map((keyword, i) => (
                  <View key={i} style={styles.keywordPill}>
                    <Text style={styles.keywordText}>{keyword}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.arcanaLabel}>
                {currentCard?.arcana === 'major' ? '大阿卡纳' : currentCard?.suit}
              </Text>
            </LinearGradient>
          </Animated.View>
        </Pressable>
      </View>

      {/* Answer Buttons */}
      {isFlipped && (
        <View style={styles.answerButtons}>
          <Pressable
            onPress={() => handleAnswer(false)}
            style={({ pressed }) => [
              styles.wrongButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <XIcon size={20} color={colors.error} />
            <Text style={styles.wrongButtonText}>不记得</Text>
          </Pressable>

          <Pressable
            onPress={() => handleAnswer(true)}
            style={({ pressed }) => [
              styles.correctButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={['#10B981', '#34D399']}
              style={styles.correctGradient}
            >
              <CheckIcon size={20} color={colors.text.primary} />
              <Text style={styles.correctButtonText}>记得!</Text>
            </LinearGradient>
          </Pressable>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  // Intro
  introContent: {
    flex: 1,
    padding: responsive.spacing(20, 28),
  },
  header: {
    marginBottom: responsive.spacing(16, 24),
  },
  introCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashcardIcon: {
    width: responsive.width(100, 120),
    height: responsive.width(100, 120),
    borderRadius: responsive.width(30, 36),
    backgroundColor: colors.accent.purple + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(20, 28),
  },
  introTitle: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: responsive.spacing(12, 16),
  },
  introDescription: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: responsive.fontSize(24, 28),
    marginBottom: responsive.spacing(24, 32),
    paddingHorizontal: responsive.spacing(20, 40),
  },
  statsCard: {
    width: '100%',
    maxWidth: responsive.width(320, 400),
  },
  startButton: {
    borderRadius: responsive.width(16, 20),
    overflow: 'hidden',
    shadowColor: colors.accent.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive.spacing(16, 20),
    borderRadius: responsive.width(16, 20),
    gap: responsive.spacing(10, 12),
  },
  startButtonText: {
    fontSize: responsive.fontSize(18, 20),
    fontWeight: '700',
    color: colors.text.primary,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },

  // Practice
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsive.spacing(20, 28),
    gap: responsive.spacing(12, 16),
  },
  progressContainer: {
    flex: 1,
    gap: responsive.spacing(6, 8),
  },
  progressBar: {
    height: responsive.width(6, 8),
    backgroundColor: colors.background.tertiary,
    borderRadius: responsive.width(3, 4),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.purple,
    borderRadius: responsive.width(3, 4),
  },
  progressText: {
    fontSize: responsive.fontSize(12, 14),
    color: colors.text.tertiary,
    textAlign: 'right',
  },

  // Card
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive.spacing(20, 28),
  },
  cardTouchable: {
    position: 'relative',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: responsive.width(20, 28),
    overflow: 'hidden',
  },
  cardFront: {
    zIndex: 2,
  },
  cardBack: {
    zIndex: 1,
  },
  cardSvgWrapper: {
    flex: 1,
    borderRadius: responsive.width(20, 28),
    overflow: 'hidden',
  },
  tapHintContainer: {
    position: 'absolute',
    bottom: responsive.spacing(16, 24),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tapHint: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.tertiary,
    fontStyle: 'italic',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: responsive.spacing(12, 16),
    paddingVertical: responsive.spacing(6, 8),
    borderRadius: responsive.width(8, 10),
  },
  cardBackGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsive.spacing(24, 32),
    borderWidth: 2,
    borderColor: colors.accent.gold + '40',
    borderRadius: responsive.width(20, 28),
  },
  cardName: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '700',
    color: colors.accent.gold,
    textAlign: 'center',
    marginBottom: responsive.spacing(20, 28),
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: responsive.spacing(10, 14),
    marginBottom: responsive.spacing(20, 28),
  },
  keywordPill: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: responsive.spacing(14, 18),
    paddingVertical: responsive.spacing(8, 10),
    borderRadius: responsive.width(12, 14),
  },
  keywordText: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.secondary,
  },
  arcanaLabel: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.tertiary,
    textTransform: 'capitalize',
  },

  // Answer Buttons
  answerButtons: {
    flexDirection: 'row',
    padding: responsive.spacing(20, 28),
    gap: responsive.spacing(12, 16),
  },
  wrongButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    paddingVertical: responsive.spacing(16, 20),
    borderWidth: 2,
    borderColor: colors.error + '40',
    gap: responsive.spacing(8, 10),
  },
  wrongButtonText: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
    color: colors.text.secondary,
  },
  correctButton: {
    flex: 1,
    borderRadius: responsive.width(14, 18),
    overflow: 'hidden',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  correctGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive.spacing(16, 20),
    borderRadius: responsive.width(14, 18),
    gap: responsive.spacing(8, 10),
  },
  correctButtonText: {
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '700',
    color: colors.text.primary,
  },

  // Result
  resultContent: {
    flex: 1,
    padding: responsive.spacing(20, 28),
    justifyContent: 'center',
  },
  resultCenter: {
    alignItems: 'center',
    marginBottom: responsive.spacing(40, 56),
  },
  resultIcon: {
    width: responsive.width(100, 120),
    height: responsive.width(100, 120),
    borderRadius: responsive.width(50, 60),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(20, 28),
  },
  resultEmoji: {
    fontSize: responsive.fontSize(48, 60),
  },
  resultTitle: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: responsive.spacing(8, 12),
  },
  resultScore: {
    fontSize: responsive.fontSize(64, 80),
    fontWeight: '800',
    marginBottom: responsive.spacing(8, 12),
  },
  resultSubtitle: {
    fontSize: responsive.fontSize(18, 22),
    color: colors.text.tertiary,
    marginBottom: responsive.spacing(20, 28),
  },
  resultMessage: {
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(16, 20),
    padding: responsive.spacing(16, 22),
  },
  resultMessageText: {
    fontSize: responsive.fontSize(16, 18),
    color: colors.text.secondary,
    textAlign: 'center',
  },
  resultButtons: {
    gap: responsive.spacing(12, 16),
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: responsive.width(14, 18),
    paddingVertical: responsive.spacing(16, 20),
    gap: responsive.spacing(8, 10),
  },
  retryButtonText: {
    fontSize: responsive.fontSize(17, 19),
    fontWeight: '600',
    color: colors.text.secondary,
  },
  doneButton: {
    borderRadius: responsive.width(14, 18),
    overflow: 'hidden',
    shadowColor: colors.accent.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  doneGradient: {
    paddingVertical: responsive.spacing(16, 20),
    alignItems: 'center',
    borderRadius: responsive.width(14, 18),
  },
  doneButtonText: {
    fontSize: responsive.fontSize(17, 19),
    fontWeight: '700',
    color: colors.text.primary,
  },
});
