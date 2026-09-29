"use client";

import { useState, type DragEvent } from "react";
import { readDragPayload } from "@/helpers/drag-payload";
import { STATUS_META, type TaskStatus } from "@/helpers/task-status";
import { useUpdateTask } from "@/hooks/use-task-mutations";
import type { Task } from "@/types/task";
import { classNames } from "@/utils/class-names";
import { TaskCard } from "./task-card";
import { TaskCardSkeleton } from "./task-card-skeleton";

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  isLoading: boolean;
  onAdd: (status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
}

export function TaskColumn({
  status,
  tasks,
  isLoading,
  onAdd,
  onEdit,
  onView,
}: TaskColumnProps) {
  const meta = STATUS_META[status];
  const [isDragOver, setIsDragOver] = useState(false);
  const moveTask = useUpdateTask();

  function handleDragOver(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    if (!isDragOver) {
      setIsDragOver(true);
    }
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    setIsDragOver(false);

    const payload = readDragPayload(event.dataTransfer);

    if (payload && payload.status !== status) {
      moveTask.mutate({
        id: payload.id,
        input: { status },
      });
    }
  }

  return (
    <section
      aria-labelledby={`column-${status}`}
      aria-busy={isLoading}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={classNames(
        "flex min-h-32 flex-col rounded-xl border border-line bg-column p-2 transition-colors",
        "xl:min-h-[calc(100vh-190px)]",
        isDragOver && "bg-brand-soft ring-2 ring-brand/30",
      )}
    >
      <header className="flex items-center gap-2 px-2 py-1.5">
        <h2
          id={`column-${status}`}
          className={classNames(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
            meta.pillClass,
          )}
        >
          <span className={classNames("size-2 rounded-full", meta.dotClass)} />
          {meta.label}
        </h2>

        {!isLoading && <span className="text-sm text-muted">{tasks.length}</span>}
      </header>

      <p className="px-2 pb-2 text-xs text-muted">{meta.emptyMessage}</p>

      <div className="flex flex-1 flex-col gap-2 py-1">
        {isLoading && (
          <>
            <TaskCardSkeleton />
            <TaskCardSkeleton />
            <TaskCardSkeleton />
          </>
        )}

        {!isLoading && tasks.length === 0 && (
          <div className="flex min-h-24 flex-1 items-center justify-center rounded-lg border border-dashed border-line px-3 py-6 text-center text-sm text-muted">
            No tasks
          </div>
        )}

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onView={onView} onEdit={onEdit} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onAdd(status)}
        className="mt-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-muted transition-colors hover:bg-white hover:text-ink"
      >
        + Add task
      </button>
    </section>
  );
}
