import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCardStore } from '@/stores/cardStore';
import { useReadingStore } from '@/stores/readingStore';
import { useUserStore } from '@/stores/userStore';
import { SPREADS } from '@/data/spreads';
import { colors } from '@/theme/colors';

export default function SpreadSelection() {
  const router = useRouter();
  const { setSpreadType } = useCardStore();
  const { clearCurrentReading } = useReadingStore();

  const handleSelectSpread = (spreadKey: 'single' | 'three') => {
    console.log('🎴 [SpreadSelection] Starting new reading, clearing previous state');
    // Clear any previous reading to ensure fresh start
    clearCurrentReading();
    setSpreadType(spreadKey);
    router.push('/(reading)/shuffle');
  };

  const spreadOptions = [
    {
      key: 'single' as const,
      config: SPREADS.single,
      icon: '🌟',
      primaryColor: '#D4AF37',
    },
    {
      key: 'three' as const,
      config: SPREADS.three,
      icon: '✨',
      primaryColor: '#8B5CF6',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Your Spread</Text>
        <Text style={styles.subtitle}>
          Choose a reading type to begin your journey
        </Text>

        {/* Unlimited badge */}
        <View style={styles.unlimitedBadge}>
          <Text style={styles.unlimitedText}>✨ Unlimited Readings</Text>
        </View>

        <View style={styles.optionsContainer}>
          {spreadOptions.map((option) => (
            <Pressable
              key={option.key}
              onPress={() => handleSelectSpread(option.key)}
              style={({ pressed }) => [
                styles.optionCard,
                {
                  shadowColor: option.primaryColor,
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{option.icon}</Text>
              </View>

              <Text style={styles.optionTitle}>{option.config.name}</Text>

              <Text style={styles.optionDescription}>
                {option.config.description}
              </Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {option.config.cardCount}{' '}
                  {option.config.cardCount === 1 ? 'Card' : 'Cards'}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Text style={styles.disclaimer}>
          For entertainment purposes only
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accent.gold,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  unlimitedBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  unlimitedText: {
    color: colors.accent.gold,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  optionsContainer: {
    width: '100%',
    maxWidth: 448,
    gap: 16,
  },
  optionCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 48,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.accent.gold,
    textAlign: 'center',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: colors.accent.purple,
    fontSize: 12,
    fontWeight: '600',
  },
  disclaimer: {
    color: colors.text.tertiary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 32,
    opacity: 0.6,
  },
});
