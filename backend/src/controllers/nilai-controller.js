import ResponseError from "../error/response-error.js";
import Kelas from "../models/kelas-model.js";
import Nilai from "../models/Nilai-model.js";

export const addNilai = async (req, res, next) => {
  try {
    const data = req.body;

    const nilai = Nilai({ ...data });

    await nilai.save();

    res.status(201).json({
      success: true,
      message: "Berhasil menambahkan nilai siswa",
    });
  } catch (error) {
    next(error);
  }
};

export const getNilaiKelas = async (req, res, next) => {
  try {
    const { walikelasId } = req.params;

    const kelas = await Kelas.findOne({ waliKelas: walikelasId });

    if (!kelas) {
      throw new ResponseError(
        404,
        "Kelas dengan Wali kelas ini tidak ditemukan."
      );
    }

    const siswaId = kelas.siswa.map((siswa) => siswa);

    const nilai = await Nilai.find({ siswa: { $in: siswaId } })
      .populate({
        path: "siswa",
        select: "nama",
      })
      .populate("mataPelajaran");

    console.log(nilai);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil semua nilai siswa",
      nilai,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOneNilai = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Nilai.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Berhasil menghapus nilai siswa",
    });
  } catch (error) {
    next(error);
  }
};
