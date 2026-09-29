"use client";

import { writeDragPayload } from "@/helpers/drag-payload";
import { useDeleteTask, useUpdateTask } from "@/hooks/use-task-mutations";
import type { Task } from "@/types/task";
import { classNames } from "@/utils/class-names";
import { CompleteToggle } from "./complete-toggle";
import { TaskCardActions } from "./task-card-actions";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
}

const dateFormat = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
});

export function TaskCard({ task, onEdit, onView }: TaskCardProps) {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const isDone = task.status === "COMPLETED";
  const isBusy = updateTask.isPending || deleteTask.isPending;
  const errorMessage = updateTask.error?.message ?? deleteTask.error?.message;

  return (
    <article
      draggable={!isBusy}
      aria-busy={isBusy}
      onClick={() => onView(task)}
      onDragStart={(event) =>
        writeDragPayload(event.dataTransfer, {
          id: task.id,
          status: task.status,
        })
      }
      className={classNames(
        "group cursor-grab rounded-lg border border-line bg-white p-3 shadow-sm transition hover:border-brand/40 hover:shadow-md active:cursor-grabbing",
        isBusy && "cursor-wait opacity-60",
      )}
    >
      <div className="flex items-start gap-2.5">
        <CompleteToggle
          checked={isDone}
          title={task.title}
          disabled={isBusy}
          onToggle={() =>
            updateTask.mutate({
              id: task.id,
              input: { status: isDone ? "TODO" : "COMPLETED" },
            })
          }
        />
        <div className="min-w-0">
          <h3
            className={classNames(
              "wrap-break-word text-sm font-medium",
              isDone && "text-muted line-through",
            )}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 line-clamp-3 whitespace-pre-line wrap-break-words text-[13px] text-muted">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {errorMessage && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {errorMessage}
        </p>
      )}
      <footer className="mt-2 flex items-center justify-between gap-2 pl-6.5 text-xs text-muted">
        {isBusy ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 animate-spin rounded-full border-2 border-line border-t-brand" />
            Saving...
          </span>
        ) : (
          <time dateTime={task.updatedAt.toISOString()}>
            {dateFormat.format(task.updatedAt)}
          </time>
        )}

        <TaskCardActions
          disabled={isBusy}
          onEdit={() => onEdit(task)}
          onDelete={() => deleteTask.mutate(task.id)}
        />
      </footer>
    </article>
  );
}
