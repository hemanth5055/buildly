import { getProjectsOfUser } from "@/actions/project.action";
import { MoveUpRight, Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Projects = async ({ id }: { id: string }) => {
  const projects = await getProjectsOfUser(id);

  if (!projects.success || !projects.projects?.length) {
    return <h1 className="text-red-400">No projects yet</h1>;
  }

  return (
    <div className="flex flex-col gap-4">
      {projects.projects.map((project) => (
        <div
          key={project.id}
          className="w-full flex bg-[#121212] p-4 py-6 rounded-[10px]"
        >
          <div className="flex-1 flex flex-col gap-1">
            <h1 className="font-medium text-[30px] tracking-[-1px]">
              {project.name}
            </h1>
            <p className="text-gray-400">
              {project.initialPrompt || "No description available."}
            </p>
          </div>
          <div className="flex gap-2 items-start">
            <Link href={`/project/${project.id}`}>
              <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
                <MoveUpRight />
              </div>
            </Link>

            <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
              <Trash />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
