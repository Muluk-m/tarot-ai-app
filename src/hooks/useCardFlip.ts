import { useSharedValue, withTiming, Easing, interpolate } from 'react-native-reanimated';

/**
 * Card Flip Animation Hook
 * Creates smooth 3D card flip animation
 *
 * Duration: 600ms
 * Easing: ease-out
 */

export function useCardFlip() {
  const flipProgress = useSharedValue(0);
  const isFlipped = useSharedValue(false);

  const flipCard = () => {
    isFlipped.value = !isFlipped.value;
    flipProgress.value = withTiming(isFlipped.value ? 1 : 0, {
      duration: 600,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const resetFlip = () => {
    isFlipped.value = false;
    flipProgress.value = 0;
  };

  // Front face rotation (card back)
  const getFrontRotation = () => {
    return interpolate(flipProgress.value, [0, 1], [0, 180]);
  };

  // Back face rotation (card front)
  const getBackRotation = () => {
    return interpolate(flipProgress.value, [0, 1], [180, 360]);
  };

  return {
    flipProgress,
    isFlipped,
    flipCard,
    resetFlip,
    getFrontRotation,
    getBackRotation,
  };
}
