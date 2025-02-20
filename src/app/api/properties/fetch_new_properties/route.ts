import dbConnect from "@/lib/db";
import Properties from "@/lib/models/Properties";
import { NextRequest, NextResponse } from "next/server";
import { WebflowClient } from "webflow-api";

export default async function GET(request: NextRequest) {
    try {
        await dbConnect();
    
        const webflow = new WebflowClient({ accessToken: process.env.WEBFLOW_ACCESS_TOKEN as string });
        const { sites } = await webflow.sites.list();
        console.log(sites, "sites");
        const site = await webflow.sites.get(sites?.[0]?.id as string);
        console.log(site, "site");
        const { collections } = await webflow.collections.list(site.id);
        console.log(collections, "collections");
        const collectionId = collections?.[0]?.id;
        console.log(collectionId, "collectionId");
        const { items } = await webflow.collections.items.listItems(collectionId as string);
    console.log(items, "items");
        // Store items in the database
        // await Properties.insertMany(items);
    
        return NextResponse.json({ message: 'Data fetched and stored successfully', items });
      } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' });
      }
}