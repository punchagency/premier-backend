import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UserCard from '@/lib/models/User_Card';
import Properties from '@/lib/models/Properties';
import { jwtVerify } from 'jose';


const fetchItems = async (cmsIDs: []) => {
  try {
    console.log(cmsIDs, "cmsIDs");
    const items = await Promise.all(
      cmsIDs.map(async (id: string) => {
        const item = await Properties.findOne({ id: id });
        return item;
      })
    );
    console.log(items, "items");
    return items.filter((item) => item !== null);
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decodedToken = await jwtVerify(token!, secret);
    const userId = decodedToken.payload.userId;
    console.log(userId, "userId");
    await dbConnect();
    const userCards = await UserCard.findOne({ userId });
    console.log(userCards, "userCards");
    if (!userCards) {
      console.log('No saved items found, returning empty array');
      return NextResponse.json([]);
    }
    const properties = await fetchItems(userCards.cmsId);
    return NextResponse.json(properties);
  } catch (error) {
    console.error('ERROR in dashboard API:', error);
    return NextResponse.json({ 
      error: 'Server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}