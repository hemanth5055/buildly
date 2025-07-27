"use server";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "./user";

export async function getProjectsOfUser(userId: string) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        initialPrompt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!projects) return { success: false };
    return { success: true, projects };
  } catch (error) {
    console.log("Error in retrieving projects :");
    return { success: false };
  }
}

export async function addProject(
  name: string,
  aiReply: string,
  code: string,
  initialPrompt: string
): Promise<{ success: boolean; projectId?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false };
    }
    const userRecord = await getUserByClerkId(userId);
    if (!userRecord.success || !userRecord.user) {
      return { success: false };
    }

    const dbUserId = userRecord.user.id;
    console.log(code);
    const project = await prisma.project.create({
      data: {
        name,
        code,
        aiReply,
        initialPrompt,
        userId: dbUserId,
      },
    });
    return { success: true, projectId: project.id };
  } catch (error) {
    console.error("Error in addProject:", error);
    return { success: false };
  }
}

export async function getSpecificProject(projectId: string): Promise<{
  success: boolean;
  project?: {
    id: string;
    name: string;
    code: string;
    aiReply: string;
    initialPrompt: string;
    createdAt: Date;
    userId: string;
  };
}> {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return { success: false };
    }

    return {
      success: true,
      project,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return { success: false };
  }
}

export async function deleteProject(projectId: string) {
  try {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      success: false,
      message: "Failed to delete project",
    };
  }
}
