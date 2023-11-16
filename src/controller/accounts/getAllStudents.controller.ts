import { Request, Response, NextFunction } from "express";
import { getAllUsers } from "../../usecase/accounts";
import {
  createErrorWithStackResponse,
  createSuccessResponse,
} from "../../utils/response";

export const getAllStudents = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const usecase = await getAllUsers();

    const data = await usecase.getStudents()
    for (let index = 0; index < 500; index++) {
        console.log(index);
    }
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
