import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import {
  addKelas,
  deleteKelas,
  getKelas,
  getWaliKelas,
  updateKelas,
} from "../controllers/kelas-controller.js";

const kelasRouter = express.Router();

kelasRouter.post("/add-kelas", verifyToken, addKelas);
kelasRouter.get("/get-kelas", verifyToken, getKelas);
kelasRouter.delete("/delete-kelas/:id", verifyToken, deleteKelas);
kelasRouter.put("/update-kelas/:id", verifyToken, updateKelas);
kelasRouter.get("/get-wali-kelas/:id", verifyToken, getWaliKelas);

export default kelasRouter;
