import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

export async function PUT(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();
    
    // Parse the request body
    const { email, name, phone } = await req.json();
    
    // Validate input
    if (!email || !name) {
      return NextResponse.json(
        { success: false, message: 'Email and name are required' },
        { status: 400 }
      );
    }
    
    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, phone },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Account details updated successfully',
      user: updatedUser
    });
    
  } catch (error: any) {
    console.error('Error updating user details:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update account details' },
      { status: 500 }
    );
  }
}