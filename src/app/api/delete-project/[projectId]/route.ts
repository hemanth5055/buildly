import { NextRequest, NextResponse } from "next/server";
import { deleteProject } from "@/actions/project.action";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;

  const result = await deleteProject(projectId);
  return NextResponse.json(result);
}
