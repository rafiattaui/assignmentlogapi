import { NextRequest, NextResponse } from "next/server";
import { APIError, handleError } from "@/lib/error";
import { prisma } from "@/lib/prisma";
import { UpdateAssignmentSchema } from "@/lib/schemas";

/**
 * @description Fetches assignment details by ID
 * @pathParams IDSchema
 * @response 200: { success: boolean, assignment: PublicAssignmentSchema }
 * @response 404: { error: string }
 * @openapi
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const par = await params;
    const id = parseInt(par.id);
    const assignment = await prisma.assignment.findFirst({
      where: {
        id,
      },
    });

    if (!assignment) {
      throw new APIError("Unable to find valid assignment of that ID.");
    }

    return NextResponse.json({ success: true, assignment: assignment });
  } catch (err) {
    return handleError(err);
  }
}

/**
 * @description Deletes an assignment
 * @pathParams IDSchema
 * @response 200: { success: boolean }
 * @response 404: { error: string }
 * @openapi
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const par = await params;
    const id = parseInt(par.id);
    const result = await prisma.assignment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return handleError(err);
  }
}

/**
 * @description Updates an existing assignment
 * @pathParams IDSchema
 * @body UpdateAssignmentSchema
 * @response 200: { success: boolean, assignment: PublicAssignmentSchema }
 * @response 400: { error: string }
 * @openapi
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const par = await params;
    const id = parseInt(par.id);

    const rawData = await request.json();
    const data = UpdateAssignmentSchema.parse(rawData);

    const res = await prisma.assignment.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json({ success: true, assignment: res });
  } catch (err) {
    return handleError(err);
  }
}
