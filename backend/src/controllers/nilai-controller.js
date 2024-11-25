import mongoose from "mongoose";
import ResponseError from "../error/response-error.js";
import Kelas from "../models/kelas-model.js";

import Siswa from "../models/siswa-model.js";
import Master from "../models/master-model.js";
import TahunAjaran from "../models/tahunAjaran-model.js";
import Absensi from "../models/Absensi-model.js";

import Jadwal from "../models/jadwal-model.js";
import Nilai from "../models/nilai-model.js";

export const addNilai = async (req, res, next) => {
  try {
    const data = req.body;
    const { kategori, mataPelajaran, siswa } = req.body;

    const master = await Master.findOne();

    const semester = master.semester.find((part) => part.status === true);
    const tahunjaran = await TahunAjaran.findOne({ status: true });

    const isExist = await Nilai.findOne({
      semester: semester.keterangan,
      tahunAjaran: tahunjaran.ajaran,
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

    const master = await Master.findOne();

    const semester = master.semester.find((part) => part.status === true);
    const tahunjaran = await TahunAjaran.findOne({ status: true });

    const isExist = await Nilai.findOne({
      _id: { $ne: id },
      semester: semester.keterangan,
      tahunAjaran: tahunjaran.ajaran,
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
    const { semester, tahunAjaran, kelas, nama, id } = req.query;

    let kelass;

    if (kelas && nama) {
      kelass = await Kelas.findOne({
        kelas,
        nama,
      });
    } else {
      kelass = await Kelas.findById({ _id: id });
    }

    if (!kelass) {
      throw new ResponseError(404, "Kelas tidak memiliki siswa.");
    }

    const mapel = await Jadwal.find({ kelas: kelass._id });

    const mapelKelas = mapel.map((item) => item.bidangStudi);

    const nilai = await Nilai.find({
      siswa: { $in: kelass.siswa },
      semester,
      mataPelajaran: { $in: mapelKelas },
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
      kelas: {
        kelas: kelass.kelas,
        nama: kelass.nama,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRaport = async (req, res, next) => {
  try {
    const id = req.params.siswaId;

    const siswa = await Siswa.findById(id)
      .populate({
        path: "kelas",
        populate: { path: "waliKelas", select: "nama" },
        select: "nama kelas waliKelas",
      })
      .select("nama nis kelas");

    const master = await Master.findOne();

    const semesterActive = master.semester.find(
      (semester) => semester.status === true
    );

    const ajaran = await TahunAjaran.find({ status: true });

    const nilai = await Nilai.find({
      siswa: new mongoose.Types.ObjectId(id),
      semester: semesterActive.keterangan,
      tahunAjaran: ajaran[0].ajaran,
    })
      .populate("mataPelajaran")
      .select("nilai kategori mataPelajaran");

    const absen = await Absensi.find({
      siswa: new mongoose.Types.ObjectId(id),
    });

    const totalMapel = Array.from(
      new Set(nilai.map((score) => score.mataPelajaran.nama))
    ).length;

    const siswaWithNiali = {
      _id: siswa._id,
      nama: siswa.nama,
      nis: siswa.nis,
      kelas: `${siswa.kelas.kelas} ${siswa.kelas.nama}`,
      ajaran: ajaran[0].ajaran,
      semester: semesterActive.keterangan,
      nilai: nilai.some((item) => item.mataPelajaran)
        ? nilai.map((item) => ({
            nilai: item.nilai,
            mapel: item.mataPelajaran.nama,
            kategori: item.kategori,
          }))
        : [],
    };

    if (siswa.kelas.waliKelas) {
      siswaWithNiali.waliKelas = siswa.kelas.waliKelas.nama;
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil semua nilai siswa",
      rapor: siswaWithNiali,
      absen,
      publish: totalMapel <= 5,
    });
  } catch (error) {
    next(error);
  }
};

export const getNilaiAverage = async (req, res, next) => {
  try {
    const id = req.userId;

    const nilai = await Nilai.find({ siswa: new mongoose.Types.ObjectId(id) });

    const keys = Array.from(
      new Set(
        nilai.map((jadwal) =>
          JSON.stringify({
            ajaran: jadwal.tahunAjaran,
            semester: jadwal.semester,
          })
        )
      )
    ).map((str) => JSON.parse(str));

    const averages = keys.map((key) => {
      const filteredNilai = nilai.filter(
        (jadwal) =>
          jadwal.tahunAjaran === key.ajaran && jadwal.semester === key.semester
      );

      const uniqueSubjects = Array.from(
        new Set(filteredNilai.map((mapel) => mapel.mataPelajaran.toString()))
      );

      const tugasNilai = filteredNilai
        .filter((item) => item.kategori === "tugas")
        .reduce((acc, item) => acc + item.nilai, 0);

      const ujianNilai = filteredNilai
        .filter((item) => item.kategori === "ujian")
        .reduce((acc, item) => acc + item.nilai, 0);

      const totalMapel = uniqueSubjects.length;

      const rataRataTugas = tugasNilai / totalMapel;
      const rataRataUjian = ujianNilai / totalMapel;

      return {
        totalMapel,
        ajaran: key.ajaran,
        semester: key.semester,
        rataRataTugas,
        rataRataUjian,
        rataRata: (rataRataTugas + rataRataUjian) / 2,
      };
    });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil semua nilai siswa",
      averages,
    });
  } catch (error) {
    next(error);
  }
};
