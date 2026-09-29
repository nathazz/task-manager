import { NotFoundError } from "../errors/AppError.js";

import { taskRepository } from "../repository/task.repository.js";
import { userRepository } from "../repository/user.repository.js";
import type {
  CreateTaskInput,
  ListTasksQuery,
  UpdateTaskInput,
} from "../types/task.schema.js";

export const taskService = {
  async list(userId: string, query: ListTasksQuery) {
    const task = await taskRepository.findMany({
      userId,
      status: query.status,
    });

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return task;
  },

  async getById(userId: string, taskId: string) {
    const task = await taskRepository.findByIdForUser(taskId, userId);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return task;
  },

  async create(userId: string, input: CreateTaskInput) {
    return taskRepository.create(userId, input);
  },

  async update(userId: string, taskId: string, input: UpdateTaskInput) {
    const task = await taskRepository.findByIdForUser(taskId, userId);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    await taskRepository.updateForUser(taskId, userId, input);

    return taskRepository.findByIdForUser(taskId, userId);
  },

  async remove(userId: string, taskId: string) {
    const task = await taskRepository.findByIdForUser(taskId, userId);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    await taskRepository.deleteForUser(taskId, userId);
  },
};
