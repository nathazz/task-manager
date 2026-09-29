import type { z } from "zod";
import { ApiError, UNEXPECTED_ERROR_MESSAGE } from "./api-error";

export function parseResponse<S extends z.ZodTypeAny>(
  schema: S,
  data: z.input<S>,
): z.output<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error("Unexpected API response", result.error.issues);
    throw new ApiError(UNEXPECTED_ERROR_MESSAGE, 502);
  }
  return result.data;
}
