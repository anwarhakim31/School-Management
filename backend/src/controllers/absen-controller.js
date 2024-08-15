import ResponseError from "../error/response-error.js";
import Kelas from "../models/kelas-model.js";

export const getAbsenKelas = async (req, res, next) => {
  try {
    const kelasId = req.params.kelasId;
    const guruId = req.params.guruId;

    const kelas = await Kelas.findById(kelasId).populate("siswa");

    if (!kelas) {
      throw new ResponseError(404, "Kelas Tidak ditemukan.");
    }

    res.status(200).json({ success: true, kelas });
  } catch (error) {
    next(error);
  }
};
