import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import {
  addNilai,
  deleteNilai,
  getNilai,
} from "../controllers/nilaiPertemuan-controller.js";

const nilaiPertemuanRouter = express.Router();

nilaiPertemuanRouter.post("/add-nilai", verifyToken, addNilai);
nilaiPertemuanRouter.get(
  "/:kelasId/pertemuan/:pertemuan",
  verifyToken,
  getNilai
);
nilaiPertemuanRouter.delete("/delete-one/:id", verifyToken, deleteNilai);

export default nilaiPertemuanRouter;
