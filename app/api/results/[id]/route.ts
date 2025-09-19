import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Design Not Found" }, { status: 404 });
    }

    const existingDesign = await db.generateRoom.findUnique({
      where: { id },
    });

    if (!existingDesign) {
      return NextResponse.json({ error: "Design Not Found" }, { status: 404 });
    }

    const isAlreadyFavorite = existingDesign.favourites.includes(userId);

    const updateFavorites = isAlreadyFavorite
      ? existingDesign.favourites.filter((uid) => uid !== userId)
      : [...existingDesign.favourites, userId];

    const updatedRoom = await db.generateRoom.update({
      where: { id },
      data: { favourites: updateFavorites },
    });

    return NextResponse.json({
      success: true,
      isFavorite: !isAlreadyFavorite,
      favourites: updatedRoom.favourites,
    });
  } catch (error) {
    console.error("Update the API error:", error);
    return NextResponse.json(
      { error: "Failed to update result" },
      { status: 500 }
    );
  }
}
