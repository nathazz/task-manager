import type { Request, Response } from "express";

import { taskService } from "../service/task.service.js";
import {
  createTaskSchema,
  listTasksQuerySchema,
  taskIdParamSchema,
  updateTaskSchema,
} from "../types/task.schema.js";

export async function getById(req: Request, res: Response) {
  const { id } = taskIdParamSchema.parse(req.params);

  const task = await taskService.getById(req.userId, id);

  res.status(200).json(task);
}

export async function list(req: Request, res: Response) {
  const query = listTasksQuerySchema.parse(req.query);

  const result = await taskService.list(req.userId, query);

  res.status(200).json(result);
}

export async function create(req: Request, res: Response) {
  const input = createTaskSchema.parse(req.body);

  const task = await taskService.create(req.userId, input);

  res.status(201).json(task);
}

export async function update(req: Request, res: Response) {
  const { id } = taskIdParamSchema.parse(req.params);

  const input = updateTaskSchema.parse(req.body);

  const task = await taskService.update(req.userId, id, input);

  res.status(200).json(task);
}

export async function remove(req: Request, res: Response) {
  const { id } = taskIdParamSchema.parse(req.params);

  await taskService.remove(req.userId, id);

  res.status(204).send();
}
