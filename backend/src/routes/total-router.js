import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";

const totalRouter = express.Router();

// totalRouter.post("/add-total", verifyToken, addtotal);
// totalRouter.get("/get-total", verifyToken, gettotal);
// totalRouter.put("/edit-total/:id", verifyToken, edittotal);
// totalRouter.delete("/delete-total/:id", verifyToken, deletetotal);

export default totalRouter;
