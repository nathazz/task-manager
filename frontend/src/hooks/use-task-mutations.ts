"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, updateTask } from "@/api/tasks.api";
import { useHttpClient } from "@/context/http-client-context";
import type { CreateTaskInput, UpdateTaskInput } from "@/types/task";
import { taskKeys } from "./task-keys";

function useInvalidateTasks() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: taskKeys.all });
}

export function useCreateTask() {
  const http = useHttpClient();
  const invalidateTasks = useInvalidateTasks();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(http, input),
    onSuccess: invalidateTasks,
  });
}

export function useUpdateTask() {
  const http = useHttpClient();
  const invalidateTasks = useInvalidateTasks();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) =>
      updateTask(http, id, input),
    onSuccess: invalidateTasks,
  });
}

export function useDeleteTask() {
  const http = useHttpClient();
  const invalidateTasks = useInvalidateTasks();

  return useMutation({
    mutationFn: (id: string) => deleteTask(http, id),
    onSuccess: invalidateTasks,
  });
}
