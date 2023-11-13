import mongoose, { ConnectOptions } from "mongoose";

class DatabaseConnector {
  constructor(private mongoUrl: string) {}

  async connect() {
    try {
      const options: ConnectOptions = {};
      console.log(this.mongoUrl);
      
      console.log(process.env.MONGO_URI);
      const conn = await mongoose.connect(this.mongoUrl, options);
      console.log(`DB connected: ${conn.connection.host}`);
    } catch (error: any) {
      console.error(error);
      process.exit(1);
    }
  }
}



export { DatabaseConnector };