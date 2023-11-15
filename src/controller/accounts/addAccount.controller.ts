import { Request, Response, NextFunction } from "express";
import {
  createUserUsecase,
  createStudentProfileUsecase,
} from "../../usecase/accounts";
import {
  createErrorWithStackResponse,
  createSuccessResponse,
} from "../../utils/response";
import { transactionService } from "../../config/TransactionService";
import { ev } from "../../events/events";

export const addAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await transactionService.startTransaction();

  try {
    const { name, email, phone, role, batch } = req.body;
    const userUsecase = await createUserUsecase();
    const studentUsecase = await createStudentProfileUsecase();

    await userUsecase.validate(name, email, phone, role);
    const user = await userUsecase.execute(name, email, phone, role, session);

    if (role === "student") {
      await studentUsecase.validate(batch);
      await studentUsecase.execute(user.id, batch, session);
    }

    ev.emit("userCreated", user);
    await transactionService.commitTransaction(session);

    // Send the response without waiting for the runTime function
    res.json(createSuccessResponse(user, req));
  } catch (error: any) {
    await transactionService.rollbackTransaction(session);
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
