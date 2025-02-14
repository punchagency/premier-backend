import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const publicPaths = ['/login', '/signup'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  try {
    if (token) {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
    }
    return NextResponse.next();
  } catch (error) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/', '/dashboard', '/login', '/signup',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
};