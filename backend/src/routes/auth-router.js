import express from "express";
import {
  createAdmin,
  getAuth,
  getDataUmum,
  loginUser,
  logout,
  updateProfile,
  uploadProfileImage,
} from "../controllers/auth-controller.js";
import verifyToken from "../middlewares/auth-middleware.js";
import { upload } from "../util/multer.js";

const authRouter = express.Router();

authRouter.post("/create-admin", createAdmin);
authRouter.post("/login", loginUser);
// authRouter.post("/refresh-token", verifyToken, refreshToken);
authRouter.get("/get-auth", verifyToken, getAuth);
authRouter.put("/update-profile", verifyToken, updateProfile);
authRouter.delete("/logout", verifyToken, logout);
authRouter.post(
  "/add-profile-image",
  verifyToken,
  upload.single("image"),
  uploadProfileImage
);

authRouter.get("/get-data-umum", verifyToken, getDataUmum);

export default authRouter;
