import { app } from "./app";
import { DatabaseConnector } from "./config/db";
import { EnvironmentChecker } from "./config/envChecker";
import { MONGO_URI } from "./utils/env";

const start = async () => {
  try {
    let env = new EnvironmentChecker();
    const dbConnector = new DatabaseConnector(MONGO_URI);

    await env.check();
    await dbConnector.connect();

    app.listen(8000, () => {
      console.log("Listening on port 3000!!!!!!!!");
    });
  } catch (err) {
    console.error(err, "start error");
  }
};

start();
