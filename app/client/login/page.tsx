'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import httpService from '@/shared/services/http.service'
import { NotificationService } from '@/shared/services/notification.service'
import { useIndividualStore } from '@/shared/store/individualStore'
import { AuthService } from '@/shared/services/auth.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Loader } from '@/components/ui/loader'
import { ArrowLeft } from 'lucide-react'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const { setIndividual } = useIndividualStore()

  const form = useForm<LoginForm>({
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
      router.push('/client/home')
    } catch (error: any) {
      NotificationService.showError(
        error.response?.data?.message || 'Login failed'
      )
    } finally {
      setIsLoggingIn(false)
    }
  }

  const signInWithGoogle = async () => {
    // TODO: Implement Google Sign In
    console.log('Google Sign In')
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account yet?{' '}
            <Link href="/client/sign-up/individual" className="text-primary hover:underline">
              Click here
            </Link>{' '}
            to Sign Up.
          </div>
        </div>
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Log in</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    })}
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="text-sm">
                  <Link
                    href="/client/forgot-password"
                    className="text-primary hover:underline"
                  >
                    Forgot your Password?
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <>
                      <Loader className="mr-2" />
                      Logging in ...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
              <Separator className="my-4" />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={signInWithGoogle}
              >
                <div className="flex items-center justify-center gap-3">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="
                    alt="Google"
                    width={18}
                    height={18}
                  />
                  <span>Login with Google</span>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
