import { enhancePrompt } from "@/ai.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }
    const enhancedPrompt = await enhancePrompt(prompt);
    if (!enhancedPrompt) return NextResponse.json({ success: false });
    return NextResponse.json({ success: true, enhancedPrompt });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { success: false, error: "Invalid request or server error." },
      { status: 500 }
    );
  }
}
