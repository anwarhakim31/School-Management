import { compare, genSalt, hash } from "bcrypt";
import Admin from "../models/admin-model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import ResponseError from "../error/response-error.js";
import fs from "fs";
import s3 from "../util/aws3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import Siswa from "../models/siswa-model.js";
import Kelas from "../models/kelas-model.js";
import Guru from "../models/guru-model.js";

dotenv.config();

const maxAge = 24 * 60 * 60 * 1000;

const createToken = (data, id, role) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT SECRET KEY IS NOT DEFINED");
  }

  const jwtExpiration = 24 * 60 * 60;

  return jwt.sign({ data, id, role }, secretKey, { expiresIn: jwtExpiration });
};

export const createAdmin = async (req, res, next) => {
  try {
    const username = req.body.ni;
    const password = req.body.password;

    const admin = new Admin({ username, password });

    await admin.save();

    res.status(200).json({ success: true, admin });
  } catch (error) {
    next();
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { ni, password } = req.body;

    let user =
      (await Admin.findOne({ username: ni })) ||
      (await Guru.findOne({ nip: ni })) ||
      (await Siswa.findOne({ nis: ni }));

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
    } else if (user.role === "guru") {
      data = await Guru.findOne({ nip: ni })
        .select("-password")
        .populate({ path: "waliKelas", select: "kelas nama  " });
    } else if (user.role === "siswa") {
      data = await Siswa.findOne({ nis: ni }).select("-password");
    }

    const accessToken = createToken(ni, user.id, user.role);

    res.cookie("Scholarcy", accessToken, {
      maxAge,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ success: true, message: "Berhasil Login", data });
  } catch (error) {
    next(error);
  }
};

// export const refreshToken = async (req, res) => {
//   const { Schoolarcy } = req.cookies;

//   if (!Schoolarcy)
//     throw new ResponseError(
//       401,
//       "Sesi Login Telah habis, jika ingin melanjutkan silakan login kembali"
//     );

//   try {
//     const userData = jwt.verify(Schoolarcy, process.env.JWT_SECRET_KEY);
//     const newAccessToken = createToken(userData.data, userData.id);

//     res.status(200).json({
//       success: true,
//       message: "Refresh token Baru",
//       refreshToken: newAccessToken,
//     });
//   } catch (error) {
//   }
// };

export const getAuth = async (req, res, next) => {
  try {
    const userId = req.userId;
    // const refreshToken = req.cookies.Schoolarcy;

    let user =
      (await Admin.findOne({ _id: userId }).select("-password")) ||
      (await Guru.findById({ _id: userId })
        .select("-password")
        .populate({ path: "waliKelas", select: "kelas nama" })) ||
      (await Siswa.findById({ _id: userId }).select("-password"));

    if (!user) {
      throw new ResponseError(404, "User tidak ditemukan");
    }

    res.status(200).json({
      success: true,
      message: "Berhasil Mendapatkan Data",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ResponseError(400, "Foto di butuhkan");
    }

    const fileStream = fs.createReadStream(req.file.path);

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `profiles/${Date.now().toString()}-${req.file.originalname}`,
      Body: fileStream,
      ACL: "public-read",
    };

    const data = await s3.send(new PutObjectCommand(uploadParams));

    const fileName = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

    let userUpdate;

    if (req.role === "admin") {
      userUpdate = await Admin.findByIdAndUpdate(
        { _id: req.userId },
        { foto: fileName },
        { runValidators: true, new: true }
      );
    }

    await res.status(200).json({
      success: true,
      message: "Berhasil unggah gambar",
      foto: userUpdate.foto,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const id = req.userId;
    const role = req.role;

    const update = req.body;

    if (update.password && update.password !== "") {
      const salt = await genSalt();

      update.password = await hash(update.password, salt);
    } else {
      delete update.password;
    }

    let updatedUser;

    if (role === "admin") {
      updatedUser = await Admin.findByIdAndUpdate(
        id,
        { $set: update },
        { runValidators: true, new: true }
      ).select("-password");
    } else if (role === "guru") {
      delete req.body.waliKelas;
      updatedUser = await Guru.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true, runValidators: true }
      )
        .select("-password")
        .populate("waliKelas");
    } else if (role === "siswa") {
      updatedUser = await Siswa.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true, runValidators: true }
      ).select("-password");
    }

    res.status(200).json({
      success: true,
      message: "Berhasil memperbarui profil",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("Scholarcy", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "Logout berhasil",
    });
  } catch (error) {
    next(error);
  }
};

export const getDataUmum = async (req, res, next) => {
  try {
    const tahunMasuk = await Siswa.distinct("tahunMasuk");
    const kelas = await Kelas.find();

    res.status(200).json({
      success: true,
      message: "Data umum",
      data: { tahunMasuk, kelas },
    });
  } catch (error) {
    next(error);
  }
};
