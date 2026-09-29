import type { AxiosInstance } from "axios";
import { parseResponse } from "@/lib/parse-response";
import {
  taskListSchema,
  taskSchema,
  type CreateTaskInput,
  type Task,
  type TaskList,
  type UpdateTaskInput,
} from "@/types/task";

export async function listTasks(http: AxiosInstance): Promise<TaskList> {
  const { data } = await http.get("/tasks");
  return parseResponse(taskListSchema, data);
}

export async function createTask(
  http: AxiosInstance,
  input: CreateTaskInput,
): Promise<Task> {
  const { data } = await http.post("/tasks", input);
  return parseResponse(taskSchema, data);
}

export async function updateTask(
  http: AxiosInstance,
  id: string,
  input: UpdateTaskInput,
): Promise<Task> {
  const { data } = await http.patch(`/tasks/${id}`, input);
  return parseResponse(taskSchema, data);
}

export async function deleteTask(http: AxiosInstance, id: string): Promise<void> {
  await http.delete(`/tasks/${id}`);
}
