import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAppInitialization } from '@/hooks/useAppInitialization';
import { usePersistence } from '@/hooks/usePersistence';
import { colors } from '@/theme/colors';

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingTitle}>✨ Tarot AI</Text>
      <ActivityIndicator size="large" color={colors.accent.gold} style={styles.spinner} />
      <Text style={styles.loadingText}>Aligning the stars...</Text>
    </View>
  );
}

function ErrorScreen({ error }: { error: string }) {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Initialization Failed</Text>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

export default function RootLayout() {
  const { isLoading, error } = useAppInitialization();

  // Auto-persist store changes after initialization
  usePersistence();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0E1A' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  loadingTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.accent.gold,
    marginBottom: 40,
    letterSpacing: 2,
  },
  spinner: {
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
