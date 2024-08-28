import ResponseError from "../error/response-error.js";
import Kelas from "../models/kelas-model.js";
import Nilai from "../models/Nilai-model.js";

export const addNilai = async (req, res, next) => {
  try {
    const data = req.body;
    const { kategori, mataPelajaran, siswa } = req.body;

    const isExist = await Nilai.findOne({
      siswa,
      kategori,
      mataPelajaran,
    });

    if (isExist) {
      throw new ResponseError(
        400,
        `Kategori nilai ${kategori.toLowerCase()} untuk siswa ini sudah ada.`
      );
    }

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
    const { search } = req.query;

    const kelas = await Kelas.findOne({ waliKelas: walikelasId });

    if (!kelas) {
      throw new ResponseError(
        404,
        "Kelas dengan Wali kelas ini tidak ditemukan."
      );
    }

    const searchRegex = new RegExp(search.trim(), "i");

    const nilai = await Nilai.aggregate([
      {
        $match: {
          siswa: { $in: kelas.siswa },
        },
      },
      {
        $lookup: {
          from: "siswas",
          localField: "siswa",
          foreignField: "_id",
          as: "siswa",
        },
      },
      {
        $unwind: "$siswa",
      },
      {
        $lookup: {
          from: "mapels",
          localField: "mataPelajaran",
          foreignField: "_id",
          as: "mataPelajaran",
        },
      },
      {
        $unwind: "$mataPelajaran",
      },
      {
        $match: {
          $or: [
            {
              "siswa.nama": { $regex: searchRegex },
            },
            {
              "mataPelajaran.kode": { $regex: searchRegex },
            },
            {
              "mataPelajaran.nama": { $regex: searchRegex },
            },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          _id: 1,
          siswa: {
            _id: "$siswa._id",
            nama: "$siswa.nama",
          },
          nilai: 1,
          mataPelajaran: {
            _id: "$mataPelajaran._id",
            nama: "$mataPelajaran.nama",
            kode: "$mataPelajaran.kode",
          },
          createdAt: 1,
          kategori: 1,
          tahunAjaran: 1,
          semester: 1,
        },
      },
    ]);

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

export const deleteManyNilai = async (req, res, next) => {
  try {
    const { dataChecked } = req.body;

    await Nilai.deleteMany({ _id: { $in: dataChecked } });

    res.status(200).json({
      success: true,
      message: "Berhasil menghapus nilai siswa",
    });
  } catch (error) {
    next(error);
  }
};

export const updateNilai = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await Nilai.findByIdAndUpdate(id, { ...data });

    res.status(200).json({
      success: true,
      message: "Berhasil mengubah nilai siswa",
    });
  } catch (error) {
    next(error);
  }
};
