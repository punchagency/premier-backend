import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

    if (pathname === '/' && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
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