import { z } from "zod";
import { taskStatusSchema } from "@/types/task";

const ID_TYPE = "application/x-task-id";
const STATUS_TYPE = "application/x-task-status";

const dragPayloadSchema = z.object({
  id: z.string().min(1),
  status: taskStatusSchema,
});

export type DragPayload = z.infer<typeof dragPayloadSchema>;

export function writeDragPayload(
  transfer: DataTransfer,
  payload: DragPayload,
): void {
  transfer.setData(ID_TYPE, payload.id);
  transfer.setData(STATUS_TYPE, payload.status);
  transfer.effectAllowed = "move";
}

export function readDragPayload(transfer: DataTransfer): DragPayload | null {
  const parsed = dragPayloadSchema.safeParse({
    id: transfer.getData(ID_TYPE),
    status: transfer.getData(STATUS_TYPE),
  });
  return parsed.success ? parsed.data : null;
}
