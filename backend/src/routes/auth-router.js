import express from "express";
import {
  createAdmin,
  getAuth,
  loginUser,
  uploadProfileImage,
} from "../controllers/auth-controller.js";
import verifyToken from "../middlewares/auth-middleware.js";
import { upload } from "../util/multer.js";

const authRouter = express.Router();

authRouter.post("/create-admin", createAdmin);
authRouter.post("/login", loginUser);
// authRouter.post("/refresh-token", verifyToken, refreshToken);
authRouter.get("/get-auth", verifyToken, getAuth);
authRouter.post(
  "/add-profile-image",
  verifyToken,
  upload.single("image"),
  uploadProfileImage
);
export default authRouter;
