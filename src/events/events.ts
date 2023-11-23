import { EventEmitter } from "events";
import { notificationRepository, reviewRepository } from "../repository";
import { NotificationAttrs } from "../types/types";
const ev = new EventEmitter();

ev.on("userCreated", async (data: NotificationAttrs) => {
  await notificationRepository.createNotification(data);
});

ev.on("sentReviewNotification", async () => {
  reviewRepository.findUpcommingReviewsToSchedule()
});

ev.on("reviewScheduled", async (data) => {
  await notificationRepository.createNotifications([
    {
      userId: data.studentId,
      message: data.message,
    },
    {
      userId: data.reviewerId,
      message: data.message,
    },
  ]);
});
export { ev };
