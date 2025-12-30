import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value || 
    (typeof window !== 'undefined' ? localStorage.getItem('token') : null)

  // Protected routes for business portal
  if (pathname.startsWith('/business') && !pathname.includes('/login') && !pathname.includes('/register')) {
    if (!token) {
      return NextResponse.redirect(new URL('/business/login', request.url))
    }
  }

  // Protected routes for admin portal
  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/business/:path*',
    '/admin/:path*',
  ],
}

