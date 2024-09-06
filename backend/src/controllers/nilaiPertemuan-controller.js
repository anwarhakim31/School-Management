import mongoose from "mongoose";
import ResponseError from "../error/response-error.js";
import Kelas from "../models/kelas-model.js";

import Siswa from "../models/siswa-model.js";
import Master from "../models/master-model.js";
import TahunAjaran from "../models/tahunAjaran-model.js";
import Absensi from "../models/Absensi-model.js";
import NilaiPertemuan from "../models/nilaiPertemuan-model.js";
import Jadwal from "../models/jadwal-model.js";

export const addNilai = async (req, res, next) => {
  try {
    const data = req.body;
    const { pertemuan, mataPelajaran, siswa, kelas } = req.body;

    const master = await Master.findOne();

    const semester = master.semester.find((part) => part.status === true);
    const tahunjaran = await TahunAjaran.findOne({ status: true });

    const isExist = await NilaiPertemuan.findOne({
      semester: semester.keterangan,
      tahunAjaran: tahunjaran.ajaran,
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

    const kelass = await Kelas.findById(kelas);

    if (!kelass) {
      throw new ResponseError(404, "Kelas tidak ditemukan.");
    }

    const nilai = await NilaiPertemuan.find({
      siswa: { $in: kelass.siswa },
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

export const deleteNilai = async (req, res, next) => {
  try {
    const { id } = req.params;

    const nilai = await NilaiPertemuan.findByIdAndDelete(id, { new: true });

    res.status(200).json({
      success: true,
      message: `Berhasil menghapus nilai pertemuan ${nilai.pertemuan}`,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteManyNilai = async (req, res, next) => {
  try {
    const { dataChecked } = req.body;

    await NilaiPertemuan.deleteMany({ _id: { $in: dataChecked } });

    res.status(200).json({
      success: true,
      message: `Berhasil menghapus nilai pertemuan terpilih.`,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNilai = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const update = await NilaiPertemuan.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );

    if (!update) {
      throw new ResponseError(400, "Gagal mengedit nilai pertemuan");
    }

    res.status(200).json({
      success: true,
      message: `Berhasil mengubah nilai pertemuan.`,
    });
  } catch (error) {
    next(error);
  }
};

export const getRekap = async (req, res, next) => {
  try {
    const guruId = req.userId;
    const kelasId = req.params.kelasId;
    const semester = req.params.semester;

    const jadwal = await Jadwal.find({
      guru: guruId,
      kelas: new mongoose.Types.ObjectId(kelasId),
    });

    const totalPertemuan = jadwal.reduce((acc, schedule) => {
      return acc + schedule.jumlahPertemuan;
    }, 0);

    const kelas = await Kelas.findById(kelasId).populate({ path: "siswa" });

    if (!kelas) {
      return res.status(404).json({ message: "Kelas tidak ditemukan." });
    }

    const siswaList = kelas.siswa.sort((a, b) => {
      const nameA = a.nama.toLowerCase();
      const nameB = b.nama.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    const rekapNilai = [];

    for (const siswa of siswaList) {
      const dataNilai = Array(totalPertemuan + 1).fill(" ");

      const nilai = await NilaiPertemuan.find({
        kelas: new mongoose.Types.ObjectId(kelasId),
        siswa: siswa._id,
        semester,
      });

      nilai.forEach((item) => {
        if (item.pertemuan === "ujian") {
          dataNilai[totalPertemuan] = item.nilai;
        } else {
          dataNilai[item.pertemuan] = item.nilai;
        }
      });

      rekapNilai.push({
        id: siswa._id,
        nama: siswa.nama,
        dataNilai,
        totalPertemuan,
      });
    }

    res.status(200).json({
      success: true,
      message: `Berhasil mengambil rekap nilai pertemuan.`,
      rekapNilai,
      totalPertemuan,
    });
  } catch (error) {
    next(error);
  }
};
