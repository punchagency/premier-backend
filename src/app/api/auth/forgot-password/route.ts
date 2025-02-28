import { signJWT } from "@/lib/jwt";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export async function POST(request: Request) {
    const { email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' });
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const token = await signJWT({ email: user.email });
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/api/auth/reset-password?token=${token}`;
    const msg = {
        from: "premier@punch.cool",
        to: user.email,
        subject: 'Reset Password',  
        html: `
            <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
        `
    };
    console.log(msg, "msg");
    await sgMail.send(msg);
    return NextResponse.json({ success: true, message: 'Reset link sent to email' });
}
