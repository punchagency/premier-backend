import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { validateEmail } from '@/utils/validateEmail';
import { jwtVerify } from 'jose';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const token = req.nextUrl.searchParams.get('token');
    console.log(token, "token");

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    console.log(token, "token");
    const{ payload } = await jwtVerify(token!, secretKey);
    console.log(payload, "payload");
    if (!payload) {
      return NextResponse.json({
        success: false,
        message: 'Invalid token'
      }, { status: 400 });
    }

    const { name, email, password } = payload as unknown as { name: string; email: string; password: string };
    
    const { isValid, message } = validateEmail(email);
    if (!isValid) {
      return NextResponse.json({
        success: false,
        message
      }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already exists' },
        { status: 400 }
      );
    }

    const user = await User.create({ name, email, password });
    console.log(user, "user");
    if (user) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}