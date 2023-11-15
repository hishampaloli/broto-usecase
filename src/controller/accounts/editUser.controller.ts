import { Request, Response, NextFunction } from "express";
import { editUserUsecase } from "../../usecase/accounts";
import {
  createErrorWithStackResponse,
  createSuccessResponse,
} from "../../utils/response";

export const editUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = req.body;
    const { role, email } = req.user;
    const usecase = await editUserUsecase();

    await usecase.validate(data, role);
    await usecase.execute(email, data);

    res.json(createSuccessResponse("User edited successfully", req));
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
