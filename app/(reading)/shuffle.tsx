/**
 * Shuffle Screen - 洗牌动画
 * iPad 和 iOS 适配
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ShuffleAnimation } from '@/components/reading/ShuffleAnimation';
import { useCardStore } from '@/stores/cardStore';
import { colors } from '@/theme/colors';

// UI Components
import {
  ScreenContainer,
  Row,
  Spacer,
  responsive,
  StarIcon,
  SparklesIcon,
  ChevronRightIcon,
} from '@/components/ui';

export default function Shuffle() {
  const router = useRouter();
  const { shuffleDeck, spreadType } = useCardStore();
  const [shuffleComplete, setShuffleComplete] = useState(false);

  const handleShuffleComplete = () => {
    shuffleDeck();
    setShuffleComplete(true);
  };

  const handleContinue = () => {
    router.push('/(reading)/draw-simple');
  };

  const handleSkip = () => {
    shuffleDeck();
    router.push('/(reading)/draw-simple');
  };

  return (
    <ScreenContainer>
      {/* Aurora Background Gradient */}
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#2E1A47', '#1E2638']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Shuffle Animation */}
      <View style={styles.animationContainer}>
        <ShuffleAnimation
          onComplete={handleShuffleComplete}
          autoStart={true}
          hideTextOnComplete={true}
        />
      </View>

      {/* Continue Section */}
      {shuffleComplete && (
        <View style={styles.continueContainer}>
          <Pressable
            onPress={handleContinue}
            style={({ pressed }) => [
              styles.continueButton,
              pressed && styles.continueButtonPressed,
            ]}
          >
            <LinearGradient
              colors={[colors.accent.gold, colors.accent.goldLight]}
              style={styles.continueButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Row align="center" gap={responsive.spacing(10, 14)}>
                <SparklesIcon size={responsive.width(20, 24)} color={colors.background.primary} />
                <Text style={styles.continueButtonText}>揭示你的命运</Text>
                <View style={styles.continueButtonArrow}>
                  <ChevronRightIcon size={18} color={colors.background.primary} />
                </View>
              </Row>
            </LinearGradient>
          </Pressable>

          <Spacer size={responsive.spacing(16, 20)} />

          <Text style={styles.spreadInfo}>星象之力正在汇聚...</Text>

          <Row align="center" gap={8} style={styles.spreadTypeRow}>
            {spreadType === 'single' ? (
              <StarIcon size={18} color={colors.accent.gold} />
            ) : (
              <SparklesIcon size={18} color={colors.accent.gold} />
            )}
            <Text style={styles.spreadType}>
              {spreadType === 'single' ? '每日一卡' : '三牌阵'}
            </Text>
          </Row>
        </View>
      )}

      {/* Skip Button */}
      <Pressable
        onPress={handleSkip}
        style={({ pressed }) => [
          styles.skipButton,
          pressed && styles.skipButtonPressed,
        ]}
      >
        <Text style={styles.skipButtonText}>跳过动画</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueContainer: {
    position: 'absolute',
    bottom: responsive.spacing(60, 80),
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: responsive.spacing(24, 48),
  },
  continueButton: {
    borderRadius: responsive.width(16, 20),
    overflow: 'hidden',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    minWidth: responsive.width(280, 340),
  },
  continueButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  continueButtonGradient: {
    paddingVertical: responsive.spacing(16, 20),
    paddingHorizontal: responsive.spacing(28, 36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: colors.background.primary,
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  continueButtonArrow: {
    width: responsive.width(28, 34),
    height: responsive.width(28, 34),
    borderRadius: responsive.width(14, 17),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spreadInfo: {
    color: colors.text.secondary,
    fontSize: responsive.fontSize(14, 16),
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.8,
  },
  spreadTypeRow: {
    marginTop: responsive.spacing(8, 12),
  },
  spreadType: {
    color: colors.accent.gold,
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
    textShadowColor: 'rgba(212, 175, 55, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  skipButton: {
    position: 'absolute',
    top: responsive.spacing(60, 70),
    right: responsive.spacing(20, 32),
    paddingVertical: responsive.spacing(10, 12),
    paddingHorizontal: responsive.spacing(16, 20),
    backgroundColor: 'rgba(42, 47, 62, 0.85)',
    borderRadius: responsive.width(12, 14),
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  skipButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  skipButtonText: {
    color: colors.accent.gold,
    fontSize: responsive.fontSize(14, 16),
    fontWeight: '600',
  },
});
