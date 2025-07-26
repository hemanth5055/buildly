import { prisma } from "@/prisma";

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
    });
    if (!projects) return { success: false };
    return { success: true, projects };
  } catch (error) {
    console.log("Error in retrieving projects :");
    return { success: false };
  }
}
