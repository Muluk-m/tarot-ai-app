/**
 * SIMPLE VERSION FOR TESTING BLACK SCREEN ISSUE
 * Replace app/index.tsx with this content temporarily
 */

import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Tarot AI</Text>
      <Text style={styles.subtitle}>AI-Powered Mystical Guidance</Text>
      <Text style={styles.status}>✅ App is working!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#CBD5E1',
    marginBottom: 24,
  },
  status: {
    fontSize: 16,
    color: '#10B981',
    marginTop: 24,
  },
});
