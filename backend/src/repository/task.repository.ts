import { Prisma } from "../../generated/prisma/client.js";
import type { TaskStatus } from "../../generated/prisma/enums.js";
import { ConflictError } from "../errors/AppError.js";
import { prisma } from "../lib/prisma.js";
import type { CreateTaskInput, ListTasksParams } from "../types/task.schema.js";

const MAX_TASKS = 500;
export const taskRepository = {
  async findMany({ userId, status }: ListTasksParams) {
    return prisma.task.findMany({
      where: {
        userId,
        ...(status ? { status } : {}),
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: MAX_TASKS,
    });
  },
  findByIdForUser(id: string, userId: string) {
    return prisma.task.findFirst({
      where: { id, userId },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        updatedAt: true,
      },
    });
  },

  async create(userId: string, data: CreateTaskInput) {
    try {
      return await prisma.task.create({
        data: {
          title: data.title,
          description: data.description ?? null,
          status: data.status,
          userId,
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictError("A task with this title already exists");
        }
      }

      throw error;
    }
  },

  async updateForUser(
    id: string,
    userId: string,
    data: Partial<{
      title: string;
      description: string | null;
      status: TaskStatus;
    }>,
  ) {
    const [task] = await prisma.task.updateManyAndReturn({
      where: { id, userId },
      data,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        updatedAt: true,
      },
    });

    return task ?? null;
  },

  async deleteForUser(id: string, userId: string) {
    const result = await prisma.task.deleteMany({ where: { id, userId } });
    return result.count;
  },
};
