import mongoose from "mongoose";
import { NotificationAttrs } from "../../types/types";

interface NotificationModal extends mongoose.Model<NotificationDoc> {
  build(attrs: NotificationAttrs): NotificationDoc;
}

interface NotificationDoc extends mongoose.Document {
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  readAt: Date | null;
}

const notificationSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      readAt: {
        type: Date,
        default: null,
      },
    },
    {
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    }
  );
  

notificationSchema.set("versionKey", "version");

notificationSchema.statics.build = (attrs: NotificationAttrs) => {
  return new Notification(attrs);
};

const Notification = mongoose.model<NotificationDoc, NotificationModal>(
  "Notification",
  notificationSchema
);

export { Notification, NotificationDoc, NotificationAttrs };
