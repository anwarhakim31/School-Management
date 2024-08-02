import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import { addKelas } from "../controllers/kelas-controller.js";

const kelasRouter = express.Router();

kelasRouter.post("/add-kelas", verifyToken, addKelas);

export default kelasRouter;
