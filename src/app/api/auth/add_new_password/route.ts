import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";
import dbConnect from "@/lib/db";
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    
        await dbConnect();
        const {  newPassword, confirmPassword } = await request.json();
        const email = session.user.email;
        
        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json({ error: "New password and confirm password do not match" }, { status: 401 });
        }
        
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        await User.updateOne({ email }, { $set: { password: hashedNewPassword } });
    
        return NextResponse.json({ message: "Password added successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Password added failed. Please try again.' }, { status: 500 });
    }
}