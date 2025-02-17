import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UserCard from '@/lib/models/User_Card';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }  // Change params to a Promise
) {
  try {
    await dbConnect();
    const { id: propertyId } = await context.params;  // Await the params
    const userId = process.env.USER_ID;

    console.log('Deleting property:', propertyId, 'for user:', userId);

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