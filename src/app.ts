import express from "express";
import dotenv from "dotenv";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.ts";
import cors from "cors";
import { corsOptions } from "./utils/constants.ts";
import { routes } from "./routes/index.ts";

dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));



app.use("/api", routes());

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
