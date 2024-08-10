import Umum from "../models/umum-model.js";
import TahunAjaran from "../models/tahunAjaran-model.js";
import Siswa from "../models/siswa-model.js";
import Kelas from "../models/kelas-model.js";
import Guru from "../models/guru-model.js";
import Mapel from "../models/mapel-model.js";

export const getUmum = async (req, res, next) => {
  try {
    const totalSiswa = await Siswa.countDocuments();

    const totalGuru = await Guru.countDocuments();
    const totalKelas = await Kelas.countDocuments();
    const totalMapel = await Mapel.countDocuments();

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data Umum.",
      data: {
        totalSiswa,
        totalGuru,
        totalKelas,
        totalMapel,
      },
    });
  } catch (error) {
    next(error);
  }
};
