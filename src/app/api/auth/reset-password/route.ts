import { signJWT } from "@/lib/jwt";
import User from "@/lib/models/User";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token");
    
    if (!token) {
        return NextResponse.redirect(
            `/login?error=${encodeURIComponent('Token is required')}`
        );
    }

    try {
        const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        if (!decoded) {
            return NextResponse.redirect(
                `/login?error=${encodeURIComponent('Invalid token')}`
            );
        }
        const user = await User.findOne({ email: decoded.payload.email });
        if (!user) {
            return NextResponse.redirect(
                `/login?error=${encodeURIComponent('User not found')}`
            );
        }

        const newToken = await signJWT({ email: user.email });
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const redirectUrl = new URL(`/new-password?token=${newToken}`, baseUrl);

        return NextResponse.redirect(redirectUrl.toString());
    } catch (error) {
        return NextResponse.redirect(
            `/login?error=${encodeURIComponent('Authentication failed')}`
        );
    }
}
