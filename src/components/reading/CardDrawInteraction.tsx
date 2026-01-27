import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useCardFlip } from '@/hooks/useCardFlip';
import { TarotCardDisplay } from '@/components/tarot/TarotCardDisplay';
import { CardBack } from '@/components/tarot/CardBack';
import type { TarotCard } from '@/types/tarot.types';
import { colors } from '@/theme/colors';

/**
 * Card Draw Interaction Component
 * Interactive card with flip animation and selection state
 *
 * Features:
 * - Tap to flip card (600ms smooth 3D rotation)
 * - Gold glow effect when selected
 * - Shows card back initially
 * - Reveals card face on flip
 * - Haptic feedback on tap
 */

interface CardDrawInteractionProps {
  card: TarotCard;
  position?: 'past' | 'present' | 'future';
  isRevealed?: boolean;
  onReveal?: (card: TarotCard) => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const CardDrawInteraction: React.FC<CardDrawInteractionProps> = ({
  card,
  position,
  isRevealed = false,
  onReveal,
  size = 'medium',
  disabled = false,
}) => {
  const { flipProgress, isFlipped, flipCard, getFrontRotation, getBackRotation } = useCardFlip();

  const handlePress = async () => {
    if (disabled || isFlipped.value) return;

    // Haptic feedback (optional)
    // await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    flipCard();
    onReveal?.(card);
  };

  // Animated style for front face (card back)
  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${getFrontRotation()}deg` },
      ],
      backfaceVisibility: 'hidden' as any,
      opacity: flipProgress.value < 0.5 ? 1 : 0,
    };
  });

  // Animated style for back face (card front)
  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${getBackRotation()}deg` },
      ],
      backfaceVisibility: 'hidden' as any,
      opacity: flipProgress.value >= 0.5 ? 1 : 0,
    };
  });

  const sizes = {
    small: { width: 90, height: 135 },
    medium: { width: 120, height: 180 },
    large: { width: 150, height: 225 },
  };

  const currentSize = sizes[size];

  return (
    <View style={styles.container}>
      {/* Position label (if provided) */}
      {position && (
        <View style={styles.positionBadge}>
          <Text style={styles.positionText}>{position.toUpperCase()}</Text>
        </View>
      )}

      {/* Flip container */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        disabled={disabled || isFlipped.value}
        style={[
          styles.cardContainer,
          { width: currentSize.width, height: currentSize.height },
        ]}
      >
        {/* Front face - Card back */}
        <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>
          <CardBack width={currentSize.width} height={currentSize.height} />
        </Animated.View>

        {/* Back face - Card front */}
        <Animated.View style={[styles.cardFace, styles.backFace, backAnimatedStyle]}>
          <TarotCardDisplay
            card={card}
            size={size}
            showName={true}
            glowEffect={true}
          />
        </Animated.View>

        {/* Tap hint (only show if not flipped) */}
        {!isFlipped.value && (
          <Animated.View style={[styles.tapHint, { opacity: flipProgress.value === 0 ? 1 : 0 }]}>
            <Text style={styles.tapHintText}>Tap to reveal</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  positionBadge: {
    backgroundColor: colors.accent.purple,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  positionText: {
    color: colors.text.primary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  cardContainer: {
    position: 'relative',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backFace: {
    // Back face specific styles
  },
  tapHint: {
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
    backgroundColor: colors.background.overlay,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent.gold,
  },
  tapHintText: {
    color: colors.accent.gold,
    fontSize: 12,
    fontWeight: '500',
  },
});
