import { NextRequest, NextResponse } from 'next/server';
import { signJWT } from '@/lib/jwt';
import sgMail from "@sendgrid/mail";
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { validateEmail } from '@/utils/validateEmail';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json({ success: false, message: 'User already exists' });
    }
    const isValid = validateEmail(email);
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid email' });
    }
    const token = await signJWT({ name: name, email: email, password: password });
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const verifyLink = `${baseUrl}/api/auth/signup?token=${token}`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);    
    const msg = {
      to: email,
      from: "premier@punch.cool",
      subject: "Verify Your Email – Premier Properties",
      text: `Please click the link below to verify your email: ${token}`,
      html: `<p>Please click the link below to verify your email: <a href="${verifyLink}">Verify Email</a></p>`,
    };
    sgMail
      .send(msg)  
      .then((result: any) => {
        console.log("Verification email sent!", result.text);
        return NextResponse.json({ success: true, message: 'Verification email sent', token: token });
      })
      .catch((error: any) => {
        console.error("Error sending email:", error.text);
        return NextResponse.json({ success: false, message: 'Failed to send verification email' });
      });

    return NextResponse.json({ success: true, message: 'Verification email sent', token: token });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send verification email' });
  }
}

// Example function to send verification email
