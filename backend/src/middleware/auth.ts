import type { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";

import { UnauthorizedError } from "../errors/AppError.js";
import { userService } from "../service/user.service.js";

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { isAuthenticated, userId: clerkId } = getAuth(req);

  if (!isAuthenticated || !clerkId) {
    return next(new UnauthorizedError());
  }

  try {
    const user = await userService.resolveByClerkId(clerkId);

    req.userId = user.id;

    next();
  } catch (error) {
    next(error);
  }
}
