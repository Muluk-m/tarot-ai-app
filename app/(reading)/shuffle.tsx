import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ShuffleAnimation } from '@/components/reading/ShuffleAnimation';
import { useCardStore } from '@/stores/cardStore';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';

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
    router.push('/(reading)/draw-simple');
  };

  return (
    <View style={styles.container}>
      {/* Aurora Background Gradient */}
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#2E1A47', '#1E2638']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Shuffle animation */}
      <ShuffleAnimation
        onComplete={handleShuffleComplete}
        autoStart={true}
        hideTextOnComplete={true}
      />

      {/* Continue button (appears after shuffle completes) */}
      {shuffleComplete && (
        <View style={styles.continueContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[colors.accent.gold, colors.accent.goldLight]}
              style={styles.continueButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.continueButtonText}>✨ Reveal Your Vision</Text>
              <View style={styles.continueButtonArrow}>
                <Text style={styles.continueButtonArrowText}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.spreadInfo}>
            The celestial forces converge...
          </Text>
          <Text style={styles.spreadType}>
            {spreadType === 'single' ? '🌟 Daily Vision' : '✨ Tri-Realm Spread'}
          </Text>
        </View>
      )}

      {/* Skip button (appears immediately) */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => {
          shuffleDeck();
          router.push('/(reading)/draw-simple');
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
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  continueContainer: {
    position: 'absolute',
    bottom: spacing.xxxl,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.goldGlow,
    minWidth: 280,
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  continueButtonText: {
    color: colors.background.primary,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  continueButtonArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonArrowText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  spreadInfo: {
    color: colors.text.secondary,
    fontSize: 14,
    marginTop: spacing.md,
    opacity: 0.8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  spreadType: {
    color: colors.accent.gold,
    fontSize: 16,
    marginTop: spacing.sm,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: colors.accent.gold + '40',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.tertiary + 'CC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent.gold + '40',
  },
  skipButtonText: {
    color: colors.accent.gold,
    fontSize: 14,
    fontWeight: '600',
  },
});
