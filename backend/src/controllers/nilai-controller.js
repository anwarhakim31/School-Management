import mongoose from "mongoose";
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
    const sort = req.query.selectedSort;
    const filter = req.query.selectedFilter;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;

    const skip = (page - 1) * limit;

    const kelas = await Kelas.findOne({ waliKelas: walikelasId });

    if (!kelas) {
      throw new ResponseError(
        404,
        "Kelas dengan Wali kelas ini tidak ditemukan."
      );
    }

    const searchRegex = new RegExp(search.trim(), "i");

    const countPipeline = [
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
    ];

    if (filter === "ujian" || filter === "tugas") {
      countPipeline.push({
        $match: {
          kategori: filter,
        },
      });
    }

    countPipeline.push({
      $count: "total",
    });

    const totalResults = await Nilai.aggregate(countPipeline);

    const total = totalResults.length > 0 ? totalResults[0].total : 0;

    const pipeline = [
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
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
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
    ];

    if (sort === "terbaru" || sort === "terlama") {
      pipeline.push({
        $sort: {
          createdAt: sort === "terbaru" ? -1 : 1,
        },
      });
    } else if (sort === "a-z" || sort === "z-a") {
      pipeline.push({
        $sort: {
          "siswa.nama": sort === "a-z" ? -1 : 1,
          createdAt: -1,
        },
      });
    } else if (sort === "0-100" || sort === "100-0") {
      pipeline.push({
        $sort: {
          nilai: sort === "100-0" ? -1 : 1,
        },
      });
    }

    if (filter === "ujian" || filter === "tugas") {
      pipeline.push({
        $match: {
          kategori: filter,
        },
      });
    }

    const nilai = await Nilai.aggregate(pipeline);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil semua nilai siswa",
      nilai,
      pagination: {
        limit,
        page,
        total,
        totalPage: Math.ceil(total / limit),
      },
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
    const { siswa, kategori, mataPelajaran } = req.body;

    const isExist = await Nilai.findOne({
      _id: { $ne: id },
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

    await Nilai.findByIdAndUpdate(id, { ...data });

    res.status(200).json({
      success: true,
      message: "Berhasil mengubah nilai siswa",
    });
  } catch (error) {
    next(error);
  }
};

export const getRekapKelas = async (req, res, next) => {
  try {
    const id = req.userId;
    const { semester, tahunAjaran } = req.query;

    const kelas = await Kelas.findOne({
      waliKelas: id,
    });

    if (!kelas) {
      throw new ResponseError(404, "Kelas tidak memiliki siswa.");
    }

    const nilai = await Nilai.find({
      siswa: { $in: kelas.siswa },
      semester,
      tahunAjaran,
    })
      .populate({
        path: "mataPelajaran",
        select: "kode nama",
      })
      .populate({
        path: "siswa",
        select: "nama",
      });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil semua nilai siswa",
      nilai,
    });
  } catch (error) {
    next(error);
  }
};

export const getRaport = async (req, res, next) => {
  try {
    const id = req.params.siswaId;

    const nilai = await Nilai.find({
      siswa: new mongoose.Types.ObjectId(id),
      semester,
      ajaran,
    });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil semua nilai siswa",
      nilai,
    });
  } catch (error) {
    next(error);
  }
};
