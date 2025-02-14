import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UserCard from '@/lib/models/User_Card';

export async function DELETE(
  req: Request,
  { params }: { params: { propertyId: string } }
) {
  try {
    await dbConnect();
    const propertyId = params.propertyId;
    const userId = process.env.USER_ID;

    console.log('Deleting property:', propertyId, 'for user:', userId);

    // Update the UserCard document by removing the propertyId from cmsId array
    const result = await UserCard.updateOne(
      { userId },
      { $pull: { cmsId: propertyId } }
    );

    console.log('Delete result:', result);

    if (result.modifiedCount === 0) {
      return NextResponse.json({
        success: false,
        message: 'Property not found'
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