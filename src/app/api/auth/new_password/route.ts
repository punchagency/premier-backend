import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { jwtVerify } from "jose";
export async function POST(request: NextRequest) {
    try {
    
        await dbConnect();
        const { newPassword, confirmPassword, token } = await request.json();
        const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        const email = decoded.payload.email;
        const user = await User.findOne({ email: email });

        if (!token || !newPassword) {
            return NextResponse.json(
                { error: 'Token and new password are required' },
                { status: 400 }
            );
        }
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }


        const isNewPasswordSameAsConfirmPassword = newPassword === confirmPassword;
        if (!isNewPasswordSameAsConfirmPassword) {
            return NextResponse.json({ error: "New password and confirm password do not match" }, { status: 401 });
        }

        
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        await User.updateOne({ email }, { $set: { password: hashedNewPassword } });
    
        return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Password change failed. Please try again.' }, { status: 500 });
    }
}