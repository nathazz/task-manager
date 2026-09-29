export const TASK_STATUSES = ["TODO", "IN_PROGRESS", "IN_REVIEW", "COMPLETED"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

interface StatusMeta {
  label: string;
  emptyMessage: string;
  pillClass: string;
  dotClass: string;
}

export const STATUS_META: Record<TaskStatus, StatusMeta> = {
  TODO: {
    label: "To do",
    emptyMessage: "No tasks yet. Add one to get started.",
    pillClass: "bg-line text-ink/70",
    dotClass: "bg-muted",
  },

  IN_PROGRESS: {
    label: "In progress",
    emptyMessage: "No tasks in progress yet.",
    pillClass: "bg-orange-100 text-orange-700",
    dotClass: "bg-orange-500",
  },


  IN_REVIEW: {
    label: "In review",
    emptyMessage: "No tasks in review yet.",
    pillClass: "bg-purple-100 text-purple-700",
    dotClass: "bg-purple-500",
  },

  COMPLETED: {
    label: "Done",
    emptyMessage: "Completed tasks show up here.",
    pillClass: "bg-done-soft text-done",
    dotClass: "bg-done",
  },
};
