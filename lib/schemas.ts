import * as z from "zod";

export const AssignmentSchema = z.object({
  id: z.int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().min(5).max(50),
  description: z.string().optional(),
  isCompleted: z.boolean(),
});

export const CreateAssignmentSchema = AssignmentSchema.omit({
  id: true,
  createdAt: true,
  isCompleted: true,
  updatedAt: true,
});

export const PublicAssignmentSchema = AssignmentSchema;

export const UpdateAssignmentSchema = AssignmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export const IDSchema = z.object({
  id: z.string().describe("Assignment ID")
})

export const CreateAssignmentResponseSchema = z.object({
  success: z.boolean(),
  assignment_id: z.number(),
});

export const AssignmentListResponseSchema = z.object({
  success: z.boolean(),
  assignments: z.array(
    z.object({
      name: z.string(),
      isCompleted: z.boolean(),
    })
  ),
});
