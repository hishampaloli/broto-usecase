import { UserRepository } from "../types/types";
import { DATABASE_TYPE } from "../utils/env";
let db: string = DATABASE_TYPE;

let userRepository: UserRepository; // You can use 'any' if the structures of both repositories are not exactly the same

(async () => {
  if (db === "mongo") {
    const { userRepository: mongoUserRepository } = await import("./mongo");
    userRepository = mongoUserRepository;
    
  } else if (db === "pg") {
    const { userRepository: pgUserRepository } = await import("./mysql");
    userRepository = pgUserRepository;
  }
})();

export { userRepository };
