"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { listTasks } from "@/api/tasks.api";
import { useHttpClient } from "@/context/http-client-context";
import { taskKeys } from "./task-keys";

export function useTasks() {
  const http = useHttpClient();
  const { userId } = useAuth();

  return useQuery({
    queryKey: taskKeys.list(userId),
    queryFn: () => listTasks(http),
    enabled: Boolean(userId),
  });
}
