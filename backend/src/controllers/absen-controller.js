import { formatTanggalIndonesia } from "../data/formatTanggalIndonesia.js";
import ResponseError from "../error/response-error.js";
import Absensi from "../models/Absensi-model.js";
import Kelas from "../models/kelas-model.js";

export const getAbsenKelas = async (req, res, next) => {
  try {
    const kelasId = req.params.kelasId;
    const guruId = req.query.guruId;

    const kelas = await Kelas.findById(kelasId).populate("siswa");

    if (!kelas) {
      throw new ResponseError(404, "Kelas Tidak ditemukan.");
    }

    const today = new Date();

    const existingAbsensi = await Absensi.findOne({
      tanggal: { $gte: new Date(today.toISOString().split("T")[0]) },
    });

    res
      .status(200)
      .json({ success: true, kelas, alreadyAbsensi: !!existingAbsensi });
  } catch (error) {
    next(error);
  }
};

export const postAbsenKelas = async (req, res, next) => {
  try {
    const kelasId = req.params.kelasId;
    const { guruId, absensiData } = req.body;

    const today = new Date();

    const existingAbsensi = await Absensi.findOne({
      guru: guruId,
      kelas: kelasId,
      tanggal: { $gte: new Date(today.toISOString().split("T")[0]) },
    });

    if (existingAbsensi) {
      throw new ResponseError(400, "Anda sudah melakukan absen hari ini");
    }

    for (let siswaList of absensiData) {
      const newAbsensi = Absensi({
        tanggal: today,
        siswa: siswaList._id,
        kelas: kelasId,
        status: siswaList.status,
        guru: guruId,
      });

      await newAbsensi.save();
    }

    const formattedDate = formatTanggalIndonesia(today);

    res.status(201).json({
      success: true,
      message: `Absensi berhasil disimpan pada ${formattedDate}`,
    });
  } catch (error) {
    next(error);
  }
};
