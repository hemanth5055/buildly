import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";
import { generateCode } from "@/ai.config";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!prompt?.trim()) {
      return NextResponse.json(
        { success: false, message: "Prompt is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user || user.credits <= 0) {
      return NextResponse.json(
        { success: false, message: "No credits left." },
        { status: 403 }
      );
    }

    const files = await generateCode(prompt.trim());

    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        credits: { decrement: 1 },
      },
    });

    return NextResponse.json({ success: true, data: files });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
