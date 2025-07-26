import { getSpecificProject } from "@/actions/project.action";
import Code from "@/Components/Code";
import Preview from "@/Components/Preview";
import Split from "@/Components/Split";
import { auth } from "@clerk/nextjs/server";
import { FileDown, PanelRight } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/signin");
  //retrieve the project and log it here
  if (!projectId) notFound();
  const { success, project } = await getSpecificProject(projectId);
  if (!success || !project) notFound();
  let parsedFiles: Record<string, any>;
  try {
    parsedFiles = JSON.parse(project.code);
  } catch (err) {
    console.error("Failed to parse project code:", err);
    return notFound();
  }

  const files = {
    "package.json": {
      file: {
        contents: `
{
  "name": "${project.name.toLowerCase().replace(/\s+/g, "-")}",
  "version": "1.0.0",
  "scripts": {
    "start": "serve -l 3000"
  },
  "devDependencies": {
    "serve": "^14.2.0"
  }
}
        `.trim(),
      },
    },
    ...parsedFiles, // ✅ merge original project files
  };

  return (
    <div className="w-full flex flex-col h-screen">
      {/* navbar */}
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="font-medium text-[30px] text-black dark:text-[#F3F5F7] tracking-[-1.2px]">
          Simple Todo App
        </h1>
        <div className="flex gap-2 items-center">
          <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
            <PanelRight />
          </div>
          <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
            <FileDown />
          </div>
        </div>
      </div>

      {/* chat-code-preview-area */}
      <div className="w-full flex flex-1 overflow-hidden px-4 pb-4">
        {/* chat */}

        {/* code-preview */}
        <Split files={files}></Split>
      </div>
    </div>
  );
};

export default page;
