import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const publicPaths = ['/login', '/signup'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!token) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    const currentPath = request.nextUrl.pathname;

    if (currentPath === '/admin/dashboard') {
      if (payload?.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    if (payload?.role === 'admin' && currentPath !== '/admin/dashboard') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    if (payload?.role === 'user' && currentPath !== '/dashboard') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Token verification error:', error);
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/dashboard',
    '/admin/dashboard',
    '/login',
    '/signup',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
