import { prisma } from "../lib/prisma.js";

export const userRepository = {
  findByClerkId(clerkId: string) {
    return prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });
  },

  upsertByClerkId(data: { clerkId: string; email: string }) {
    return prisma.user.upsert({
      where: {
        clerkId: data.clerkId,
      },
      update: {
        email: data.email,
      },
      create: {
        clerkId: data.clerkId,
        email: data.email,
      },
      select: {
        id: true,
      },
    });
  },
};
