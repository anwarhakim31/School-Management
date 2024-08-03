import express from "express";
import { getAll, uploadPhotoSiswa } from "../controllers/siswa-controller.js";
import verifyToken from "../middlewares/auth-middleware.js";
import { upload } from "../util/multer.js";

const siswaRouter = express.Router();

siswaRouter.get("/get-all-siswa", verifyToken, getAll);
siswaRouter.post(
  "/upload-photo-siswa",
  upload.single("image"),
  verifyToken,
  uploadPhotoSiswa
);

export default siswaRouter;
