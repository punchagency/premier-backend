import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import User from '@/lib/models/User';

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify the token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    // Extract the email from the payload
    const email = payload.email;
    if (!email) {
      return NextResponse.json({ error: 'Email not found in token' }, { status: 400 });
    }

    // Use the email for further processing
    console.log('User email:', email);

    // Example logic for deleting a user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await User.deleteOne({ email });

    const response = NextResponse.json(
        { success: true, message: 'Account deleted successfully' },
        { status: 200 }
      );
  
      response.cookies.delete('token');

    return response;

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Account retrieval failed. Please try again.' }, { status: 500 });
  }
}