import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/error";
import { CreateAssignmentSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json();
    const data = CreateAssignmentSchema.parse(rawData);

    const result = await prisma.assignment.create({
      data,
    });

    return NextResponse.json({
      success: true,
      assignment_id: result.id,
    });
  } catch (err) {
    return handleError(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const assignmentList = await prisma.assignment.findMany({
      select: {
        name: true,
        isCompleted: true,
      },
    });

    return NextResponse.json({
      success: true,
      assignments: assignmentList,
    });
  } catch (err) {
    return handleError(err);
  }
}
