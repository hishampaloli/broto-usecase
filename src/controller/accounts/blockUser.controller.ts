import { Request, Response, NextFunction } from "express";
import { editUserUsecase } from "../../usecase/accounts";
import {
  createErrorWithStackResponse,
  createSuccessResponse,
} from "../../utils/response";

export const blockUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, status } = req.body;
    const usecase = await editUserUsecase();

    await usecase.validate(email, status);
    await usecase.execute(email, status);

    res.json(createSuccessResponse("Account blocked successfully", req));
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
