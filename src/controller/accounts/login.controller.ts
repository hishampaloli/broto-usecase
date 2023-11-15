import { Request, Response, NextFunction } from "express";
import { loginUsecase } from "../../usecase/accounts";
import {
  createErrorWithStackResponse,
  createSuccessResponse,
} from "../../utils/response";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const usecase = await loginUsecase();

    await usecase.validate(email, password);
    const token = await usecase.execute(email, password);
    
    res.json(createSuccessResponse(token, req));
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
