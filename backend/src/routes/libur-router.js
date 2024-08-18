import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import { getLibur, togglePerpekan } from "../controllers/libur-controller.js";

const liburRouter = express.Router();

liburRouter.post("/toggle-perpekan", verifyToken, togglePerpekan);
liburRouter.get("/get-libur", verifyToken, getLibur);

export default liburRouter;
