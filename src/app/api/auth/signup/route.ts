import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { validateEmail } from '@/utils/validateEmail';
import { jwtVerify } from 'jose';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { token } = await req.json()

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const{ payload } = await jwtVerify(token, secretKey);
    if (!payload) {
      return NextResponse.json({
        success: false,
        message: 'Invalid token!'
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
        { success: false, message: 'Account already exists' },
        { status: 400 }
      );
    }

    const user = await User.create({ name, email, password });
    if (user) {
      return NextResponse.json(  { success: true, message: 'Account has been created!' },
        { status: 200 });
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}