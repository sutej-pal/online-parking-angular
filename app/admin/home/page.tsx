'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/shared/services/auth.service'

export default function AdminHomePage() {
  const router = useRouter()

  useEffect(() => {
    if (!AuthService.isLoggedIn()) {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="container mt-4">
      <h1>Admin Portal - Dashboard</h1>
      <p>Welcome to the Admin Portal</p>
    </div>
  )
}

