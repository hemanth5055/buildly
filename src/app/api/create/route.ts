// app/api/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const MODEL_NAME = "gemini-1.5-flash";

interface FileStructure {
  [key: string]: {
    file: {
      contents: string;
    };
  };
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { success: false, message: "Prompt is required" },
        { status: 400 }
      );
    }
    const files = await generateCode(prompt.trim());
    return NextResponse.json({ success: true, data: files });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

async function generateCode(prompt: string): Promise<FileStructure> {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const enhancedPrompt = `
You are a professional web developer specializing in vanilla HTML, CSS, and JavaScript.

User Request: "${prompt}"

Generate a complete, lightweight web application using ONLY HTML, CSS, and vanilla JavaScript.

INSTRUCTIONS:
- Respond ONLY with a valid JavaScript object.
- The Backgorund color should always be white
- DO NOT use markdown or wrap the object in \`\`\`js, \`\`\`javascript, or \`\`\` at all.
- Use backticks inside the object for template literals as needed.
- Object format must be exactly like this:
{
  "index.html": { file: { contents: \`...\` } },
  "style.css": { file: { contents: \`...\` } },
  "script.js": { file: { contents: \`...\` } }
}
- No explanations, no markdown, no extra text — only return the object.
`;

  const result = await model.generateContent(enhancedPrompt);
  const text = result.response.text();
  // Directly eval, since we’re enforcing no code block wrapping
  console.log(text);
  const files: FileStructure = eval(`(${text.trim()})`);
  return files;
}
