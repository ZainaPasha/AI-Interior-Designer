import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";


export const runtime = "nodejs"; // 👈 make sure it runs in Node.js

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, prompt } = await req.json();

    // 1. Fetch input image
    const imageRes = await fetch(imageUrl);
    const imageBlob = await imageRes.blob();

    // 2. Call HuggingFace model
    const client = await Client.connect("ZainaPasha/ai-interior-designer");
    const result = await client.predict("/predict", {
      input_image: imageBlob,
      prompt,
    });

    const data = result.data as { url: string; path: string }[];
    const hfUrl = data?.[0]?.url;

    if (!hfUrl) {
      throw new Error("No output image returned from HuggingFace.");
    }

    // 3. Download the HuggingFace output file
    const outputRes = await fetch(hfUrl);
    const buffer = Buffer.from(await outputRes.arrayBuffer());

    // 4. Upload to Cloudinary
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const uploadPreset = "ai-room-designer"; // 👈 same preset you used before

    const formData = new FormData();
    const blob = new Blob([buffer], { type: "image/webp" });
    formData.append("file", blob, "output.webp");
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "/client");

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData as any }
    );

    const cloudinaryData = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) {
      throw new Error(cloudinaryData.error?.message || "Cloudinary upload failed");
    }

    // 5. Return permanent Cloudinary URL
    return NextResponse.json({
      success: true,
      outputImage: cloudinaryData.secure_url,
      publicId: cloudinaryData.public_id,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate Image" },
      { status: 500 }
    );
  }
}
