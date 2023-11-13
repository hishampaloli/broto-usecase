import express from "express";
import dotenv from "dotenv";
// import UserRouter from "./routes/UserRouter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.ts";
import cors from "cors";
import { corsOptions } from "./utils/constants.ts";

dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));



app.get("/", async (req, res) => {
  res.send("Please go back to your home Page : )");
});

// app.use("/api", UserRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!!!!!");
});

export { app };
