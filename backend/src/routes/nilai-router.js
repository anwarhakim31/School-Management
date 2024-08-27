import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import { addNilai } from "../controllers/nilai-controller.js";

const nilaiRouter = express.Router();

nilaiRouter.post("/add-nilai", verifyToken, addNilai);

export default nilaiRouter;
