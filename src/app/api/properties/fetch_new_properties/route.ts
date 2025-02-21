// src/app/api/properties/fetch_new_properties/route.ts
import dbConnect from "@/lib/db";
import Properties from "@/lib/models/Properties";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { WebflowClient } from "webflow-api";

const accessToken = process.env.WEBFLOW_ACCESS_TOKEN as string;

// Collection IDs for different property types
// const COLLECTION_IDS = [
//   "6724d7d499fda09820d6499d", // Buy Properties
//   "67349d368065d9f52101c3b0", // Rent Properties
//   "6734c2d6e92bdb1fcc0c5334", // New Projects
// ];
const COLLECTION_IDS = process.env.COLLECTION_IDS?.split(",") || [];

console.log(COLLECTION_IDS, "COLLECTION_IDS");

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const decodedToken = await jwtVerify(token, secret);

      if (!decodedToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const webflow = new WebflowClient({ accessToken });

      // Initialize arrays to store results
      const newItems = [];
      const updatedItems = [];
      const existingItems = [];
      let totalProcessed = 0;

      // Fetch and process items from each collection
      for (const collectionId of COLLECTION_IDS) {
        try {
          const { items } = await webflow.collections.items.listItems(
            collectionId
          );

          for (const item of items || []) {
            totalProcessed++;
            try {
              const existingProperty = await Properties.findOne({
                "fieldData.slug": item.fieldData.slug,
              });

              if (!existingProperty) {
                newItems.push(item);
              } else {
                const hasChanges =
                  JSON.stringify(existingProperty.fieldData) !==
                  JSON.stringify(item.fieldData);

                if (hasChanges) {
                  await Properties.findOneAndUpdate(
                    { "fieldData.slug": item.fieldData.slug },
                    { $set: item },
                    { new: true }
                  );
                  updatedItems.push(item.fieldData.slug);
                } else {
                  existingItems.push(item.fieldData.slug);
                }
              }
            } catch (itemError) {
              console.error(
                `Error processing item ${item.fieldData?.slug}:`,
                itemError
              );
            }
          }
        } catch (collectionError) {
          console.error(
            `Error fetching collection ${collectionId}:`,
            collectionError
          );
        }
      }

      // Bulk insert new items
      if (newItems.length > 0) {
        await Properties.insertMany(newItems);
      }

      return NextResponse.json({
        message: "Data fetch and sync completed successfully",
        summary: {
          newProperties: newItems.length,
          updatedProperties: updatedItems.length,
          unchangedProperties: existingItems.length,
          totalPropertiesProcessed: totalProcessed,
        },
        details: {
          newItems: newItems.map((item) => item.fieldData.slug),
          updatedItems,
          existingItems,
        },
      });
    } catch (jwtError) {
      console.error("JWT Verification failed:", jwtError);
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
