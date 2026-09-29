"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { STATUS_META } from "@/helpers/task-status";
import type { Task } from "@/types/task";

interface TaskDetailsDialogProps {
  task: Task;
  onClose: () => void;
  onEdit: (task: Task) => void;
}

const dateFormat = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function TaskDetailsDialog({
  task,
  onClose,
  onEdit,
}: TaskDetailsDialogProps) {
  const status = STATUS_META[task.status];

  return (
    <Modal title={task.title} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${status.pillClass}`}
          >
            <span
              className={`mr-1.5 size-1.5 rounded-full ${status.dotClass}`}
            />
            {status.label}
          </span>
        </div>

        <section>
          <h3 className="mb-1 text-sm font-medium">Description</h3>

          {task.description ? (
            <p className="whitespace-pre-line wrap-break-words text-sm text-muted">
              {task.description}
            </p>
          ) : (
            <p className="text-sm italic text-muted">
              No description
            </p>
          )}
        </section>

        <div className="text-xs text-muted">
          Last updated {dateFormat.format(task.updatedAt)}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={() => onEdit(task)}
          >
            Edit
          </Button>
        </div>
      </div>
    </Modal>
  );
}