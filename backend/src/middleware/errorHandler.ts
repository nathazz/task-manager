import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import {
  AppError,
  NotFoundError,
  ValidationError,
} from "../errors/AppError.js";

export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new NotFoundError("Route not found"));
}

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    res.status(422).json({
      message: error.message,
      details: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });

    return;
  }

  if (error instanceof ValidationError) {
    res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });

    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });

    return;
  }

  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
}
