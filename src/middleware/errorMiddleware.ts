import { Request, Response, NextFunction } from "express";
import {
  ApiErrorResponse,
  createErrorWithStackResponse,
  createNotFoundResponse,
} from "../utils/response";

export function notFoundHandler(req: Request, res: Response) {
  const errorResponse = createNotFoundResponse(req);
  res.status(404).json(errorResponse);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errorResponse = createErrorWithStackResponse(
    500,
    err.message || "Internal Server Error",
    err.stack || "",
    req
  );
  res.status(500).json(errorResponse);
}
