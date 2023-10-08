import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function middleware(request: NextRequest) {
  try {
    const isPublicPage =
      request.nextUrl.pathname === '/prijava' ||
      request.nextUrl.pathname === '/registracija' ||
      request.nextUrl.pathname === '/'

    // if there is no token and the page is not public, redirect to login
    const token = request.cookies.get('token')?.value
    if (!token && !isPublicPage) {
      return NextResponse.redirect(new URL('/prijava', request.nextUrl))
    }

    // if there is a token and the page is public, redirect to profile
    if (token && isPublicPage) {
      return NextResponse.redirect(new URL('/profil', request.nextUrl))
    }

    return NextResponse.next()
  } catch (error: any) {
    return NextResponse.error()
  }
}

export const config = {
  matcher: ['/', '/prijava', '/registracija', '/profil', '/poslovi', '/jobs'],
}
