import Umum from "../models/umum-model.js";
import TahunAjaran from "../models/tahunAjaran-model.js";

export const getUmum = async (req, res, next) => {
  try {
    const data = await Umum.find().populate("tahunAjaran");

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil Tahun Ajaran.",
      data,
    });
  } catch (error) {
    next(error);
  }
};
