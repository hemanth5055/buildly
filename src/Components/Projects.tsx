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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {projects.projects.map((project) => (
        <div
          key={project.id}
          className="bg-[#f0f0f0] hover:bg-[#d3d3d3] dark:bg-[#121212] dark:hover:bg-[#1e1e1e] hover:shadow-lg rounded-2xl p-6 transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                {project.name}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4">
                {(project.initialPrompt?.split(" ").length || 0) > 50
                  ? project.initialPrompt.split(" ").slice(0, 50).join(" ") +
                    "..."
                  : project.initialPrompt || "No description available."}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 ml-4">
              <Link href={`/project/${project.id}`}>
                <div className="w-9 h-9 rounded-full bg-[#2e2e2e] hover:bg-[#3a3a3a] flex items-center justify-center cursor-pointer transition-colors">
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
