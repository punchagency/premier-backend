import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import UserCard from "@/lib/models/User_Card";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";
import dbConnect from "@/lib/db";

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session,"session")
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const email = session.user.email;
    await dbConnect();
    if (!email) {
      return NextResponse.json(
        { error: "Email not found in token" },
        { status: 400 }
      );
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(session,"session")

   const deletedUser =  await User.deleteOne({ email });
   console.log(deletedUser, "deletedUser")

   const deletedUserCards =  await UserCard.deleteOne({ userId: user.id });
    console.log(deletedUserCards, "deletedUserCards")

    const response = NextResponse.json(
      { success: true, message: "Account deleted successfully" },
      { status: 200 }
    );

    if (process.env.NODE_ENV === "production") {
      response.cookies.set("__Secure-next-auth.session-token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: '.premierproperties.ae',
        path: '/',
        expires: new Date(0),
      });
    } else {
      response.cookies.set("next-auth.session-token", "", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: new Date(0),
      });
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Account retrieval failed. Please try again." },
      { status: 500 }
    );
  }
}
