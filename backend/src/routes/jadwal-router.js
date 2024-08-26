import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import {
  addJadwal,
  deleteJadwal,
  editJadwal,
  getJadwal,
  getJadwalGuru,
} from "../controllers/jadwal-controller.js";

const jadwalRouter = new express.Router();

jadwalRouter.post("/add-jadwal", verifyToken, addJadwal);
jadwalRouter.get("/get-jadwal", verifyToken, getJadwal);
jadwalRouter.get("/get-jadwal-guru", verifyToken, getJadwalGuru);
jadwalRouter.delete("/delete-jadwal/:id", verifyToken, deleteJadwal);
jadwalRouter.put("/edit-jadwal/:id", verifyToken, editJadwal);

export default jadwalRouter;
