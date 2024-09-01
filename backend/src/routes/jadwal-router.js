import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import {
  addJadwal,
  deleteJadwal,
  deleteManyJadwal,
  editJadwal,
  getJadwal,
  getJadwalGuru,
  getJadwalMengajar,
} from "../controllers/jadwal-controller.js";

const jadwalRouter = new express.Router();

jadwalRouter.post("/add-jadwal", verifyToken, addJadwal);
jadwalRouter.get("/get-jadwal", verifyToken, getJadwal);
jadwalRouter.get("/get-jadwal-guru", verifyToken, getJadwalGuru);
jadwalRouter.get("/get-jadwal-mengajar", verifyToken, getJadwalMengajar);
jadwalRouter.delete("/delete-jadwal/:id", verifyToken, deleteJadwal);
jadwalRouter.delete("/delete-many-jadwal", verifyToken, deleteManyJadwal);
jadwalRouter.put("/edit-jadwal/:id", verifyToken, editJadwal);

export default jadwalRouter;
