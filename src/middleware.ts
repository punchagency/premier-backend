import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token!;

    if (pathname === '/' && token) {
      if (token.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname.startsWith('/admin')) {
      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    if (pathname.startsWith('/dashboard') && token.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login', 
    },
  }
);

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*', 
    '/admin/:path*',    
    '/api/auth/:path*', 
  ],
};