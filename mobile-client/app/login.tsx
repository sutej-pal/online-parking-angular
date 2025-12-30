import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useIndividualStore } from '@/store/individualStore'
import { AuthService } from '@/services/auth.service'
import { httpService } from '@/services/http.service'
import { NotificationService } from '@/services/notification.service'

interface LoginForm {
  email: string
  password: string
}

export default function LoginScreen() {
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const { setIndividual } = useIndividualStore()

  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      email: 'sutejpal@hotmail.com',
      password: 'Default@123',
    },
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoggingIn(true)
    try {
      const response = await httpService.post('login', data)
      const userData = response.data.data
      setIndividual(userData)
      if (userData.token) {
        AuthService.setToken(userData.token)
      }
      NotificationService.showSuccess(response.data.message || 'Login successful')
      router.replace('/(tabs)')
    } catch (error: any) {
      NotificationService.showError(
        error.response?.data?.message || 'Login failed'
      )
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Log in</Text>
          <Text style={styles.subtitle}>Enter your email and password.</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Input
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email?.message}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <Input
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  error={errors.password?.message}
                />
              </View>
            )}
          />

          <Button
            title="Forgot your Password?"
            onPress={() => router.push('/forgot-password')}
            variant="text"
            style={styles.forgotPassword}
          />

          <Button
            title={isLoggingIn ? 'Logging in...' : 'Login'}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            disabled={isLoggingIn}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 8,
  },
})

