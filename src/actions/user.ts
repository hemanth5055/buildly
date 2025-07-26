import { prisma } from "@/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

//will be later replaced with webhooks
export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) throw new Error("Unauthorized");
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) return { success: true, user: existingUser };

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });
    return { success: true, user: dbUser };
  } catch (error) {
    console.error("syncUser error:", error);
    return { success: false, error: "Failed to sync user" };
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      select: {
        id: true,
        name: true,
        credits: true,
      },
    });
    if (!user) return { success: false };
    return { success: true, user };
  } catch (error) {
    console.log("Error in retrieving user :", error);
    return { success: false };
  }
}
