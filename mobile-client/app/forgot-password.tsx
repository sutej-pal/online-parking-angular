import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { httpService } from '@/services/http.service'
import { NotificationService } from '@/services/notification.service'

interface ForgotPasswordForm {
  email: string
}

export default function ForgotPasswordScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>()

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsSubmitting(true)
    try {
      const response = await httpService.post('forgot-password', data)
      NotificationService.showSuccess(
        response.data.message || 'Password reset email sent'
      )
    } catch (error: any) {
      NotificationService.showError(
        error.response?.data?.message || 'Failed to send reset email'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </Text>
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

          <Button
            title={isSubmitting ? 'Sending...' : 'Send Reset Link'}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
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
    textAlign: 'center',
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

