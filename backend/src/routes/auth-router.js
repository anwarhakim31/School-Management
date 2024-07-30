import express from "express";
import { createAdmin, loginUser } from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/create-admin", createAdmin);
authRouter.post("/login", loginUser);

export default authRouter;
