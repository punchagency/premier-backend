import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UserCard from '@/lib/models/User_Card';
import Properties from '@/lib/models/Properties';
import { jwtVerify } from "jose";

export async function POST(req: NextRequest) {
  // Set CORS headers
  // const response = NextResponse.next();
  // response.headers.set('Access-Control-Allow-Origin', 'https://www.premierproperties.ae');
  // response.headers.set('Access-Control-Allow-Credentials', 'true');
  // response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // if (req.method === 'OPTIONS') {
  //   return response; // Respond to preflight request
  // }

  try {
    await dbConnect();
    const { slug } = await req.json();
    const token = req.cookies.get("token")?.value;
    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token!, jwtSecret);
    const userId = payload.userId;

    // Find the property by slug
    const item = await Properties.findOne({ "fieldData.slug": slug });

    if (!item) {
      return NextResponse.json({ 
        success: false, 
        message: "Item not found" 
      }, { status: 404 });
    }

    // Check if already saved
    const existingSaveWithItem = await UserCard.findOne({
      userId: userId,
      cmsId: { $in: [item.id] }
    });

    if (existingSaveWithItem) {
      return NextResponse.json({
        success: false,
        message: "Item already saved",
        saved: true
      }, { status: 400 });
    }

    // Look for existing user's saved items
    const existingUser = await UserCard.findOne({ userId });

    if (existingUser) {
      await UserCard.findByIdAndUpdate(
        existingUser._id,
        {
          $addToSet: { cmsId: item.id }
        },
        { new: true }
      );

      return NextResponse.json({
        success: true,
        message: "Item added to your saved collection",
        saved: true,
        userId
      });
    }

    // If no existing user, create new record
    await UserCard.create({
      cmsId: [item.id],
      userId: userId
    });

    return NextResponse.json({
      success: true,
      message: "Item saved successfully",
      saved: true,
      userId
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 });
  }
}