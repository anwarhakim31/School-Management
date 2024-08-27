import Nilai from "../models/Nilai-model.js";

export const addNilai = async (req, res, next) => {
  try {
    const data = req.body;

    const nilai = Nilai({ ...data });

    await nilai.save();

    res.status(201).json({
      success: true,
      message: "berhasil menambahkan nilai siswa",
    });
  } catch (error) {
    next(error);
  }
};
