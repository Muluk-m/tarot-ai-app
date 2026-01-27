import { useEffect } from 'react';
import { useSharedValue, withTiming, withSequence, withDelay, Easing } from 'react-native-reanimated';
import { Dimensions } from 'react-native';

/**
 * Shuffle Animation Hook
 * Creates smooth 60fps shuffle animation using React Native Reanimated
 *
 * Features:
 * - Random card positions with realistic movement
 * - 3D rotation effects (rotateY, rotateZ)
 * - Staggered timing for natural shuffle feel
 * - 2.5s total duration
 * - Cards return to deck at end
 */

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = 120;
const CARD_HEIGHT = 180;
const SHUFFLE_DURATION = 2500;
const CARD_COUNT = 20; // Animate subset for performance

export interface CardAnimationValues {
  translateX: any; // Reanimated SharedValue
  translateY: any;
  rotateZ: any;
  rotateY: any;
  scale: any;
  opacity: any;
}

export function useShuffleAnimation(
  cardCount: number = CARD_COUNT,
  onComplete?: () => void
) {
  // Create shared values for each card
  const cards: CardAnimationValues[] = Array.from({ length: cardCount }, () => ({
    translateX: useSharedValue(0),
    translateY: useSharedValue(0),
    rotateZ: useSharedValue(0),
    rotateY: useSharedValue(0),
    scale: useSharedValue(1),
    opacity: useSharedValue(1),
  }));

  const isShuffling = useSharedValue(false);

  const startShuffle = () => {
    isShuffling.value = true;

    cards.forEach((card, index) => {
      // Calculate random target position
      const randomX = (Math.random() - 0.5) * (SCREEN_WIDTH - CARD_WIDTH);
      const randomY = (Math.random() - 0.5) * (SCREEN_HEIGHT - CARD_HEIGHT - 200);
      const randomRotateZ = (Math.random() - 0.5) * 360;
      const randomRotateY = Math.random() * 180;
      const randomScale = 0.8 + Math.random() * 0.4; // 0.8 - 1.2

      // Staggered delay for each card
      const delay = index * (SHUFFLE_DURATION / cardCount / 2);

      // Animate to random position
      card.translateX.value = withDelay(
        delay,
        withSequence(
          withTiming(randomX, {
            duration: SHUFFLE_DURATION / 2,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          withTiming(0, {
            duration: SHUFFLE_DURATION / 2,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        )
      );

      card.translateY.value = withDelay(
        delay,
        withSequence(
          withTiming(randomY, {
            duration: SHUFFLE_DURATION / 2,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          withTiming(0, {
            duration: SHUFFLE_DURATION / 2,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        )
      );

      card.rotateZ.value = withDelay(
        delay,
        withSequence(
          withTiming(randomRotateZ, {
            duration: SHUFFLE_DURATION / 2,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          withTiming(0, {
            duration: SHUFFLE_DURATION / 2,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        )
      );

      card.rotateY.value = withDelay(
        delay,
        withSequence(
          withTiming(randomRotateY, {
            duration: SHUFFLE_DURATION / 2,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          withTiming(0, {
            duration: SHUFFLE_DURATION / 2,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        )
      );

      card.scale.value = withDelay(
        delay,
        withSequence(
          withTiming(randomScale, {
            duration: SHUFFLE_DURATION / 2,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
          withTiming(1, {
            duration: SHUFFLE_DURATION / 2,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        )
      );
    });

    // Call onComplete after animation finishes
    setTimeout(() => {
      isShuffling.value = false;
      onComplete?.();
    }, SHUFFLE_DURATION + 200);
  };

  const resetAnimation = () => {
    cards.forEach((card) => {
      card.translateX.value = 0;
      card.translateY.value = 0;
      card.rotateZ.value = 0;
      card.rotateY.value = 0;
      card.scale.value = 1;
      card.opacity.value = 1;
    });
    isShuffling.value = false;
  };

  return {
    cards,
    isShuffling,
    startShuffle,
    resetAnimation,
  };
}
