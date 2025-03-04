import { signJWT } from "@/lib/jwt";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import dbConnect from "@/lib/db";

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const token = await signJWT({ email: user.email });
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/reset-password?token=${token}`;
    const msg = {
      from: "premier@punch.cool",
      to: user.email,
      subject: "Reset Your Password - Premier Properties",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #1C3A60;">Reset Your Password</h2>
          
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          
          <a href="${resetLink}" 
             style="background-color: #1C3A60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">
            Reset Password
          </a>
          
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p>${resetLink}</p>
          
          <p>This link will expire in 1 hour for security reasons.</p>
          
          <p>If you didn't request this password reset, you can safely ignore this email.</p>
          
          <div style="margin-top: 30px; font-size: 12px; color: #666;">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Premier Properties. All rights reserved.</p>
          </div>
        </div>
      `,
    };
    await sgMail.send(msg);
    return NextResponse.json(
      { success: true, message: "Password reset email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send reset email" },
      { status: 500 }
    );
  }
}
