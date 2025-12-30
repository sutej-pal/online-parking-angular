'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useIndividualStore } from '@/shared/store/individualStore'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

export default function Header() {
  const router = useRouter()
  const individual = useIndividualStore((state) => state.individual)

  const handleLogout = () => {
    useIndividualStore.getState().clearIndividual()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    router.push('/client/home')
  }

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <div>
            <Link href="/client/home" className="cursor-pointer">
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                width={50}
                height={50}
              />
            </Link>
          </div>
          {!individual?.id ? (
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                onClick={() => router.push('/client/login')}
              >
                Login
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">Sign Up</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => router.push('/client/sign-up/individual')}
                  >
                    As Individual
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push('/client/sign-up/business')}
                  >
                    As Business
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span>
                    {individual.firstName} {individual.lastName}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push('/client/individual/profile')}
                >
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/client/individual/bookings')}
                >
                  Bookings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/client/individual/payments')}
                >
                  Payments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  )
}
