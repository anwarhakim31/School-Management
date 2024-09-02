import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import { addNilai } from "../controllers/nilaiPertemuan-controller.js";

const nilaiPertemuanRouter = express.Router();

nilaiPertemuanRouter.post("/add-nilai", verifyToken, addNilai);

export default nilaiPertemuanRouter;
