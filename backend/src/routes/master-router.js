import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import { getMaster } from "../controllers/master-controller.js";

const masterRouter = express.Router();

// masterRouter.post("/add-total", verifyToken, addtotal);
masterRouter.get("/get-master", verifyToken, getMaster);
// masterRouter.put("/edit-total/:id", verifyToken, edittotal);
// masterRouter.delete("/delete-total/:id", verifyToken, deletetotal);

export default masterRouter;
