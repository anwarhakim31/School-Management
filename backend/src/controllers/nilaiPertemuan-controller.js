import mongoose from "mongoose";
import ResponseError from "../error/response-error.js";
import Kelas from "../models/kelas-model.js";

import Siswa from "../models/siswa-model.js";
import Master from "../models/master-model.js";
import TahunAjaran from "../models/tahunAjaran-model.js";
import Absensi from "../models/Absensi-model.js";
import NilaiPertemuan from "../models/nilaiPertemuan-model.js";

export const addNilai = async (req, res, next) => {
  try {
    const data = req.body;
    const { pertemuan, mataPelajaran, siswa, kelas } = req.body;

    const isExist = await NilaiPertemuan.findOne({
      siswa,
      pertemuan,
      mataPelajaran,
      kelas,
    });

    if (isExist) {
      throw new ResponseError(
        400,
        `nilai pada pertemuan ${pertemuan} untuk siswa ini sudah ada.`
      );
    }

    const nilai = NilaiPertemuan({ ...data });

    await nilai.save();

    res.status(201).json({
      success: true,
      message: "Berhasil menambahkan nilai pertemuan.",
    });
  } catch (error) {
    next(error);
  }
};

export const getNilai = async (req, res, next) => {
  try {
    const pertemuan = req.params.pertemuan;
    const kelas = req.params.kelasId;
    const nilai = await NilaiPertemuan.find({
      kelas: new mongoose.Types.ObjectId(kelas),
      pertemuan,
    })
      .populate({ path: "kelas", select: "nama kelas" })
      .populate({ path: "siswa", select: "nama " })
      .populate({ path: "mataPelajaran" });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil nilai pertemuan.",
      nilai,
    });
  } catch (error) {
    next(error);
  }
};
