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
    const verifyLink = `${baseUrl}/verify-email?token=${token}`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);    
    const msg = {
      to: email,
      from: "premier@punch.cool",
      subject: "Verify Your Email – Premier Properties",
      text: `Please click the link below to verify your email: ${token}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #1C3A60;">Welcome to Premier Properties!</h2>
          
          <p>Thank you for signing up. To complete your registration, please verify your email address by clicking the button below:</p>
          
          <a href="${verifyLink}" 
             style="background-color: #1C3A60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">
            Verify Email Address
          </a>
          
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p>${verifyLink}</p>
          
          <p>This link will expire in 24 hours for security reasons.</p>
          
          <p>If you didn't create an account with Premier Properties, you can safely ignore this email.</p>
          
          <div style="margin-top: 30px; font-size: 12px; color: #666;">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Premier Properties. All rights reserved.</p>
          </div>
        </div>
      `,};
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

    return NextResponse.json({ success: true, message: 'Verification email sent' });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send verification email' });
  }
}

