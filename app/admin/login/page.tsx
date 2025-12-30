'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material'
import httpService from '@/shared/services/http.service'
import { NotificationService } from '@/shared/services/notification.service'
import { AuthService } from '@/shared/services/auth.service'

interface LoginForm {
  email: string
  password: string
}

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    setIsLoggingIn(true)
    try {
      const response = await httpService.post('admin/login', data)
      const userData = response.data.data
      if (userData.token) {
        AuthService.setToken(userData.token)
      }
      NotificationService.showSuccess(response.data.message || 'Login successful')
      router.push('/admin/home')
    } catch (error: any) {
      NotificationService.showError(
        error.response?.data?.message || 'Login failed'
      )
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="login-main bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12 login-card-wrapper d-flex justify-content-center">
            <Card className="login-card p-4" sx={{ maxWidth: 400, width: '100%' }}>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Typography variant="h4" className="text-center mb-2">
                    Admin Login
                  </Typography>
                  <Divider className="my-2" />
                  <div className="mb-3">
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email',
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      {...register('password', {
                        required: 'Password is required',
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </div>
                  <div className="py-2">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isLoggingIn}
                    >
                      {isLoggingIn ? (
                        <>
                          <CircularProgress size={20} className="me-2" />
                          Logging in ...
                        </>
                      ) : (
                        'Login'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

