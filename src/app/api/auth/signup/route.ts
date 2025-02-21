import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { validateEmail } from '@/utils/validateEmail';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();
    
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

    await User.create({ name, email, password });

    return NextResponse.json(
      { success: true, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}