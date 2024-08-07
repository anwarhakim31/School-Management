import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import { addGuru, getGuru } from "../controllers/guru-controller.js";

const guruRouter = express.Router();

guruRouter.post("/add-guru", verifyToken, addGuru);
guruRouter.get("/get-guru", verifyToken, getGuru);

export default guruRouter;
