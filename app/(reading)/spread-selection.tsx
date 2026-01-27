import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useCardStore } from '@/stores/cardStore';
import { useUserStore } from '@/stores/userStore';
import { SPREADS } from '@/data/spreads';
import { colors } from '@/theme/colors';

export default function SpreadSelection() {
  const router = useRouter();
  const { setSpreadType } = useCardStore();
  const { dailyLimit } = useUserStore();
  const { FREE_DAILY_LIMIT } = { FREE_DAILY_LIMIT: 3 };

  const remainingReads = Math.max(0, FREE_DAILY_LIMIT - dailyLimit.count);

  const handleSelectSpread = (spreadKey: 'single' | 'three') => {
    if (remainingReads <= 0) {
      // TODO: Show paywall modal
      alert('Daily limit reached! Upgrade to premium for unlimited readings.');
      return;
    }

    setSpreadType(spreadKey);
    router.push('/(reading)/shuffle');
  };

  const spreadOptions = [
    {
      key: 'single' as const,
      config: SPREADS.single,
      icon: '🌟',
      gradient: ['#D4AF37', '#F4D03F'],
    },
    {
      key: 'three' as const,
      config: SPREADS.three,
      icon: '✨',
      gradient: ['#8B5CF6', '#A78BFA'],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-bg-primary">
      <View className="items-center justify-center py-16 px-6">
        {/* Header */}
        <Text className="text-3xl font-bold text-accent-gold mb-3">Select Your Spread</Text>
        <Text className="text-base text-text-secondary mb-2 text-center">
          Choose a reading type to begin your journey
        </Text>

        {/* Remaining reads counter */}
        <View className="bg-bg-tertiary px-4 py-2 rounded-lg mb-8 border border-accent-gold/30">
          <Text className="text-accent-gold text-sm font-semibold">
            {remainingReads} readings left today
          </Text>
        </View>

        {/* Spread options */}
        <View className="w-full max-w-md gap-4">
          {spreadOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => handleSelectSpread(option.key)}
              activeOpacity={0.8}
              className="bg-bg-secondary rounded-xl p-6 border-2 border-accent-gold/40"
              style={{
                shadowColor: option.gradient[0],
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              {/* Icon */}
              <View className="items-center mb-3">
                <Text style={{ fontSize: 48 }}>{option.icon}</Text>
              </View>

              {/* Title */}
              <Text className="text-xl font-bold text-accent-gold text-center mb-2">
                {option.config.name}
              </Text>

              {/* Description */}
              <Text className="text-sm text-text-secondary text-center mb-4">
                {option.config.description}
              </Text>

              {/* Card count badge */}
              <View className="self-center bg-accent-purple/20 px-3 py-1 rounded-full">
                <Text className="text-accent-purple text-xs font-semibold">
                  {option.config.cardCount} {option.config.cardCount === 1 ? 'Card' : 'Cards'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Disclaimer */}
        <Text className="text-text-tertiary text-xs text-center mt-8 opacity-60">
          For entertainment purposes only
        </Text>
      </View>
    </ScrollView>
  );
}
