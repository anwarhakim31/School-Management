import express from "express";
import verifyToken from "../middlewares/auth-middleware.js";
import {
  addGuru,
  deleteManyGuru,
  deleteOneGuru,
  getAllGuru,
  getBidangStudi,
  getDashboard,
  getDetail,
  getGuru,
  updateGuru,
} from "../controllers/guru-controller.js";

const guruRouter = express.Router();

guruRouter.post("/add-guru", verifyToken, addGuru);
guruRouter.get("/get-guru", verifyToken, getGuru);
guruRouter.get("/get-detail-guru", verifyToken, getDetail);
guruRouter.get("/get-all-guru", verifyToken, getAllGuru);
guruRouter.get("/get-dashboard", verifyToken, getDashboard);
guruRouter.get("/get-bidangStudi", verifyToken, getBidangStudi);
guruRouter.delete("/delete-one-guru/:id", verifyToken, deleteOneGuru);
guruRouter.delete("/delete-many-guru", verifyToken, deleteManyGuru);
guruRouter.put("/edit-guru/:id", verifyToken, updateGuru);

export default guruRouter;
