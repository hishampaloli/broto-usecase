import { Request, Response, NextFunction } from "express";
import { createReviewUsecase } from "../../usecase/review";
import {
  createErrorWithStackResponse,
  createSuccessResponse,
} from "../../utils/response";
import { ev } from "../../events/events";

export const scheduleReview = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, reviewerId, week, date } = req.body;

    const usecase = await createReviewUsecase();

    await usecase.validate();
    const reviewData = await usecase.execute(
      studentId,
      reviewerId,
      req.user.id,
      week,
      date
    );

    ev.emit("reviewScheduled", {
      studentId: studentId,
      reviewerId: reviewerId,
      message: `An review is been scheduled for ${date}`,
    });

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
