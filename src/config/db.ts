import mongoose, { ConnectOptions } from "mongoose";
import { DB_NAME } from "../utils/env";
class DatabaseConnector {
  constructor(private mongoUrl: string) {}

  async connect() {
    try {
      const options: ConnectOptions = {};
      const conn = await mongoose.connect(this.mongoUrl, options);
      console.log(`DB connected: ${conn.connection.host}`);     
    } catch (error: any) {
      console.error(error);
      process.exit(1);
    }
  }
}

export { DatabaseConnector };
