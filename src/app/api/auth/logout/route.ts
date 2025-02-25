import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

 

  if (process.env.NODE_ENV === 'production') {
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: '.premierproperties.ae',
      expires: new Date(0) // This makes the cookie expire immediately
    });
  } else {
    // Development environment settings
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(0) // This makes the cookie expire immediately
    });
  }

  return response;
}