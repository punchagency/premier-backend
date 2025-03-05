// src/app/api/properties/fetch_new_properties/route.ts
import dbConnect from "@/lib/db";
import Properties from "@/lib/models/Properties";
import { jwtVerify } from "jose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { WebflowClient } from "webflow-api";
import { authOptions } from "../../auth/auth-options";

const accessToken = process.env.WEBFLOW_ACCESS_TOKEN as string;

const COLLECTION_IDS = process.env.COLLECTION_IDS?.split(",") || [];
console.log(COLLECTION_IDS, "COLLECTION_IDS");

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
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
