import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { useLearningStore } from '@/stores/learningStore';
import { TAROT_DECK } from '@/data/tarot-deck';
import type { TarotCard } from '@/types/tarot.types';

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
      <View style={styles.container}>
        <LinearGradient
          colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
          style={styles.backgroundGradient}
        />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.introContent}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>

            <View style={styles.introCenter}>
              <View style={styles.flashcardIcon}>
                <Text style={styles.flashcardEmoji}>🎴</Text>
              </View>

              <Text style={styles.introTitle}>Flashcard Practice</Text>
              <Text style={styles.introDescription}>
                Review tarot cards to strengthen your memory. See the symbol,
                guess the card name and meaning, then flip to check!
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{cardsDue.length}</Text>
                  <Text style={styles.statLabel}>Cards Due</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{totalReviews}</Text>
                  <Text style={styles.statLabel}>Total Reviews</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleStartSession}
              style={styles.startButton}
            >
              <LinearGradient
                colors={[colors.accent.purple, colors.accent.purpleLight]}
                style={styles.startGradient}
              >
                <Text style={styles.startButtonText}>
                  Start Practice Session
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // Result Screen
  if (sessionState === 'result') {
    const accuracy = cards.length > 0 ? Math.round((correctCount / cards.length) * 100) : 0;

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
          style={styles.backgroundGradient}
        />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.resultContent}>
            <View style={styles.resultCenter}>
              <View
                style={[
                  styles.resultIcon,
                  { backgroundColor: accuracy >= 70 ? '#10B981' : colors.accent.gold },
                ]}
              >
                <Text style={styles.resultEmoji}>
                  {accuracy >= 90 ? '🌟' : accuracy >= 70 ? '✨' : '💪'}
                </Text>
              </View>

              <Text style={styles.resultTitle}>Session Complete!</Text>

              <Text
                style={[
                  styles.resultScore,
                  { color: accuracy >= 70 ? '#10B981' : colors.accent.gold },
                ]}
              >
                {accuracy}%
              </Text>

              <Text style={styles.resultSubtitle}>
                {correctCount} of {cards.length} correct
              </Text>

              <View style={styles.resultMessage}>
                <Text style={styles.resultMessageText}>
                  {accuracy >= 90
                    ? "Excellent! You're mastering these cards!"
                    : accuracy >= 70
                    ? 'Great progress! Keep practicing!'
                    : 'Keep studying! Practice makes perfect.'}
                </Text>
              </View>
            </View>

            <View style={styles.resultButtons}>
              <TouchableOpacity
                onPress={handleStartSession}
                style={styles.retryButton}
              >
                <Text style={styles.retryButtonText}>Practice Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.doneButton}
              >
                <LinearGradient
                  colors={[colors.accent.purple, colors.accent.purpleLight]}
                  style={styles.doneGradient}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // Practice Screen
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#0A0E1A']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.practiceHeader}>
          <TouchableOpacity
            onPress={() => {
              setSessionState('intro');
              setCards([]);
            }}
            style={styles.closeButton}
          >
            <Text style={styles.closeIcon}>×</Text>
          </TouchableOpacity>

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
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleFlip}
            style={styles.cardTouchable}
          >
            {/* Front of card */}
            <Animated.View style={[styles.cardFace, styles.cardFront, frontAnimatedStyle]}>
              <LinearGradient
                colors={[colors.accent.purple + '30', colors.accent.purple + '10']}
                style={styles.cardGradient}
              >
                <Text style={styles.cardSymbol}>{currentCard?.symbolEmoji}</Text>
                <Text style={styles.tapHint}>Tap to reveal</Text>
              </LinearGradient>
            </Animated.View>

            {/* Back of card */}
            <Animated.View style={[styles.cardFace, styles.cardBack, backAnimatedStyle]}>
              <LinearGradient
                colors={[colors.accent.gold + '30', colors.accent.gold + '15']}
                style={styles.cardGradient}
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
                  {currentCard?.arcana === 'major' ? 'Major Arcana' : currentCard?.suit}
                </Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Answer Buttons */}
        {isFlipped && (
          <View style={styles.answerButtons}>
            <TouchableOpacity
              onPress={() => handleAnswer(false)}
              style={styles.wrongButton}
            >
              <Text style={styles.answerButtonText}>{"✕ Didn't Know"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAnswer(true)}
              style={styles.correctButton}
            >
              <LinearGradient
                colors={['#10B981', '#34D399']}
                style={styles.correctGradient}
              >
                <Text style={styles.answerButtonTextWhite}>✓ Got It!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
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

  // Intro
  introContent: {
    flex: 1,
    padding: spacing.lg,
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
  introCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashcardIcon: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: colors.accent.purple + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  flashcardEmoji: {
    fontSize: 48,
  },
  introTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  introDescription: {
    fontSize: 16,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  statCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    minWidth: 100,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accent.purple,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.md,
  },
  startGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderRadius: 16,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },

  // Practice
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 24,
    color: colors.text.secondary,
    marginTop: -2,
  },
  progressContainer: {
    flex: 1,
    gap: spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.background.tertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.purple,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'right',
  },

  // Card
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  cardTouchable: {
    width: SCREEN_WIDTH - spacing.lg * 4,
    aspectRatio: 0.7,
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  cardFront: {
    zIndex: 2,
  },
  cardBack: {
    zIndex: 1,
  },
  cardGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: colors.accent.gold + '40',
    borderRadius: 24,
  },
  cardSymbol: {
    fontSize: 100,
    marginBottom: spacing.lg,
  },
  tapHint: {
    fontSize: 16,
    color: colors.text.tertiary,
    fontStyle: 'italic',
  },
  cardName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.accent.gold,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  keywordPill: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  keywordText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  arcanaLabel: {
    fontSize: 14,
    color: colors.text.tertiary,
    textTransform: 'capitalize',
  },

  // Answer Buttons
  answerButtons: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
  },
  wrongButton: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: 14,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.error + '40',
  },
  correctButton: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    ...shadows.md,
  },
  correctGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderRadius: 14,
  },
  answerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  answerButtonTextWhite: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },

  // Result
  resultContent: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  resultCenter: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  resultIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  resultEmoji: {
    fontSize: 48,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  resultScore: {
    fontSize: 64,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  resultSubtitle: {
    fontSize: 18,
    color: colors.text.tertiary,
    marginBottom: spacing.lg,
  },
  resultMessage: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: spacing.lg,
  },
  resultMessageText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  resultButtons: {
    gap: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.background.secondary,
    borderRadius: 14,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  doneButton: {
    borderRadius: 14,
    overflow: 'hidden',
    ...shadows.md,
  },
  doneGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderRadius: 14,
  },
  doneButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text.primary,
  },
});
