import ResponseError from "../error/response-error.js";
import Jadwal from "../models/jadwal-model.js";
import Mapel from "../models/mapel-model.js";
import Guru from "../models/guru-model.js";

import NilaiPertemuan from "../models/nilaiPertemuan-model.js";
import Nilai from "../models/nilai-model.js";

export const addMapel = async (req, res, next) => {
  try {
    const { nama, kode } = req.body;

    const isExist = await Mapel.findOne({ kode });

    if (isExist) {
      throw new ResponseError(400, "Kode sudah diguanakan.");
    }

    const mapel = new Mapel({ kode, nama });

    await mapel.save();

    res.status(200).json({
      success: true,
      message: "Berhasil menambah mata pelajaran.",
    });
  } catch (error) {
    next(error);
  }
};

export const getMapel = async (req, res, next) => {
  try {
    const mapel = await Mapel.find();

    res.status(200).json({
      success: true,
      message: "Berhasil menambah mata pelajaran.",
      mapel,
    });
  } catch (error) {
    next(error);
  }
};

export const editMapel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { kode, nama } = req.body;

    const mapel = await Mapel.findById(id);

    if (!mapel) {
      throw new ResponseError(404, "Mata Pelajaran tidak ditemukan");
    }

    const isExist = await Mapel.findOne({ kode, _id: { $ne: id } });

    if (isExist) {
      throw new ResponseError(404, "Kode sudah digunakan.");
    }

    await Mapel.findByIdAndUpdate(id, { kode, nama });

    res.status(200).json({
      success: true,
      message: "Berhasil mengubah data mata pelajaran.",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMapel = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mapel = await Mapel.findById(id);

    if (!mapel) {
      throw new ResponseError(404, "Mata Pelajaran tidak ditemukan.");
    }

    await Mapel.findByIdAndDelete(id);

    const jadwalList = await Jadwal.find({ bidangStudi: id });

    for (const jadwall of jadwalList) {
      if (!jadwall._id) {
        throw new ResponseError(404, "Jadwal tidak ditemukan");
      }

      await Jadwal.findOneAndDelete({ _id: jadwall._id });
    }

    const guruList = await Guru.find({ bidangStudi: id });

    for (const gurus of guruList) {
      if (!gurus._id) {
        throw new ResponseError(404, "Guru tidak ditemukan");
      }

      await Guru.findByIdAndUpdate(
        { _id: gurus._id },
        { $unset: { bidangStudi: 1 } }
      );
    }

    await Nilai.deleteMany({ mataPelajaran: id });
    await NilaiPertemuan.deleteMany({ mataPelajaran: id });

    res.status(200).json({
      success: true,
      message: "Berhasil menghapus mata pelajaran.",
    });
  } catch (error) {
    next(error);
  }
};
