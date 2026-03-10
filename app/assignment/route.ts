import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/error";
import { CreateAssignmentSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";

/**
 * @description Creates a new assignment
 * @body CreateAssignmentSchema
 * @response 201: CreateAssignmentResponseSchema
 * @response 400: { error: string }
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json();
    const data = CreateAssignmentSchema.parse(rawData);

    const result = await prisma.assignment.create({
      data: {
        ...data,
      },
    });

    return NextResponse.json({
      success: true,
      assignment_id: result.id,
    });
  } catch (err) {
    return handleError(err);
  }
}

/**
 * @description Retrieves a list of all assignments (Summary view)
 * @response 200: AssignmentListResponseSchema
 * @openapi
 */
export async function GET(request: NextRequest) {
  try {
    const assignmentList = await prisma.assignment.findMany({
      select: {
        name: true,
        status: true,
        dueDate: true,  
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
