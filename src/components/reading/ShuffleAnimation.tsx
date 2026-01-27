import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useShuffleAnimation } from '@/hooks/useShuffleAnimation';
import { CardBack } from '@/components/tarot/CardBack';
import { colors } from '@/theme/colors';

/**
 * Shuffle Animation Component
 * Displays animated card deck during shuffle sequence
 *
 * Features:
 * - 20 animated card backs
 * - Smooth 60fps Reanimated animations
 * - 3D transforms (perspective)
 * - Auto-starts on mount
 * - Calls onComplete when finished
 */

interface ShuffleAnimationProps {
  onComplete?: () => void;
  autoStart?: boolean;
}

export const ShuffleAnimation: React.FC<ShuffleAnimationProps> = ({
  onComplete,
  autoStart = true,
}) => {
  const { cards, startShuffle } = useShuffleAnimation(20, onComplete);

  useEffect(() => {
    if (autoStart) {
      // Small delay before starting animation
      const timer = setTimeout(() => {
        startShuffle();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [autoStart]);

  return (
    <View style={styles.container}>
      {/* Background gradient effect */}
      <View style={styles.glowContainer}>
        <View style={[styles.glow, { backgroundColor: colors.accent.gold }]} />
      </View>

      {/* Animated cards */}
      <View style={styles.cardsContainer}>
        {cards.map((card, index) => {
          // Create animated style for each card
          const animatedStyle = useAnimatedStyle(() => {
            return {
              transform: [
                { translateX: card.translateX.value },
                { translateY: card.translateY.value },
                { perspective: 1000 },
                { rotateY: `${card.rotateY.value}deg` },
                { rotateZ: `${card.rotateZ.value}deg` },
                { scale: card.scale.value },
              ],
              opacity: card.opacity.value,
              zIndex: index,
            };
          });

          return (
            <Animated.View
              key={`card-${index}`}
              style={[styles.card, animatedStyle]}
            >
              <CardBack width={120} height={180} />
            </Animated.View>
          );
        })}
      </View>

      {/* Shuffle text indicator */}
      <View style={styles.textContainer}>
        <Text style={styles.shuffleText}>Shuffling the cards...</Text>
        <Text style={styles.subText}>The cosmos align</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  glow: {
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.1,
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 10,
  },
  cardsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '60%',
    position: 'relative',
    zIndex: 1,
  },
  card: {
    position: 'absolute',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  textContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    zIndex: 2,
  },
  shuffleText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.accent.gold,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subText: {
    fontSize: 14,
    color: colors.text.secondary,
    opacity: 0.8,
    fontStyle: 'italic',
  },
});
