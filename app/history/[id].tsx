/**
 * History Detail Screen
 * iPad and iOS compatible
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useReadingStore } from '@/stores/readingStore';
import { TarotCardDisplay } from '@/components/tarot/TarotCardDisplay';
import { colors } from '@/theme/colors';

// UI Components
import {
  ScreenContainer,
  Row,
  Spacer,
  responsive,
  isTablet,
  ChevronLeftIcon,
  SparklesIcon,
  StarIcon,
  TrashIcon,
  CrystalBallIcon,
} from '@/components/ui';
import { IconButton } from '@/components/ui/Buttons';

export default function HistoryDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { readingHistory, toggleFavorite, deleteFromHistory } = useReadingStore();

  const reading = readingHistory.find((r) => r.id === id);

  if (!reading) {
    return (
      <ScreenContainer>
        <LinearGradient
          colors={['#0A0E1A', '#1A0E2E', '#2E1A47', '#1E2638']}
          style={styles.backgroundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <View style={styles.errorContainer}>
          <View style={styles.errorIconContainer}>
            <CrystalBallIcon size={responsive.width(60, 80)} color={colors.text.tertiary} />
          </View>
          <Text style={styles.errorTitle}>Record Not Found</Text>
          <Text style={styles.errorSubtitle}>This reading may have been deleted</Text>

          <Spacer size={responsive.spacing(24, 32)} />

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.errorButton,
              pressed && styles.errorButtonPressed,
            ]}
          >
            <Text style={styles.errorButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  const positions = reading.spreadType === 'three' ? (['past', 'present', 'future'] as const) : undefined;

  const handleToggleFavorite = () => {
    toggleFavorite(id);
  };

  const handleDelete = () => {
    deleteFromHistory(id);
    router.back();
  };

  return (
    <ScreenContainer>
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
        {/* Header */}
        <Row justify="space-between" align="center" style={styles.header}>
          <IconButton
            icon={<ChevronLeftIcon size={20} color={colors.text.primary} />}
            onPress={() => router.back()}
            variant="filled"
            size="md"
          />
          <Text style={styles.headerTitle}>Reading Details</Text>
          <IconButton
            icon={<StarIcon size={20} color={reading.favorite ? '#FFD700' : colors.text.secondary} />}
            onPress={handleToggleFavorite}
            variant="filled"
            size="md"
          />
        </Row>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Row align="center" gap={10}>
            {reading.spreadType === 'single' ? (
              <StarIcon size={responsive.width(24, 28)} color={colors.accent.gold} />
            ) : (
              <SparklesIcon size={responsive.width(24, 28)} color={colors.accent.gold} />
            )}
            <Text style={styles.title}>
              {reading.spreadType === 'single' ? 'Daily Card' : 'Three Card Spread'}
            </Text>
          </Row>
          <Text style={styles.date}>{reading.dateFormatted}</Text>
        </View>

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Cards Display */}
        <View style={[styles.cardsContainer, isTablet && styles.cardsContainerTablet]}>
          {reading.cards.map((cardData, index) => (
            <TarotCardDisplay
              key={cardData.card.id}
              card={cardData.card}
              size={reading.spreadType === 'single' ? 'large' : 'medium'}
              showName={true}
              showPosition={reading.spreadType === 'three'}
              position={positions?.[index]}
              glowEffect={true}
            />
          ))}
        </View>

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Interpretation Section */}
        <View style={styles.interpretationContainer}>
          <LinearGradient
            colors={['rgba(212, 175, 55, 0.08)', 'rgba(139, 92, 246, 0.05)']}
            style={styles.interpretationGradient}
          />

          <Row align="center" gap={10} style={styles.interpretationHeader}>
            <SparklesIcon size={22} color={colors.accent.gold} />
            <Text style={styles.interpretationTitle}>Interpretation</Text>
          </Row>

          <Text style={styles.interpretationText}>{reading.interpretation}</Text>
        </View>

        <Spacer size={responsive.spacing(24, 32)} />

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* New Reading Button */}
          <Pressable
            onPress={() => router.push('/')}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
          >
            <LinearGradient
              colors={[colors.accent.gold, colors.accent.goldLight]}
              style={styles.primaryButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Row align="center" gap={10}>
                <SparklesIcon size={20} color={colors.background.primary} />
                <Text style={styles.primaryButtonText}>New Reading</Text>
              </Row>
            </LinearGradient>
          </Pressable>

          <Spacer size={responsive.spacing(12, 16)} />

          {/* Delete Button */}
          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deleteButtonPressed,
            ]}
          >
            <Row align="center" justify="center" gap={8}>
              <TrashIcon size={18} color={colors.error} />
              <Text style={styles.deleteButtonText}>Delete Record</Text>
            </Row>
          </Pressable>
        </View>

        <Spacer size={responsive.spacing(32, 48)} />
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: responsive.spacing(20, 32),
    paddingTop: responsive.spacing(16, 24),
    paddingBottom: responsive.spacing(24, 40),
  },
  header: {
    marginBottom: responsive.spacing(20, 24),
  },
  headerTitle: {
    fontSize: responsive.fontSize(18, 20),
    fontWeight: '600',
    color: colors.text.primary,
  },
  titleSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: responsive.fontSize(28, 34),
    fontWeight: '700',
    color: colors.accent.gold,
    textShadowColor: 'rgba(212, 175, 55, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  date: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.secondary,
    marginTop: responsive.spacing(8, 10),
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: responsive.spacing(16, 24),
  },
  cardsContainerTablet: {
    gap: responsive.spacing(24, 36),
  },
  interpretationContainer: {
    borderRadius: responsive.width(20, 24),
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    overflow: 'hidden',
    backgroundColor: 'rgba(10, 14, 26, 0.8)',
  },
  interpretationGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  interpretationHeader: {
    padding: responsive.spacing(16, 20),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.2)',
  },
  interpretationTitle: {
    fontSize: responsive.fontSize(20, 24),
    fontWeight: '700',
    color: colors.accent.gold,
    letterSpacing: 0.3,
  },
  interpretationText: {
    padding: responsive.spacing(16, 24),
    fontSize: responsive.fontSize(16, 18),
    lineHeight: responsive.fontSize(26, 30),
    color: colors.text.primary,
    letterSpacing: 0.3,
  },
  actionsContainer: {
    paddingHorizontal: responsive.spacing(8, 24),
  },
  primaryButton: {
    borderRadius: responsive.width(16, 20),
    overflow: 'hidden',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonGradient: {
    paddingVertical: responsive.spacing(16, 20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.background.primary,
    fontSize: responsive.fontSize(18, 22),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingVertical: responsive.spacing(14, 18),
    borderRadius: responsive.width(12, 16),
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  deleteButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  deleteButtonText: {
    color: colors.error,
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive.spacing(40, 80),
  },
  errorIconContainer: {
    width: responsive.width(100, 130),
    height: responsive.width(100, 130),
    borderRadius: responsive.width(50, 65),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive.spacing(24, 32),
  },
  errorTitle: {
    fontSize: responsive.fontSize(24, 30),
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: responsive.spacing(12, 16),
  },
  errorSubtitle: {
    fontSize: responsive.fontSize(14, 16),
    color: colors.text.secondary,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: colors.accent.gold,
    paddingVertical: responsive.spacing(14, 18),
    paddingHorizontal: responsive.spacing(32, 40),
    borderRadius: responsive.width(12, 16),
  },
  errorButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  errorButtonText: {
    color: colors.background.primary,
    fontSize: responsive.fontSize(16, 18),
    fontWeight: '600',
  },
});
