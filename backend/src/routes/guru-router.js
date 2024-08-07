import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import { addGuru } from "../controllers/guru-controller.js";

const guruRouter = express.Router();

guruRouter.post("/add-guru", verifyToken, addGuru);

export default guruRouter;
