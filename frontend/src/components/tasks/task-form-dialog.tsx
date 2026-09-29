"use client";

import { useState, type SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { STATUS_META, TASK_STATUSES, type TaskStatus } from "@/helpers/task-status";
import { useCreateTask, useUpdateTask } from "@/hooks/use-task-mutations";
import { taskStatusSchema, type Task } from "@/types/task";

export type TaskFormTarget =
  { mode: "create"; status: TaskStatus } | { mode: "edit"; task: Task };

interface TaskFormDialogProps {
  target: TaskFormTarget;
  onClose: () => void;
}

export function TaskFormDialog({ target, onClose }: TaskFormDialogProps) {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const isEditing = target.mode === "edit";

  const [title, setTitle] = useState(isEditing ? target.task.title : "");

  const [description, setDescription] = useState(
    isEditing ? (target.task.description ?? "") : "",
  );

  const [status, setStatus] = useState<TaskStatus>(
    isEditing ? target.task.status : target.status,
  );

  const isPending = createTask.isPending || updateTask.isPending;

  const errorMessage = createTask.error?.message ?? updateTask.error?.message;

  const normalizedTitle = title.trim();
  const normalizedDescription = description.trim() || null;

  const hasChanges = isEditing
    ? normalizedTitle !== target.task.title ||
      normalizedDescription !== target.task.description ||
      status !== target.task.status
    : true;

  const canSave = normalizedTitle !== "" && !isPending && hasChanges;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSave) return;

    const input = {
      title: normalizedTitle,
      description: normalizedDescription,
      status,
    };

    const options = {
      onSuccess: onClose,
    };

    if (target.mode === "edit") {
      updateTask.mutate(
        {
          id: target.task.id,
          input,
        },
        options,
      );

      return;
    }

    createTask.mutate(input, options);
  }

  function handleStatusChange(value: string) {
    const parsed = taskStatusSchema.safeParse(value);

    if (parsed.success) {
      setStatus(parsed.data);
    }
  }

  return (
    <Modal title={isEditing ? "Edit task" : "New task"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={200}
          autoFocus
          required
        />

        <TextAreaField
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
        />

        <SelectField
          label="Status"
          value={status}
          onChange={(event) => handleStatusChange(event.target.value)}
        >
          {TASK_STATUSES.map((option) => (
            <option key={option} value={option}>
              {STATUS_META[option].label}
            </option>
          ))}
        </SelectField>

        {errorMessage && (
          <p role="alert" className="text-sm text-danger">
            {errorMessage}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" variant="primary" disabled={!canSave}>
            {isPending ? "Saving" : isEditing ? "Save changes" : "Create task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
