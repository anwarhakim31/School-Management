import express from "express";
import { getAbsenKelas } from "../controllers/absen-controller.js";

const absenRouter = express.Router();

absenRouter.get("/:kelasId/siswa", getAbsenKelas);

export default absenRouter;
