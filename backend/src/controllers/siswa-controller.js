import Siswa from "../models/siswa-model.js";

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
