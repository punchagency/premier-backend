import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' }
  );

  // Clear the token cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0) // This makes the cookie expire immediately
  });

  return response;
}