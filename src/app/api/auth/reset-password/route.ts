import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "No token provided",
      });
    }

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    if (!payload) {
      return NextResponse.json({ success: false, message: "Invalid token" });
    }
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    user.password = await bcrypt.hash("temp123", 12);
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Verification email sent",
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to send verification email",
    });
  }
}
