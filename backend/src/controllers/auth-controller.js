import { compare } from "bcrypt";
import Admin from "../models/admin-model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import ResponseError from "../error/response-error.js";

dotenv.config();

const maxAge = 24 * 60 * 60 * 1000;

const createToken = (data) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT SECRET KEY IS NOT DEFINED");
  }

  const jwtExpiration = 24 * 60 * 60;

  return jwt.sign({ data }, secretKey, { expiresIn: jwtExpiration });
};

export const createAdmin = async (req, res, next) => {
  try {
    const username = req.body.ni;
    const password = req.body.password;

    const admin = new Admin({ username, password });

    await admin.save();

    res.status(200).json({ success: true, admin });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { ni, password } = req.body;

    let user = await Admin.findOne({ username: ni });

    if (!user) {
      throw new ResponseError(404, "NIS/NIK dan Password salah");
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new ResponseError(400, "NIS/NIK dan Password salah");
    }

    let data;

    if (user.role === "admin") {
      data = await Admin.findOne({ username: ni }).select("-password");
    }

    //        else if (user.role === "guru") {
    //      data = await Guru.findOne({ username: ni }).select("-password");
    //    } else if (user.role === "siswa") {
    //      data = await Siswa.findOne({ username: ni }).select("-password");
    //    }

    res.cookie("Schoolarcy", createToken(ni), {
      maxAge,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ success: true, message: "Berhasil Login", data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
