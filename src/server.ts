import cluster, { Worker } from "cluster";
import os from "os";
import { app } from "./app";
import { DatabaseConnector } from "./config/db";
import { EnvironmentChecker } from "./config/envChecker";
import { MONGO_URI } from "./utils/env";
import cronJob from "node-cron";
import { ev } from "./events/events";

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  cronJob.schedule('0 */2 * * *', () => {
    ev.emit("sentReviewNotification");
  });

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker: Worker, code: number, signal: string) => {
    console.log(`Worker ${worker.process.pid} died, creating a new one`);
    cluster.fork();
  });
} else {
  const start = async () => {
    try {
      let env = new EnvironmentChecker();
      const dbConnector = new DatabaseConnector(MONGO_URI);

      await env.check();
      await dbConnector.connect();

      app.listen(8000, () => {
        console.log(`Worker ${process.pid} listening on port 8000`);
      });
    } catch (err) {
      console.error(err, `Worker ${process.pid} start error`);
    }
  };

  start();
}
