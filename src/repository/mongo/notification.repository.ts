import { TransactionClientType } from "../../config/TransactionService";
import { Notification } from "../../models/mongo";
import { NotificationAttrs, NotificationRepository } from "../../types/types";

const notificationRepository: NotificationRepository = {
  createNotification: async (data: NotificationAttrs) => {
    console.log(data);

    await Notification.create(data);
  },

  readNotification: async (notificationId: string, userId: string) => {
    await Notification.updateOne(
      { userId, _id: notificationId },
      {
        $set: {
          isRead: true,
          readAt: new Date(),
        },
      }
    );
  },
};

export { notificationRepository };
