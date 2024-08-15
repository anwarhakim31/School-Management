import express from "express";
import {
  getAbsenKelas,
  postAbsenKelas,
} from "../controllers/absen-controller.js";
import verifyToken from "../middlewares/auth-middleware.js";

const absenRouter = express.Router();

absenRouter.get("/:kelasId/siswa", verifyToken, getAbsenKelas);
absenRouter.post("/:kelasId/absensi", verifyToken, postAbsenKelas);

export default absenRouter;
