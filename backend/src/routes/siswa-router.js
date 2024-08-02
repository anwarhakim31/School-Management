import express from "express";
import { getAll } from "../controllers/siswa-controller.js";
import verifyToken from "../middlewares/auth-middleware.js";

const siswaRouter = express.Router();

siswaRouter.get("/get-all-siswa", verifyToken, getAll);

export default siswaRouter;
