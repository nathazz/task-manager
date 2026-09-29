import axios from "axios";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const NETWORK_ERROR_MESSAGE =
  "We couldn't reach the server. Check your connection and try again.";

export const UNEXPECTED_ERROR_MESSAGE =
  "Something went wrong on our side. Please try again in a moment.";

function messageForStatus(status: number): string {
  switch (status) {
    case 400:
    case 422:
      return "Some of the information isn't valid. Please review it and try again.";
    case 401:
    case 403:
      return "Your session has expired. Please sign in again.";
    case 404:
      return "We couldn't find that task. It may have been deleted.";
    case 409:
      return "You already have a task with that title. Try a different one.";
    case 429:
      return "You're doing that too quickly. Please wait a moment and try again.";
    default:
      return UNEXPECTED_ERROR_MESSAGE;
  }
}

export function toApiError(error: Error): ApiError {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError(error)) {
    if (!error.response) return new ApiError(NETWORK_ERROR_MESSAGE, 0);
    const { status } = error.response;
    return new ApiError(messageForStatus(status), status);
  }

  return new ApiError(UNEXPECTED_ERROR_MESSAGE, 0);
}
