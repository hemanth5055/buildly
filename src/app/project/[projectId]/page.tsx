import { getSpecificProject } from "@/actions/project.action";
import Download from "@/Components/Download";
import Split from "@/Components/Split";
import { auth } from "@clerk/nextjs/server";
import { PanelRight, Send } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

type File = {
  file: {
    contents: string;
  };
};

function structureCode(code: Record<string, string>): Record<string, File> {
  const files: Record<string, File> = {};
  Object.entries(code).forEach(([fileName, contents]) => {
    files[fileName] = { file: { contents } };
  });

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
    parsedFiles = structureCode(JSON.parse(project.code));
    if (Object.keys(parsedFiles).length === 0) {
      console.error("❌ No files were parsed!");
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

  return (
    <div className="w-full flex flex-col min-h-screen bg-white dark:bg-black">
      <div className="w-full flex justify-between items-center p-4 ">
        <div className="flex flex-col">
          <Link href={"/"}>
            <h1 className="font-medium text-[30px] text-black dark:text-white tracking-[-1.2px]">
              Buildly
            </h1>
          </Link>
          <h4 className="font-medium text-[15px] px-1 text-[#a7a7a7] tracking-[-0.5px]">
            {project.name}
          </h4>
        </div>
        <div className="flex gap-2 items-center">
          {/* <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
            <PanelRight />
          </div> */}
          <Download files={files} />
        </div>
      </div>
      <div className="w-full flex flex-1 overflow-hidden scrollbar-hide  px-4 h-[600px] ">
        <div className="w-full h-full">
          <Split files={files} />
        </div>
      </div>
      <div className="w-full h-[100px] flex justify-center items-center">
        <h1 className="font-cursive dark:text-white text-black italic">
          Crafted by{" "}
          <a
            href="https://github.com/hemanth5055"
            target="_blank"
            className="text-blue-500 dark:text-blue-400"
          >
            Hemanth
          </a>{" "}
          😎
        </h1>
      </div>
    </div>
  );
};

export default page;
