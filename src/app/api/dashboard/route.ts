import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UserCard from '@/lib/models/User_Card';
import Properties from '@/lib/models/Properties';
import { nanoid } from 'nanoid'
const id = nanoid(32) //=> "V1StGXR8_Z5jdHi6B-myT"
console.log(id, "id");

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

export async function GET() {
  try {
    await dbConnect();
    const userId = process.env.USER_ID;
    const savedItems = await UserCard.findOne({ userId });
    if (!savedItems) {
      console.log('No saved items found, returning empty array');
      return NextResponse.json([]);
    }
    const properties = await fetchItems(savedItems.cmsId);
    return NextResponse.json(properties);
  } catch (error) {
    console.error('ERROR in dashboard API:', error);
    return NextResponse.json({ 
      error: 'Server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}