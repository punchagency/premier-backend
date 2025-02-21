import dbConnect from "@/lib/db";
import Properties from "@/lib/models/Properties";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { WebflowClient } from "webflow-api";

const accessToken = process.env.WEBFLOW_ACCESS_TOKEN as string;

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const decodedToken = jwtVerify(token, secret);
    if (!decodedToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log(decodedToken, "decodedToken"); 
    const webflow = new WebflowClient({ accessToken });
    const { sites } = await webflow.sites.list();
    const site = await webflow.sites.get(sites?.[0]?.id as string);
    const { collections } = await webflow.collections.list(site.id);
    // console.log(collections, "collections");
    // const collectionId = collections?.[0]?.id;
    // console.log(collectionId, "collectionId");
    const { items } = await webflow.collections.items.listItems("67349d368065d9f52101c3b0");
    console.log(items, "items");
    await Properties.insertMany(items);

    return NextResponse.json({
      message: "Data fetched and stored successfully",
      items,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
