'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import httpService from '@/shared/services/http.service'
import { NotificationService } from '@/shared/services/notification.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Loader } from '@/components/ui/loader'

interface SignUpForm {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export default function SignUpPage() {
  const params = useParams()
  const router = useRouter()
  const userType = params.userType as string
  const [isSigningUp, setIsSigningUp] = useState(false)

  const form = useForm<SignUpForm>()

  const onSubmit = async (data: SignUpForm) => {
    setIsSigningUp(true)
    try {
      const response = await httpService.post(`sign-up/${userType}`, data)
      NotificationService.showSuccess(response.data.message || 'Sign up successful')
      router.push('/client/login')
    } catch (error: any) {
      NotificationService.showError(
        error.response?.data?.message || 'Sign up failed'
      )
    } finally {
      setIsSigningUp(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Sign Up as {userType}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    {...form.register('firstName', { required: 'First name is required' })}
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    {...form.register('lastName', { required: 'Last name is required' })}
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...form.register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email',
                      },
                    })}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...form.register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isSigningUp}>
                  {isSigningUp ? (
                    <>
                      <Loader className="mr-2" />
                      Signing up ...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
