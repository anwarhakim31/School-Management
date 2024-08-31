import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import {
  addKelas,
  deleteKelas,
  getKelas,
  getKelasMengajar,
  getMapelKelas,
  getWaliKelas,
  updateKelas,
} from "../controllers/kelas-controller.js";

const kelasRouter = express.Router();

kelasRouter.post("/add-kelas", verifyToken, addKelas);
kelasRouter.get("/get-kelas", verifyToken, getKelas);
kelasRouter.get("/get-kelas-mengajar", verifyToken, getKelasMengajar);
kelasRouter.delete("/delete-kelas/:id", verifyToken, deleteKelas);
kelasRouter.put("/update-kelas/:id", verifyToken, updateKelas);
kelasRouter.get("/get-wali-kelas/:id", verifyToken, getWaliKelas);
kelasRouter.get("/get-mapel-kelas/:id", verifyToken, getMapelKelas);

export default kelasRouter;
