import ResponseError from "../error/response-error.js";
import Mapel from "../models/mapel-model.js";

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

    res.status(200).json({
      success: true,
      message: "Berhasil menghapus mata pelajaran.",
    });
  } catch (error) {
    next(error);
  }
};
