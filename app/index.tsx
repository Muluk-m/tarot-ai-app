import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-bg-primary px-6">
      <Text className="mb-2 text-4xl font-bold text-accent-gold">✨ Tarot AI</Text>
      <Text className="mb-12 text-lg text-text-secondary">AI-Powered Mystical Guidance</Text>

      <View className="w-full max-w-sm">
        <Pressable
          className="mb-4 rounded-xl bg-accent-gold px-6 py-4 active:bg-accent-gold-dark"
          onPress={() => router.push('/(reading)/spread-selection')}
        >
          <Text className="text-center text-lg font-semibold text-bg-primary">
            Daily Card Draw
          </Text>
        </Pressable>

        <Pressable
          className="rounded-xl bg-accent-purple px-6 py-4 active:bg-accent-purple-light"
          onPress={() => router.push('/history')}
        >
          <Text className="text-center text-lg font-semibold text-white">My History</Text>
        </Pressable>
      </View>

      <Text className="mt-8 text-xs text-text-tertiary">For entertainment purposes only</Text>
    </View>
  );
}
