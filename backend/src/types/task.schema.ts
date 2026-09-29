import { z } from "zod";

const titleSchema = z
  .string({ error: "title is required" })
  .trim()
  .min(1, "title must not be empty")
  .max(200, "title must be at most 200 characters");

const descriptionSchema = z
  .string()
  .trim()
  .max(2000, "description must be at most 2000 characters")
  .nullish();

export const taskStatusSchema = z.enum([
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "COMPLETED",
]);

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema.optional(),
  status: taskStatusSchema.default("TODO"),
});

export const updateTaskSchema = z
  .object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    status: taskStatusSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field (title, description, status) must be provided",
  });

export const taskIdParamSchema = z.object({
  id: z.uuid("id must be a valid UUID"),
});
export const listTasksQuerySchema = z.object({
  status: taskStatusSchema.optional(),
});

export const listTasksParamsSchema = listTasksQuerySchema.extend({
  userId: z.uuid("userId must be a valid UUID"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>;

export type ListTasksParams = z.infer<typeof listTasksParamsSchema>;
