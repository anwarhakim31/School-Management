import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import {
  getMaster,
  getAkademik,
  toggleSemester,
} from "../controllers/master-controller.js";

const masterRouter = express.Router();

// masterRouter.post("/add-total", verifyToken, addtotal);
masterRouter.get("/get-master", verifyToken, getMaster);
masterRouter.get("/get-akademik", verifyToken, getAkademik);
masterRouter.post("/toggle-semester", verifyToken, toggleSemester);
// masterRouter.delete("/delete-total/:id", verifyToken, deletetotal);

export default masterRouter;
