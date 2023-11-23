import { Request, Response, NextFunction } from "express";
import { updateReviewUsecase } from "../../usecase/review";
import {
  createErrorWithStackResponse,
  createSuccessResponse,
} from "../../utils/response";
export const updateReviewMark = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, feedback, theoryMark, practicalMark } = req.body;

    const usecase = await updateReviewUsecase();

    await usecase.validate();
    const reviewData = await usecase.executeUpdateFromReviewer(
      id,
      feedback,
      theoryMark,
      practicalMark,
      req.user.id
    );

    res.json(createSuccessResponse(reviewData, req));
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
