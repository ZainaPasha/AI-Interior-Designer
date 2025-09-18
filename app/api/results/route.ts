import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();
        if (!userId){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json();
        const {uploadedImage, outputImage, prompt, roomStyle, aitStyle, userName, userImage} = body;

        const savedResult = await db.generateRoom.create({
            data:{
                userId:userId,
                userName: userName ?? "Unknown User",
                userImage: userImage ?? "/assets/img/avatar.jpg",
                roomStyle: roomStyle ?? "Default",
                aiStyle: aitStyle ?? "Default",
                prompt,
                uploadedImage,
                outputImage,

            }
        })
return NextResponse.json({ success: true, result: savedResult }, { status: 201 });
    } catch (error) {
        console.error("Save API error:", error);
        return NextResponse.json({ error: "Failed to save result" }, { status: 500 });
    }
}