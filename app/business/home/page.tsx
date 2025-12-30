'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/shared/services/auth.service'

export default function BusinessHomePage() {
  const router = useRouter()

  useEffect(() => {
    if (!AuthService.isLoggedIn()) {
      router.push('/business/login')
    }
  }, [router])

  return (
    <div className="container mt-4">
      <h1>Business Portal - Home</h1>
      <p>Welcome to the Business Portal</p>
    </div>
  )
}

