import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";
import dbConnect from "@/lib/db";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { email, preferences } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { preferences: preferences },
      { new: true, runValidators: true }
    ).select("-password");

    return NextResponse.json({
      success: true,
      message: "Preferences updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Error updating user preferences:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update account preferences",
      },
      { status: 500 }
    );
  }
}
