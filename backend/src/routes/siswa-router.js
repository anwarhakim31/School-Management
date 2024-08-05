import express from "express";
import {
  addSiswa,
  deleteOneSiswa,
  getAll,
  uploadPhotoSiswa,
} from "../controllers/siswa-controller.js";
import verifyToken from "../middlewares/auth-middleware.js";
import { upload } from "../util/multer.js";

const siswaRouter = express.Router();

siswaRouter.get("/get-all-siswa", verifyToken, getAll);
siswaRouter.post("/add-siswa", verifyToken, addSiswa);
siswaRouter.delete("/delete-one-siswa/:id", verifyToken, deleteOneSiswa);
siswaRouter.post(
  "/upload-photo-siswa",
  upload.single("image"),
  verifyToken,
  uploadPhotoSiswa
);

export default siswaRouter;
