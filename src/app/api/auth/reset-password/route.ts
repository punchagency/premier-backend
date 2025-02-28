import { signJWT } from "@/lib/jwt";
import User from "@/lib/models/User";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token");
    console.log(token, "token");
    if (!token) {
        return NextResponse.json({ success: false, message: 'No token provided' });
    }
    const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    if (!decoded) {
        return NextResponse.json({ success: false, message: 'Invalid token' });
    }
    const user = await User.findOne({ email: decoded.payload.email });
    console.log(user, "user");
    if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' });
    }
    const newToken = await signJWT({ email: user.email });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUrl = new URL(`/new-password?token=${newToken}`, baseUrl);

    return NextResponse.redirect(redirectUrl.toString());
}
