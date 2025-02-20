import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UserCard from '@/lib/models/User_Card';
import Properties from '@/lib/models/Properties';

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { slug } = await request.json();  // Read slug from request body
    const userId = process.env.USER_ID;


    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', 'https://www.premierproperties.ae');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Find the property by slug
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