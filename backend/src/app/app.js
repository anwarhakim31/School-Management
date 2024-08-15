import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "../middlewares/error-middleware.js";
import authRouter from "../routes/auth-router.js";
import siswaRouter from "../routes/siswa-router.js";
import kelasRouter from "../routes/kelas-router.js";
import MapelRouter from "../routes/mapel-router.js";
import guruRouter from "../routes/guru-router.js";
import ajaranRouter from "../routes/tahunAjaran-router.js";
import umumRouter from "../routes/umum-router.js";
import absenRouter from "../routes/absen-router.js";

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
app.use("/api/kelas", kelasRouter);
app.use("/api/mapel", MapelRouter);
app.use("/api/guru", guruRouter);
app.use("/api/ajaran", ajaranRouter);
app.use("/api/umum", umumRouter);
app.use("/api/absen", absenRouter);

app.use(errorMiddleware);
