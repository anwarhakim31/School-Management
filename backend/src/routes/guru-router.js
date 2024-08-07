import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import {
  addGuru,
  deleteOneGuru,
  getAllGuru,
  getDetail,
  getGuru,
} from "../controllers/guru-controller.js";

const guruRouter = express.Router();

guruRouter.post("/add-guru", verifyToken, addGuru);
guruRouter.get("/get-guru", verifyToken, getGuru);
guruRouter.get("/get-detail-guru", verifyToken, getDetail);
guruRouter.get("/get-all-guru", verifyToken, getAllGuru);
guruRouter.delete("/delete-one-guru/:id", verifyToken, deleteOneGuru);

export default guruRouter;