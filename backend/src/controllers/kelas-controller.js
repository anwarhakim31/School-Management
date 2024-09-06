import mongoose from "mongoose";
import ResponseError from "../error/response-error.js";
import Guru from "../models/guru-model.js";
import Jadwal from "../models/jadwal-model.js";
import Kelas from "../models/kelas-model.js";
import Siswa from "../models/siswa-model.js";
import NilaiPertemuan from "../models/nilaiPertemuan-model.js";

export const addKelas = async (req, res, next) => {
  try {
    const { kelas, nama, waliKelas } = req.body;

    const kelasExists = await Kelas.findOne({ kelas, nama });

    if (kelasExists) {
      throw new ResponseError(400, "Kombinasi kelas dan nama sudah digunakan.");
    }

    if (!waliKelas) {
      delete req.body.waliKelas;

      const newKelas = new Kelas(req.body);

      await newKelas.save();
    } else {
      const waliExist = await Guru.findById({ _id: waliKelas });

      if (waliExist.waliKelas) {
        throw new ResponseError(400, "Guru sudah sebagai Wali Kelas.");
      }

      const newKelas = new Kelas(req.body);

      await newKelas.save();

      await Guru.findByIdAndUpdate(waliKelas, { waliKelas: newKelas._id });
    }

    res
      .status(200)
      .json({ success: true, message: "Berhasil menambah kelas." });
  } catch (error) {
    next(error);
  }
};

export const getKelas = async (req, res, next) => {
  try {
    const kelas = await Kelas.find().populate("waliKelas");

    // const newData = kelas.map((kel) => ({
    //   ...kel._doc,
    // }));

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data kelas.",
      kelas,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteKelas = async (req, res, next) => {
  try {
    const { id } = req.params;

    const kelas = await Kelas.findById(id).populate("siswa");

    if (!kelas) {
      throw new ResponseError(404, "Kelas tidak di temukan");
    }

    if (kelas.waliKelas) {
      await Guru.findByIdAndUpdate(kelas.waliKelas, {
        $unset: { waliKelas: null },
      });
    }

    if (kelas.siswa.length > 0) {
      await Siswa.updateMany(
        { _id: { $in: kelas.siswa } },
        { $unset: { kelas: null } }
      );
    }

    await Kelas.findByIdAndDelete(id);
    await Jadwal.deleteMany({ kelas: id });
    await NilaiPertemuan.deleteMany({ kelas: id });

    res.status(200).json({
      success: true,
      message: "Kelas berhasil di hapus.",
    });
  } catch (error) {
    next(error);
  }
};

export const updateKelas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nama, kelas, waliKelas } = req.body;

    const kelasExists = await Kelas.findOne({ nama, kelas, _id: { $ne: id } });

    if (kelasExists) {
      throw new ResponseError(400, "Kombinasi kelas dan nama sudah digunakan.");
    }

    const isExist = await Kelas.findById(id);

    if (!waliKelas) {
      if (isExist.waliKelas) {
        await Guru.findByIdAndUpdate(
          isExist.waliKelas,
          {
            $unset: { waliKelas: null },
          },
          { new: true }
        );
      }

      delete req.body.waliKelas;

      await Kelas.findByIdAndUpdate(
        id,
        { $unset: { waliKelas: null }, $set: { ...req.body } },
        { runValidators: true, new: true }
      );
    } else {
      const alreadyWali = await Kelas.findOne({
        _id: { $ne: id },
        waliKelas: waliKelas,
      });

      if (alreadyWali) {
        throw new ResponseError(404, "Guru sudah sebagai Wali Kelas.");
      }

      if (isExist.waliKelas) {
        await Guru.findByIdAndUpdate(
          { _id: isExist.waliKelas },
          {
            $unset: { waliKelas: null },
          },
          { new: true }
        );
      }

      await Guru.findByIdAndUpdate(waliKelas, {
        waliKelas: id,
      });

      await Kelas.findByIdAndUpdate(
        id,
        { $set: { ...req.body } },
        { runValidators: true, new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengubah data kelas.",
    });
  } catch (error) {
    next(error);
  }
};

export const getWaliKelas = async (req, res, next) => {
  try {
    const id = req.params.id;

    const kelas = await Kelas.findOne({
      waliKelas: new mongoose.Types.ObjectId(id),
    }).populate({
      path: "siswa",
      options: { sort: { createdAt: -1 } },
    });

    if (!kelas) {
      throw new ResponseError(404, "Kelas dengan walikelas tersebut tidak ada");
    }

    res.status(200).json({
      success: true,
      message: `Berhasil mengambil  data`,
      kelas,
    });
  } catch (error) {
    next(error);
  }
};

export const getMapelKelas = async (req, res, next) => {
  try {
    const id = req.params.id;

    const jadwal = await Jadwal.find({ kelas: id })
      .populate("bidangStudi")
      .select("bidangStudi");

    if (!jadwal) {
      throw new ResponseError(
        404,
        "Mata Pelajaran pada kelas ini tidak ditemukan."
      );
    }

    const bidangStudi = jadwal.map((j) => j.bidangStudi);

    res.status(200).json({
      success: true,
      message: `Berhasil mengambil mata pelajaran pada kelas.`,
      mapel: bidangStudi,
    });
  } catch (error) {
    next(error);
  }
};

export const getKelasMengajar = async (req, res, next) => {
  try {
    const id = req.userId;

    const jadwalList = await Jadwal.find({
      guru: new mongoose.Types.ObjectId(id),
    }).populate("kelas");

    const uniquesKelas = jadwalList.reduce((acc, jadwal) => {
      const kelas = jadwal.kelas;

      if (!acc.some((item) => item.nama.toString() === kelas.nama)) {
        acc.push(kelas);
      }

      return acc;
    }, []);

    res.status(200).json({
      success: true,
      message: `Berhasil mengambil data`,
      kelas: uniquesKelas,
    });
  } catch (error) {
    next(error);
  }
};
