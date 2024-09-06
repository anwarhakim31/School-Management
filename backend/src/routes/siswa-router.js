import express from "express";
import {
  addSiswa,
  addWithExcel,
  deleteManySiswa,
  deleteOneSiswa,
  downloadTemplate,
  editSiswa,
  getAll,
  getAllDetail,
  getSiswaKelas,
  uploadPhotoSiswa,
} from "../controllers/siswa-controller.js";
import verifyToken from "../middlewares/auth-middleware.js";
import { upload } from "../util/multer.js";

const siswaRouter = express.Router();

siswaRouter.get("/get-all-siswa", verifyToken, getAll);
siswaRouter.get("/get-detail-siswa", verifyToken, getAllDetail);
siswaRouter.get("/get-siswa/kelas/:id", verifyToken, getSiswaKelas);

siswaRouter.post("/add-siswa", verifyToken, addSiswa);
siswaRouter.post("/edit-siswa", verifyToken, editSiswa);
siswaRouter.delete("/delete-one-siswa/:id", verifyToken, deleteOneSiswa);
siswaRouter.delete("/delete-many-siswa", verifyToken, deleteManySiswa);
siswaRouter.post(
  "/upload-photo-siswa",
  upload.single("image"),
  verifyToken,
  uploadPhotoSiswa
);
siswaRouter.post(
  "/upload-excel",
  upload.single("file"),
  verifyToken,
  addWithExcel
);
siswaRouter.get("/download-template", verifyToken, downloadTemplate);

export default siswaRouter;
