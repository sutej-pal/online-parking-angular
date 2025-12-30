import { View, Text, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useIndividualStore } from '@/store/individualStore'
import { Button } from '@/components/ui/Button'
import { AuthService } from '@/services/auth.service'

export default function ProfileScreen() {
  const router = useRouter()
  const individual = useIndividualStore((state) => state.individual)

  const handleLogout = async () => {
    useIndividualStore.getState().clearIndividual()
    await AuthService.removeToken()
    router.replace('/login')
  }

  if (!individual?.id) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Please log in</Text>
        <Button
          title="Login"
          onPress={() => router.push('/login')}
          variant="primary"
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.info}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>
          {individual.firstName} {individual.lastName}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{individual.email}</Text>
      </View>
      <Button
        title="Log Out"
        onPress={handleLogout}
        variant="outline"
        style={styles.logoutButton}
      />
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
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1f2937',
  },
  logoutButton: {
    marginTop: 32,
  },
})

