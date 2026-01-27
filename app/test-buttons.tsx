import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function TestButtons() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button Test</Text>

      <Pressable
        style={styles.button1}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>BUTTON 1 (GOLD)</Text>
      </Pressable>

      <Pressable
        style={styles.button2}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>BUTTON 2 (PURPLE)</Text>
      </Pressable>

      <View style={styles.box}>
        <Text style={styles.boxText}>This is a View with background</Text>
      </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  button1: {
    backgroundColor: '#D4AF37',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#FF0000',
  },
  button2: {
    backgroundColor: '#8B5CF6',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#00FF00',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: '#FF0000',
    padding: 20,
    width: '100%',
    marginTop: 20,
  },
  boxText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
