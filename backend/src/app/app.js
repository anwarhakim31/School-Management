import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "../middlewares/error-middleware.js";
import authRouter from "../routes/auth-router.js";
import siswaRouter from "../routes/siswa-router.js";

export const app = express();

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/siswa", siswaRouter);

app.use(errorMiddleware);
