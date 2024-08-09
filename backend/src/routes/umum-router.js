import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import { getUmum } from "../controllers/umum-controller.js";

const umumRouter = express.Router();

// umumRouter.post("/add-total", verifyToken, addtotal);
umumRouter.get("/get-umum", verifyToken, getUmum);
// umumRouter.put("/edit-total/:id", verifyToken, edittotal);
// umumRouter.delete("/delete-total/:id", verifyToken, deletetotal);

export default umumRouter;
