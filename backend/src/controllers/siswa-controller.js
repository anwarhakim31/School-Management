import ResponseError from "../error/response-error.js";
import Siswa from "../models/siswa-model.js";
import fs from "fs";
import s3 from "../util/aws3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

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
