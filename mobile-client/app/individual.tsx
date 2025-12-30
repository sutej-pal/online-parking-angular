import { View, Text, StyleSheet } from 'react-native'
import { useIndividualStore } from '@/store/individualStore'

export default function IndividualScreen() {
  const individual = useIndividualStore((state) => state.individual)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Individual Dashboard</Text>
      {individual && (
        <View style={styles.info}>
          <Text style={styles.label}>Welcome, {individual.firstName}!</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  info: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#1f2937',
  },
})

