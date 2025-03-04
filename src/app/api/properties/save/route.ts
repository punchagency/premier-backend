import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UserCard from '@/lib/models/User_Card';
import Properties from '@/lib/models/Properties';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/auth-options';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { slug } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized" 
      }, { status: 401 });
    }

    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        message: "User not found" 
      }, { status: 404 });
    }

    const item = await Properties.findOne({ "fieldData.slug": slug });

    if (!item) {
      return NextResponse.json({ 
        success: false, 
        message: "Item not found" 
      }, { status: 404 });
    }

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

    const updatedUserCard = await UserCard.findOneAndUpdate(
      { userId },
      { $addToSet: { cmsId: item.id } },
      { 
        new: true,
        upsert: true // This will create a new document if none exists
      }
    );

    console.log(updatedUserCard,"updatedUserCard")


      return NextResponse.json({
        success: true,
        message: "Item added to your saved collection",
        saved: true,
        userId
      });
    // }

    // // If no existing user, create new record
    // await UserCard.create({
    //   cmsId: [item.id],
    //   userId: userId
    // });

    // return NextResponse.json({
    //   success: true,
    //   message: "Item saved successfully",
    //   saved: true,
    //   userId
    // });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error"
    }, { status: 500 });
  }
}