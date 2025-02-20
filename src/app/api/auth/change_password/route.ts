import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";

export async function POST(request: NextRequest) {
    const { newPassword, oldPassword, confirmPassword } = await request.json();
    console.log(newPassword, oldPassword, confirmPassword, "newPassword, oldPassword, confirmPassword");
    try {
        const token = request.cookies.get("token")?.value;
        const jwtSecret =  new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token!, jwtSecret);
        const email = payload.email;
        
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        console.log(isOldPasswordValid, "isOldPasswordValid");

        if (!isOldPasswordValid) {
            return NextResponse.json({ error: "Old password is incorrect" }, { status: 401 });
        }

        const isNewPasswordSameAsOld = await bcrypt.compare(newPassword, user.password);
        console.log(isNewPasswordSameAsOld, "isNewPasswordSameAsOld");

        if (isNewPasswordSameAsOld) {
            return NextResponse.json({ error: "New password cannot be the same as the old password" }, { status: 401 });
        }
        
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        console.log(hashedNewPassword, "hashedNewPassword");
        await User.updateOne({ email }, { $set: { password: hashedNewPassword } });
    
        return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Password change failed. Please try again.' }, { status: 500 });
    }
}