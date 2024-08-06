import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import {
  addMapel,
  deleteMapel,
  editMapel,
  getMapel,
} from "../controllers/mapel-controller.js";

const MapelRouter = express.Router();

MapelRouter.post("/add-mapel", verifyToken, addMapel);
MapelRouter.get("/get-mapel", verifyToken, getMapel);
MapelRouter.put("/edit-mapel/:id", verifyToken, editMapel);
MapelRouter.delete("/delete-mapel/:id", verifyToken, deleteMapel);

export default MapelRouter;
