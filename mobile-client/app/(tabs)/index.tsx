import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { Button } from '@/components/ui/Button'
import { SearchBar } from '@/components/SearchBar'
import { useIndividualStore } from '@/store/individualStore'

export default function HomeScreen() {
  const router = useRouter()
  const individual = useIndividualStore((state) => state.individual)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Online Parking</Text>
        {!individual?.id ? (
          <View style={styles.authButtons}>
            <Button
              title="Login"
              onPress={() => router.push('/login')}
              variant="primary"
            />
            <Button
              title="Sign Up"
              onPress={() => router.push('/sign-up/individual')}
              variant="secondary"
            />
          </View>
        ) : (
          <Button
            title="Profile"
            onPress={() => router.push('/individual')}
            variant="secondary"
          />
        )}
      </View>
      <SearchBar />
      <View style={styles.content}>
        <Text style={styles.comingSoon}>Coming Soon ...</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  comingSoon: {
    fontSize: 18,
    color: '#6b7280',
  },
})

