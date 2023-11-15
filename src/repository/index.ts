import { UserRepository, NotificationRepository } from "../types/types";
import { DATABASE_TYPE } from "../utils/env";
let db: string = DATABASE_TYPE;

let userRepository: UserRepository; // You can use 'any' if the structures of both repositories are not exactly the same
let notificationRepository: NotificationRepository;

(async () => {
  if (db === "mongo") {
    const {
      userRepository: mongoUserRepository,
      notificationRepository: mongoNotificationRepository,
    } = await import("./mongo");
    userRepository = mongoUserRepository;
    notificationRepository = mongoNotificationRepository;
  } else if (db === "pg") {
    const {
      userRepository: pgUserRepository,
    } = await import("./mysql");
    userRepository = pgUserRepository;
  }
})();

export { userRepository, notificationRepository};
