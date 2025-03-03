import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import UserCard from "@/lib/models/User_Card";
import Properties from "@/lib/models/Properties";
import { jwtVerify } from "jose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";

const fetchItems = async (cmsIDs: []) => {
  try {
    const items = await Promise.all(
      cmsIDs.map(async (id: string) => {
        const item = await Properties.findOne({ id: id });
        return item;
      })
    );
    return items.filter((item) => item !== null);
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    await dbConnect();
    const userCards = await UserCard.findOne({ userId });
    if (!userCards) {
      console.log("No saved items found, returning empty array");
      return NextResponse.json([]);
    }
    const properties = await fetchItems(userCards.cmsId);
    return NextResponse.json(properties);
  } catch (error) {
    console.error("ERROR in dashboard API:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
