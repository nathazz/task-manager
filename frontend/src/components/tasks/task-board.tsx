"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TASK_STATUSES } from "@/helpers/task-status";
import { useTasks } from "@/hooks/use-tasks";
import { TaskColumn } from "./task-column";
import type { TaskFormTarget } from "./task-form-dialog";
import type { Task } from "@/types/task";
import { TaskDetailsDialog } from "./task-detail-dialog";

const TaskFormDialog = dynamic(
  () => import("./task-form-dialog").then((module) => module.TaskFormDialog),
  { ssr: false },
);

export function TaskBoard() {
  const [target, setTarget] = useState<TaskFormTarget | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { data: tasks, error, isPending, isError, refetch } = useTasks();

  if (isError && !tasks) {
    return (
      <div
        role="alert"
        className="mx-auto flex max-w-md flex-col items-start gap-3 rounded-xl border border-danger/30 bg-danger-soft p-4 text-sm text-danger"
      >
        <p>{error.message}</p>
        <Button size="sm" onClick={() => void refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My tasks</h1>
          <p className="text-sm text-muted">Drag a card to change its status.</p>
        </div>

        <Button
          variant="primary"
          onClick={() => setTarget({ mode: "create", status: "TODO" })}
        >
          New task
        </Button>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-5">
        {TASK_STATUSES.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks?.filter((task) => task.status === status) ?? []}
            isLoading={isPending}
            onAdd={(newStatus) => setTarget({ mode: "create", status: newStatus })}
            onEdit={(task) => setTarget({ mode: "edit", task })}
            onView={(task) => setSelectedTask(task)}
          />
        ))}
      </div>

      {selectedTask && (
        <TaskDetailsDialog
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={(task) => {
            setSelectedTask(null);
            setTarget({ mode: "edit", task });
          }}
        />
      )}

      {target && <TaskFormDialog target={target} onClose={() => setTarget(null)} />}
    </div>
  );
}
