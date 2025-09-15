import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";

export const runtime = "nodejs"; // 👈 force Node.js runtime

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, prompt } = await req.json();

    const imageRes = await fetch(imageUrl);
    const imageBlob = await imageRes.blob();

    const client = await Client.connect("ZainaPasha/ai-interior-designer");
    const result = await client.predict("/predict", {
      input_image: imageBlob,
      prompt,
    });

    const data = result.data as { url: string; path: string }[];
    const imgSrc = data?.[0]?.url;

    return NextResponse.json({ image: imgSrc });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate Image" },
      { status: 500 }
    );
  }
}
