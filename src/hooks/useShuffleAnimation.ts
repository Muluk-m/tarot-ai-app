import { useMemo } from 'react';
import {
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  type SharedValue,
} from 'react-native-reanimated';
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
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  rotateZ: SharedValue<number>;
  rotateY: SharedValue<number>;
  scale: SharedValue<number>;
  opacity: SharedValue<number>;
}

// Helper hook to create animation values for a single card
function useCardAnimationValues(): CardAnimationValues {
  return {
    translateX: useSharedValue(0),
    translateY: useSharedValue(0),
    rotateZ: useSharedValue(0),
    rotateY: useSharedValue(0),
    scale: useSharedValue(1),
    opacity: useSharedValue(1),
  };
}

export function useShuffleAnimation(onComplete?: () => void) {
  // Create shared values for each card at the top level (hooks must be called unconditionally)
  // We use a fixed count of CARD_COUNT since hooks cannot be called dynamically
  const card0 = useCardAnimationValues();
  const card1 = useCardAnimationValues();
  const card2 = useCardAnimationValues();
  const card3 = useCardAnimationValues();
  const card4 = useCardAnimationValues();
  const card5 = useCardAnimationValues();
  const card6 = useCardAnimationValues();
  const card7 = useCardAnimationValues();
  const card8 = useCardAnimationValues();
  const card9 = useCardAnimationValues();
  const card10 = useCardAnimationValues();
  const card11 = useCardAnimationValues();
  const card12 = useCardAnimationValues();
  const card13 = useCardAnimationValues();
  const card14 = useCardAnimationValues();
  const card15 = useCardAnimationValues();
  const card16 = useCardAnimationValues();
  const card17 = useCardAnimationValues();
  const card18 = useCardAnimationValues();
  const card19 = useCardAnimationValues();

  const cards: CardAnimationValues[] = useMemo(
    () => [
      card0,
      card1,
      card2,
      card3,
      card4,
      card5,
      card6,
      card7,
      card8,
      card9,
      card10,
      card11,
      card12,
      card13,
      card14,
      card15,
      card16,
      card17,
      card18,
      card19,
    ],
    [
      card0,
      card1,
      card2,
      card3,
      card4,
      card5,
      card6,
      card7,
      card8,
      card9,
      card10,
      card11,
      card12,
      card13,
      card14,
      card15,
      card16,
      card17,
      card18,
      card19,
    ]
  );

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
      const delay = index * (SHUFFLE_DURATION / CARD_COUNT / 2);

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
