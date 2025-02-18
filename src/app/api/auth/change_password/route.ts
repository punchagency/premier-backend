import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    const { email, newPassword, oldPassword } = await request.json();
    console.log(email, newPassword, oldPassword, "email, newPassword, oldPassword");
    try {
        const user = await User.findOne({ email });
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