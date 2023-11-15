import { EventEmitter } from "events";
import { notificationRepository } from "../repository";
import { NotificationAttrs } from "../types/types";
const ev = new EventEmitter();

ev.on("userCreated", async (data: NotificationAttrs) => {
  await notificationRepository.createNotification(data);
});

export { ev };
