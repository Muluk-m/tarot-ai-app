import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Tarot AI</Text>
      <Text style={styles.subtitle}>AI-Powered Mystical Guidance</Text>

      <TouchableOpacity
        style={styles.goldButton}
        onPress={() => router.push('/(reading)/spread-selection')}
        activeOpacity={0.8}
      >
        <Text style={styles.goldButtonText}>Daily Card Draw</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.purpleButton}
        onPress={() => router.push('/history')}
        activeOpacity={0.8}
      >
        <Text style={styles.purpleButtonText}>My History</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>For entertainment purposes only</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0E1A',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#CBD5E1',
    marginBottom: 48,
    textAlign: 'center',
  },
  goldButton: {
    backgroundColor: '#D4AF37',
    padding: 20,
    borderRadius: 12,
    width: 300,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  goldButtonText: {
    color: '#0A0E1A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  purpleButton: {
    backgroundColor: '#8B5CF6',
    padding: 20,
    borderRadius: 12,
    width: 300,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  purpleButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 32,
    textAlign: 'center',
  },
});
