import express from "express";
import {
  createAdmin,
  getAuth,
  loginUser,
} from "../controllers/auth-controller.js";
import verifyToken from "../middlewares/auth-middleware.js";

const authRouter = express.Router();

authRouter.post("/create-admin", createAdmin);
authRouter.post("/login", loginUser);
authRouter.get("/get-auth", verifyToken, getAuth);

export default authRouter;
