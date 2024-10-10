import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Korumalı sayfalar
    const protectedRoutes = ['/profile', '/reviews', '/stats', '/tracking']

    // Eğer kullanıcı giriş yapmamışsa ve korumalı bir sayfaya erişmeye çalışıyorsa
    if (!token && protectedRoutes.some(route => path.startsWith(route))) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // Diğer durumlarda herhangi bir yönlendirme yapmıyoruz
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

// Middleware'in çalışacağı sayfaları belirtiyoruz
export const config = { 
  matcher: ['/profile/:path*', '/reviews/:path*', '/stats/:path*', '/tracking/:path*', '/auth/login', '/auth/register']
}