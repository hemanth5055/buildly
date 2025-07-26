import { getSpecificProject } from "@/actions/project.action";
import Code from "@/Components/Code";
import Preview from "@/Components/Preview";
import Split from "@/Components/Split";
import { auth } from "@clerk/nextjs/server";
import { FileDown, PanelRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

// Parses the <File name="...">...</File> blocks into an object keyed by filename -> Took Help of AI
function parseFiles(input: string) {
  // Handle escaped characters properly
  let processedInput = input.replace(/\\n/g, "\n");
  processedInput = processedInput.replace(/\\"/g, '"'); // Handle escaped quotes

  // Try different regex patterns to see which one works
  const patterns = [
    /<File name="([^"]+)">\n([\s\S]*?)<\/File>/g,
    /<File name="([^"]+)">([\s\S]*?)<\/File>/g, // Without requiring \n after opening tag
    /<File\s+name="([^"]+)"\s*>([\s\S]*?)<\/File>/g, // More flexible whitespace
  ];

  const files: Record<string, { file: { contents: string } }> = {};
  let matchCount = 0;

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    // Reset the regex
    pattern.lastIndex = 0;
    const matches = Array.from(processedInput.matchAll(pattern));
    if (matches.length > 0) {
      for (const [fullMatch, name, content] of matches) {
        matchCount++;
        files[name] = {
          file: { contents: content.trim() },
        };
      }
      break; // Stop trying other patterns if this one worked
    }
  }

  return files;
}

const page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/signin");
  if (!projectId) notFound();

  const { success, project } = await getSpecificProject(projectId);
  if (!success || !project) notFound();

  let parsedFiles: Record<string, { file: { contents: string } }>;
  try {
    parsedFiles = parseFiles(project.code);

    // Additional debugging
    if (Object.keys(parsedFiles).length === 0) {
      console.error("❌ No files were parsed!");
      console.log("Raw project.code:", JSON.stringify(project.code));
    }
  } catch (err) {
    console.error("Failed to parse project code:", err);
    return notFound();
  }

  const files = {
    "package.json": {
      file: {
        contents: `{
  "name": "${project.name.toLowerCase().replace(/\s+/g, "-")}",
  "version": "1.0.0",
  "scripts": {
    "start": "serve -l 3000"
  },
  "devDependencies": {
    "serve": "^14.2.0"
  }
}`,
      },
    },
    ...parsedFiles,
  };

  console.log("🎯 Final files structure:", Object.keys(files));

  return (
    <div className="w-full flex flex-col h-screen">
      {/* navbar */}
      <div className="w-full flex justify-between items-center p-4">
        <Link href={"/"}>
          <h1 className="font-medium text-[30px] text-black dark:text-[#F3F5F7] tracking-[-1.2px]">
            Buildly
          </h1>
        </Link>

        <div className="flex gap-2 items-center">
          <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
            <PanelRight />
          </div>
          <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
            <FileDown />
          </div>
        </div>
      </div>

      {/* code-preview-area */}
      <div className="w-full flex flex-1 overflow-hidden px-4 pb-4">
        <Split files={files} />
      </div>
    </div>
  );
};

export default page;
