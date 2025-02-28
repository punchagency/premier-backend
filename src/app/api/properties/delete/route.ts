import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UserCard from '@/lib/models/User_Card';
import Properties from '@/lib/models/Properties';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/auth-options';

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { slug } = await request.json();
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

    const property = await Properties.findOne({ "fieldData.slug": slug });
    if (!property) {
      return NextResponse.json({
        success: false,
        message: 'Property not found'
      }, { status: 404 });
    }

    const propertyId = property.id;

    // Update the UserCard document by removing the propertyId from cmsId array
    const result = await UserCard.updateOne(
      { userId },
      { $pull: { cmsId: propertyId } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({
        success: false,
        message: 'Property not found in user saved list'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Property removed successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to remove property'
    }, { status: 500 });
  }
}