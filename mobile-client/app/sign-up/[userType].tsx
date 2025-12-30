import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { httpService } from '@/services/http.service'
import { NotificationService } from '@/services/notification.service'

interface SignUpForm {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export default function SignUpScreen() {
  const router = useRouter()
  const { userType } = useLocalSearchParams<{ userType: string }>()
  const [isSigningUp, setIsSigningUp] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpForm>()

  const onSubmit = async (data: SignUpForm) => {
    setIsSigningUp(true)
    try {
      const response = await httpService.post(`sign-up/${userType}`, data)
      NotificationService.showSuccess(response.data.message || 'Sign up successful')
      router.replace('/login')
    } catch (error: any) {
      NotificationService.showError(
        error.response?.data?.message || 'Sign up failed'
      )
    } finally {
      setIsSigningUp(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up as {userType}</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="firstName"
            rules={{ required: 'First name is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="First Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.firstName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            rules={{ required: 'Last name is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Last Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.lastName?.message}
              />
            )}
          />

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
              <Input
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />

          <Button
            title={isSigningUp ? 'Signing up...' : 'Sign Up'}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            disabled={isSigningUp}
            loading={isSigningUp}
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
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  submitButton: {
    marginTop: 8,
  },
})

