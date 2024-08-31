import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import {
  addAjaran,
  deleteAjaran,
  editAjaran,
  getAjaran,
  getAjaranAktif,
} from "../controllers/tahunAjaran-controller.js";

const ajaranRouter = express.Router();

ajaranRouter.post("/add-ajaran", verifyToken, addAjaran);
ajaranRouter.get("/get-ajaran", verifyToken, getAjaran);
ajaranRouter.get("/get-ajaran-aktif", getAjaranAktif);
ajaranRouter.put("/edit-ajaran/:id", verifyToken, editAjaran);
ajaranRouter.delete("/delete-ajaran/:id", verifyToken, deleteAjaran);

export default ajaranRouter;
