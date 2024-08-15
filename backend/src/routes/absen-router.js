import express from "express";
import {
  getAbsenKelas,
  getRekapAbsensi,
  postAbsenKelas,
} from "../controllers/absen-controller.js";
import verifyToken from "../middlewares/auth-middleware.js";

const absenRouter = express.Router();

absenRouter.get("/:kelasId/siswa", verifyToken, getAbsenKelas);
absenRouter.post("/:kelasId/absensi", verifyToken, postAbsenKelas);
absenRouter.get("/:kelasId/rekap-absen", verifyToken, getRekapAbsensi);

export default absenRouter;
