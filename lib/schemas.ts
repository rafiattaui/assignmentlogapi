import * as z from "zod";

const StatusEnum = z.enum(["CREATE", "ON_PROCESS", "SUBMITTED"])

export const AssignmentSchema = z.object({
  id: z.int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  dueDate: z.string(), // date or string weird validation
  name: z.string().min(5).max(50),
  description: z.string().optional(),
  status: StatusEnum
});

export const CreateAssignmentSchema = AssignmentSchema.omit({
  id: true,
  createdAt: true,
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
      status: StatusEnum,
      dueDate:  z.date().optional().nullable()
    })
  ),
});
