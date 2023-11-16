import { Request, Response, NextFunction } from "express";
import { getAllUsers } from "../../usecase/accounts";
import {
  createErrorWithStackResponse,
  createSuccessResponse,
} from "../../utils/response";

export const getAllCordinators = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const usecase = await getAllUsers();

    const data = await usecase.getReviewers()

    res.json(createSuccessResponse(data, req));
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json(
        createErrorWithStackResponse(
          error.statusCode || 500,
          error.message,
          error.stack,
          req
        )
      );
  }
};
