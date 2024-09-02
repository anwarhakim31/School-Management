import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import {
  addNilai,
  getNilai,
} from "../controllers/nilaiPertemuan-controller.js";

const nilaiPertemuanRouter = express.Router();

nilaiPertemuanRouter.post("/add-nilai", verifyToken, addNilai);
nilaiPertemuanRouter.get(
  "/:kelasId/pertemuan/:pertemuan",
  verifyToken,
  getNilai
);

export default nilaiPertemuanRouter;
