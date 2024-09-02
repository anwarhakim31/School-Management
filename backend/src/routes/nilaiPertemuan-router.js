import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import {
  addNilai,
  deleteManyNilai,
  deleteNilai,
  getNilai,
  getRekap,
  updateNilai,
} from "../controllers/nilaiPertemuan-controller.js";

const nilaiPertemuanRouter = express.Router();

nilaiPertemuanRouter.post("/add-nilai", verifyToken, addNilai);
nilaiPertemuanRouter.get(
  "/:kelasId/pertemuan/:pertemuan",
  verifyToken,
  getNilai
);
nilaiPertemuanRouter.delete("/delete-one/:id", verifyToken, deleteNilai);
nilaiPertemuanRouter.delete("/delete-many", verifyToken, deleteManyNilai);
nilaiPertemuanRouter.put("/update-nilai/:id", verifyToken, updateNilai);
nilaiPertemuanRouter.get(
  "/get-rekap/:kelasId/:semester",
  verifyToken,
  getRekap
);

export default nilaiPertemuanRouter;
