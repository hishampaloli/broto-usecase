import { app } from "./app";
import { DatabaseConnector } from "./config/db";
import { EnvironmentChecker } from "./config/envChecker";
import { MONGO_URI } from "./utils/env";

const start = async () => {
  try {
    let env = new EnvironmentChecker();
    const dbConnector = new DatabaseConnector(MONGO_URI);

    env.check();
    dbConnector.connect();
  } catch (err) {
    console.error(err, "/sdf");
  }
};

start();
