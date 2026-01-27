import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { shadows } from '@/theme/shadows';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Animated background gradient */}
      <LinearGradient
        colors={['#0A0E1A', '#1A0E2E', '#2E1A47', '#1E2638']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          {/* Logo/Icon with glow */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={[colors.accent.gold, colors.accent.goldLight]}
              style={styles.logoGradient}
            >
              <Text style={styles.logoIcon}>🔮</Text>
            </LinearGradient>
          </View>

          {/* Title with gradient text effect */}
          <Text style={styles.title}>Celestial Eye</Text>
          <Text style={styles.subtitle}>
            Gaze into the cosmos and unveil{'\n'}your destiny through ancient wisdom
          </Text>

          {/* Feature highlights */}
          <View style={styles.featuresRow}>
            <View style={styles.featurePill}>
              <Text style={styles.featurePillText}>🌙 Unlimited Visions</Text>
            </View>
            <View style={styles.featurePill}>
              <Text style={styles.featurePillText}>✨ Celestial Wisdom</Text>
            </View>
          </View>
        </View>

        {/* Main action cards */}
        <View style={styles.cardsContainer}>
          {/* Primary Card: Daily Reading (Single Card) */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              // Set single card spread and go directly to shuffle
              const { setSpreadType } = require('@/stores/cardStore').useCardStore.getState();
              const { clearCurrentReading } = require('@/stores/readingStore').useReadingStore.getState();
              clearCurrentReading();
              setSpreadType('single');
              router.push('/(reading)/shuffle');
            }}
            style={styles.primaryCard}
          >
            <LinearGradient
              colors={[colors.accent.gold + '20', colors.accent.gold + '10']}
              style={styles.cardGradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardIconContainer}>
                  <Text style={styles.cardIcon}>🌟</Text>
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>Daily Vision</Text>
                  <Text style={styles.cardDescription}>
                    Glimpse what the celestial realm reveals for today
                  </Text>
                </View>
                <View style={styles.cardArrow}>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Secondary Cards Grid */}
          <View style={styles.secondaryCardsGrid}>
            {/* History Card */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push('/history')}
              style={styles.secondaryCard}
            >
              <LinearGradient
                colors={[colors.accent.purple + '20', colors.accent.purple + '10']}
                style={styles.secondaryCardGradient}
              >
                <Text style={styles.secondaryCardIcon}>📖</Text>
                <Text style={styles.secondaryCardTitle}>My Visions</Text>
                <Text style={styles.secondaryCardSubtitle}>Past revelations</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Three Card Reading */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                // Set three card spread and go directly to shuffle
                const { setSpreadType } = require('@/stores/cardStore').useCardStore.getState();
                const { clearCurrentReading } = require('@/stores/readingStore').useReadingStore.getState();
                clearCurrentReading();
                setSpreadType('three');
                router.push('/(reading)/shuffle');
              }}
              style={styles.secondaryCard}
            >
              <LinearGradient
                colors={[colors.accent.cyan + '20', colors.accent.cyan + '10']}
                style={styles.secondaryCardGradient}
              >
                <Text style={styles.secondaryCardIcon}>✨</Text>
                <Text style={styles.secondaryCardTitle}>Tri-Realm Spread</Text>
                <Text style={styles.secondaryCardSubtitle}>Past Present Future</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>∞</Text>
            <Text style={styles.statLabel}>Visions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>78</Text>
            <Text style={styles.statLabel}>Sacred Cards</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>✨</Text>
            <Text style={styles.statLabel}>Celestial</Text>
          </View>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          For entertainment and self-reflection purposes only
        </Text>
      </ScrollView>
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
  scrollContent: {
    paddingTop: spacing.xxxl + spacing.lg,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.goldGlow,
  },
  logoIcon: {
    fontSize: 48,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.accent.gold,
    marginBottom: spacing.sm,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: colors.accent.gold + '40',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  featurePill: {
    backgroundColor: colors.background.tertiary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.accent.gold + '30',
  },
  featurePillText: {
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
  },

  // Cards Section
  cardsContainer: {
    marginBottom: spacing.xl,
  },
  primaryCard: {
    marginBottom: spacing.lg,
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.goldGlow,
  },
  cardGradient: {
    borderWidth: 1,
    borderColor: colors.accent.gold + '40',
    borderRadius: 24,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    minHeight: 100,
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text.tertiary,
    lineHeight: 20,
  },
  cardArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent.gold + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 18,
    color: colors.accent.gold,
    fontWeight: 'bold',
  },

  // Secondary Cards
  secondaryCardsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  secondaryCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.md,
  },
  secondaryCardGradient: {
    padding: spacing.lg,
    minHeight: 140,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  secondaryCardIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  secondaryCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  secondaryCardSubtitle: {
    fontSize: 12,
    color: colors.text.tertiary,
  },

  // Stats Section
  statsSection: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary + '80',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.accent.gold + '20',
    ...shadows.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.accent.gold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.accent.gold + '20',
    marginHorizontal: spacing.sm,
  },

  // Disclaimer
  disclaimer: {
    fontSize: 11,
    color: colors.text.quaternary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: spacing.xl,
  },
});
