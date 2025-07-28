import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const MODEL_NAME = "gemini-1.5-flash";

interface AIResponse {
  name: string;
  code: string;
}

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

async function generateCode(prompt: string): Promise<AIResponse> {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const enhancedPrompt = `
You are a professional web developer specializing in vanilla HTML, CSS, and JavaScript.
User Request: ${prompt}
Generate a complete, lightweight web application using ONLY HTML, CSS, and vanilla JavaScript.
Make sure you use excessive CSS to make website look better.

INSTRUCTIONS:
- Respond with a raw JSON object in this exact format:
{
  "name": "project name according to given prompt",
  "reply": "A brief 2-line description of the project you have made. (make sure you start with "Here is" keyword ",
  "code:"{
  "index.html": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Sample Project</title>\n    <link rel=\"stylesheet\" href=\"style.css\">\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <script src=\"index.js\"></script>\n  </body>\n</html>",
  "style.css": "body {\n  background-color: white;\n  font-family: Arial, sans-serif;\n  text-align: center;\n  margin-top: 50px;\n}",
  "index.js": "console.log('Hello, world!');"
  }
}

- Escape all double quotes inside the string values properly.
- Do NOT include any explanation or markdown syntax.
- Do NOT wrap the object in \`\`\`json or any code blocks.

`.trim();

  const result = await model.generateContent(enhancedPrompt);
  const text = result.response.text().trim();

  let parsed: AIResponse;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    console.error("❌ Failed to parse AI response as JSON:", err);
    throw new Error("Invalid response format from model");
  }

  return parsed;
}
