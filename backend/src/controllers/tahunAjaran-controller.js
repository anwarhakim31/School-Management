import ResponseError from "../error/response-error.js";
import TahunAjaran from "../models/tahunAjaran-model.js";

export const addAjaran = async (req, res, next) => {
  try {
    const { ajaran } = req.body;

    const isExist = await TahunAjaran.findOne({ ajaran });

    if (isExist) {
      throw new ResponseError(400, "Tahun Ajaran yang sama sudah ada");
    }

    if (!ajaran.includes("/")) {
      throw new ResponseError(400, "Format Tahun ajaran tidak sesuai");
    }

    await TahunAjaran.updateMany({ status: false });

    const newAjaran = new TahunAjaran({ ajaran });

    await newAjaran.save();

    res.status(200).json({
      success: true,
      message: "Berhasil menambah Tahun Ajaran.",
    });
  } catch (error) {
    next(error);
  }
};

export const getAjaran = async (req, res, next) => {
  try {
    const ajaran = await TahunAjaran.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil Tahun Ajaran.",
      ajaran,
    });
  } catch (error) {
    next(error);
  }
};

export const getAjaranAktif = async (req, res, next) => {
  try {
    const ajaran = await TahunAjaran.findOne({ status: true });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil Tahun Ajaran.",
      ajaran,
    });
  } catch (error) {
    next(error);
  }
};

export const editAjaran = async (req, res, next) => {
  try {
    const id = req.params.id;

    const ajaran = await TahunAjaran.findById(id);

    if (!ajaran) {
      throw new ResponseError(404, "Tahun Ajaran tidak ditemukan.");
    }

    await TahunAjaran.updateMany({ status: false });

    await TahunAjaran.findByIdAndUpdate(id, { status: true });

    res.status(200).json({
      success: true,
      message: "Berhasil Mengaktifkan Tahun Ajaran " + ajaran.ajaran,
      ajaran,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAjaran = async (req, res, next) => {
  try {
    const id = req.params.id;

    const ajaran = await TahunAjaran.findByIdAndDelete(id);

    if (!ajaran) {
      throw new ResponseError(404, "Tahun Ajaran tidak ditemukan");
    }
    console.log(ajaran);
    res.status(200).json({
      success: true,
      message: "Berhasil Menghapus Tahun Ajaran " + ajaran.ajaran,
    });
  } catch (error) {
    next(error);
  }
};
