import ResponseError from "../error/response-error.js";
import Siswa from "../models/siswa-model.js";
import Kelas from "../models/kelas-model.js";
import fs from "fs";
import s3 from "../util/aws3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { genSalt, hash } from "bcrypt";

export const getAll = async (req, res, next) => {
  try {
    const siswa = await Siswa.find();

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data siswa",
      data: siswa,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadPhotoSiswa = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ResponseError(400, "Foto di butuhkan");
    }

    const fileStream = fs.createReadStream(req.file.path);

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `Siswa/${Date.now().toString()}-${req.file.originalname}`,
      Body: fileStream,
      ACL: "public-read",
    };

    const data = await s3.send(new PutObjectCommand(uploadParams));

    const fileName = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

    await res.status(200).json({
      success: true,
      message: "Berhasil unggah gambar",
      foto: fileName,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addSiswa = async (req, res, next) => {
  try {
    const { kelas, nama, nis, password } = res.body;

    const siswaExist = await Siswa.findOne({ nis });

    if (siswaExist) {
      throw new ResponseError(404, "NIS sudah digunakan");
    }

    const kelasSiswa = await Kelas.findOne({ kelas, nama });

    if (!kelasSiswa) {
      throw new ResponseError(404, "Kelas tidak ditemukan.");
    }

    const salt = await genSalt();

    req.body.password = await hash(password, salt);

    const newSiswa = new Siswa(req.body);

    await newSiswa.save();

    res
      .status(200)
      .json({ success: true, message: "Berhasil menambahkan siswa" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
