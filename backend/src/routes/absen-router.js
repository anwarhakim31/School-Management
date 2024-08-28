import express from "express";
import {
  editAbsenKelas,
  getAbsenKelas,
  getDataAlreadyAbsen,
  getRekapAbsensi,
  postAbsenKelas,
} from "../controllers/absen-controller.js";
import verifyToken from "../middlewares/auth-middleware.js";

const absenRouter = express.Router();

absenRouter.get("/:kelasId/siswa", verifyToken, getAbsenKelas);
absenRouter.get("/data-already/:kelasId", verifyToken, getDataAlreadyAbsen);
absenRouter.post("/:kelasId/edit-absensi", verifyToken, editAbsenKelas);
absenRouter.post("/:kelasId/absensi", verifyToken, postAbsenKelas);
absenRouter.get("/:kelasId/rekap-absen", verifyToken, getRekapAbsensi);

export default absenRouter;
