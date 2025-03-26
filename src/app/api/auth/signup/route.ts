import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { validateEmail } from "@/utils/validateEmail";
import { jwtVerify } from "jose";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { token } = await req.json();

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token!",
        },
        { status: 400 }
      );
    }

    const { name, email, password } = payload as unknown as {
      name: string;
      email: string;
      password: string;
    };

    const { isValid, message } = validateEmail(email);
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message,
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Account already exists" },
        { status: 400 }
      );
    }

    const user = await User.create({ name, email, password });
    if (user) {
      try {
        const zohoResponse = await fetch(
          `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/zoho`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email }),
          }
        );

        const zohoData = await zohoResponse.json();
        console.log("Zoho lead creation response:", zohoData);
      } catch (zohoError) {
        console.error("Error creating Zoho lead:", zohoError);
      }

      return NextResponse.json(
        { success: true, message: "Account has been created!" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Error creating account" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Error creating account" },
      { status: 500 }
    );
  }
}
