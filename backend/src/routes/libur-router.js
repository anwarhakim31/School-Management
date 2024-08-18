import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import {
  deleteLiburNasional,
  getLibur,
  liburNasional,
  togglePerpekan,
} from "../controllers/libur-controller.js";

const liburRouter = express.Router();

liburRouter.post("/toggle-perpekan", verifyToken, togglePerpekan);
liburRouter.get("/get-libur", verifyToken, getLibur);
liburRouter.post("/add-nasional", verifyToken, liburNasional);
liburRouter.delete(
  "/delete-nasional/:tanggal",
  verifyToken,
  deleteLiburNasional
);

export default liburRouter;
