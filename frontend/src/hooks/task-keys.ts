export const taskKeys = {
  all: ["tasks"] as const,
  list: (userId: string | null | undefined) =>
    [...taskKeys.all, "list", userId] as const,
};
