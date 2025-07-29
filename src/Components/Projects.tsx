import { getProjectsOfUser } from "@/actions/project.action";
import { MoveUpRight, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import Delete from "./Delete";

const Projects = async ({ id }: { id: string }) => {
  const projects = await getProjectsOfUser(id);

  if (!projects.success || !projects.projects?.length) {
    return (
      <div className="text-center text-red-400 text-lg mt-10">
        No projects yet
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {projects.projects.map((project) => (
        <div
          key={project.id}
          className="bg-[#121212]  rounded-2xl p-6 shadow-md transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-white mb-2">
                {project.name}
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed">
                {(project.initialPrompt?.split(" ").length || 0) > 50
                  ? project.initialPrompt
                      .split(" ")
                      .slice(0, 50)
                      .join(" ") + "..."
                  : project.initialPrompt || "No description available."}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/project/${project.id}`}>
                <div className="w-9 h-9 rounded-full bg-[#2e2e2e] hover:bg-[#3a3a3a] flex items-center justify-center transition-colors cursor-pointer">
                  <MoveUpRight className="text-white w-4 h-4" />
                </div>
              </Link>
              <Delete id={project.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
