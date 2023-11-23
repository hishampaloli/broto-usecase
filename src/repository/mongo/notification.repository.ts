import { TransactionClientType } from "../../config/TransactionService";
import { Notification } from "../../models/mongo";
import { NotificationAttrs, NotificationRepository } from "../../types/types";

const notificationRepository: NotificationRepository = {
  createNotification: async (data: NotificationAttrs) => {
    await Notification.create(data);
  },

  createNotifications: async (notifications: NotificationAttrs[]) => {
    await Notification.insertMany(notifications);
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
