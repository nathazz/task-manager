import { z } from "zod";
import { TASK_STATUSES } from "@/helpers/task-status";

export const taskStatusSchema = z.enum(TASK_STATUSES);

export const taskSchema = z.object({
  id: z.string(),
  status: taskStatusSchema,
  title: z.string(),
  description: z.string().nullable(),
  updatedAt: z.coerce.date(),
});
export type Task = z.infer<typeof taskSchema>;

export const taskListSchema = z.array(taskSchema);
export type TaskList = z.infer<typeof taskListSchema>;

export interface CreateTaskInput {
  title: string;
  description?: string | null;
  status?: z.infer<typeof taskStatusSchema>;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  status?: z.infer<typeof taskStatusSchema>;
}
