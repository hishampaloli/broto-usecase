import { Request, Response, NextFunction } from "express";
import { deleteReviewUsecase } from "../../usecase/review";
import {
  createErrorWithStackResponse,
  createSuccessResponse,
} from "../../utils/response";
import { ev } from "../../events/events";

export const deleteReview = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reviewId } = req.params;

    const usecase = await deleteReviewUsecase();

    await usecase.validate();
    await usecase.execute(reviewId, req.user.id);

    res.json(createSuccessResponse("review deleted", req));
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
