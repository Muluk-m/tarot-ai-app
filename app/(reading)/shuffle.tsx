import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ShuffleAnimation } from '@/components/reading/ShuffleAnimation';
import { useCardStore } from '@/stores/cardStore';
import { colors } from '@/theme/colors';

/**
 * Shuffle Screen
 * Displays card shuffle animation and proceeds to draw screen when complete
 *
 * Flow:
 * 1. Auto-starts shuffle animation on mount
 * 2. Shuffles deck in Zustand store
 * 3. Shows "Tap to Continue" after animation completes
 * 4. Navigates to draw screen
 */

export default function Shuffle() {
  const router = useRouter();
  const { shuffleDeck, spreadType } = useCardStore();
  const [shuffleComplete, setShuffleComplete] = useState(false);

  const handleShuffleComplete = () => {
    // Shuffle the deck in store
    shuffleDeck();
    setShuffleComplete(true);
  };

  const handleContinue = () => {
    router.push('/(reading)/draw');
  };

  return (
    <View style={styles.container}>
      {/* Shuffle animation */}
      <ShuffleAnimation onComplete={handleShuffleComplete} autoStart={true} />

      {/* Continue button (appears after shuffle completes) */}
      {shuffleComplete && (
        <View style={styles.continueContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>✨ Tap to Draw Your Cards</Text>
          </TouchableOpacity>

          <Text style={styles.spreadInfo}>
            {spreadType === 'single' ? 'Single Card Reading' : 'Three Card Spread'}
          </Text>
        </View>
      )}

      {/* Skip button (appears immediately) */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          shuffleDeck();
          router.push('/(reading)/draw');
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.skipButtonText}>Skip Animation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  continueContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  continueButton: {
    backgroundColor: colors.accent.gold,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
    minWidth: 250,
  },
  continueButtonText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  spreadInfo: {
    color: colors.text.secondary,
    fontSize: 14,
    marginTop: 12,
    opacity: 0.8,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.background.tertiary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent.gold,
    opacity: 0.7,
  },
  skipButtonText: {
    color: colors.accent.gold,
    fontSize: 12,
    fontWeight: '500',
  },
});
