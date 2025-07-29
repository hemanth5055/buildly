import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const MODEL_NAME = "gemini-2.5-flash";
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

interface AIResponse {
  name: string;
  code: string;
}

export async function generateCode(prompt: string): Promise<AIResponse> {
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

export async function enhancePrompt(prompt: string): Promise<string> {
  const enhancePrompt = `
    You are a professional prompt engineer. Your task is to improve the given prompt, making it more professional, clear, and meaningful.
    Here is the original prompt: <Prompt>${prompt}</Prompt>
    Now, enhance this prompt using your expertise into 50 words at max. Only return the improved prompt as plain text — do not include any explanations, wrappers, or markdown formatting.
  `;

  const response = await model.generateContent(enhancePrompt);
  const text = response.response.text().trim();
  return text;
}
