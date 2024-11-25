import mongoose from "mongoose";
import ResponseError from "../error/response-error.js";
import Guru from "../models/guru-model.js";
import Jadwal from "../models/jadwal-model.js";
import Kelas from "../models/kelas-model.js";
import { hash, genSalt } from "bcrypt";

export const addGuru = async (req, res, next) => {
  try {
    const { nip, kelas, namaKelas, password } = req.body;

    const isExist = await Guru.findOne({ nip });

    if (isExist) {
      throw new ResponseError(400, "Nip Sudah digunakan.");
    }

    const salt = await genSalt();
    req.body.password = await hash(password, salt);

    if ((kelas, namaKelas)) {
      const kelass = await Kelas.findOne({ kelas, nama: namaKelas });

      if (!kelas) {
        throw new ResponseError(404, "Kelas tidak di temukan");
      }

      if (kelass.waliKelas) {
        throw new ResponseError(400, "Kelas sudah memiliki wali kelas");
      }
      delete req.body.kelas;
      delete req.body.namaKelas;

      const newGuru = new Guru({
        ...req.body,
        waliKelas: kelass._id,
      });

      await newGuru.save();

      kelass.waliKelas = newGuru._id;

      kelass.save();
    } else {
      delete req.body.kelas;
      delete req.body.namaKelas;

      const newGuru = new Guru({
        ...req.body,
      });

      await newGuru.save();
    }

    res.status(200).json({
      success: true,
      message: "Berhasil menambah guru.",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllGuru = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const searchRegex = new RegExp(search.trim(), "i");
    const { jenisKelamin, kelasNama, bidangStudi } = req.query;

    const filterQuery = {
      $or: [
        { nama: { $regex: searchRegex } },
        { nis: { $regex: searchRegex } },
      ],
    };

    if (kelasNama) {
      filterQuery.waliKelas = kelasNama;
    }

    if (jenisKelamin) {
      filterQuery.jenisKelamin = jenisKelamin;
    }

    if (bidangStudi) {
      filterQuery.bidangStudi = bidangStudi;
    }

    const guru = await Guru.find(filterQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: "waliKelas", select: "nama kelas" })
      .populate({ path: "bidangStudi", select: "nama kode" })
      .exec();

    const totalGuru = await Guru.countDocuments(filterQuery);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data guru.",
      data: guru,
      pagination: {
        page,
        limit,
        totalGuru,
        totalPage: Math.ceil(totalGuru / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getGuru = async (req, res, next) => {
  try {
    const guru = await Guru.find().select("nama _id");

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data guru.",
      guru,
    });
  } catch (error) {
    next(error);
  }
};

export const getDetail = async (req, res, next) => {
  try {
    const jumlahGuru = await Guru.countDocuments();
    const lk = await Guru.countDocuments({
      jenisKelamin: "Laki-Laki",
    });
    const pr = await Guru.countDocuments({
      jenisKelamin: "Perempuan",
    });
    const active = await Guru.countDocuments({ status: true });
    const nonActive = await Guru.countDocuments({ status: false });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil detail guru.",
      data: { jumlahGuru, pr, lk, active, nonActive },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOneGuru = async (req, res, next) => {
  try {
    const id = req.params.id;

    const guru = await Guru.findById({ _id: id });

    if (!guru) {
      throw new ResponseError(404, "Data guru tidak ditemukan");
    }

    if (guru.waliKelas) {
      await Kelas.findByIdAndUpdate(guru.waliKelas, {
        $unset: { waliKelas: null },
      });
    }

    await Guru.findByIdAndDelete({ _id: id });

    await Jadwal.deleteMany({ guru: guru._id });

    res.status(200).json({
      success: true,
      message: "Berhasil menghapus guru.",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteManyGuru = async (req, res, next) => {
  try {
    const { dataChecked } = req.body;

    const GuruList = await Guru.find({ _id: { $in: dataChecked } });

    await Guru.deleteMany({ _id: { $in: dataChecked } });

    for (const guru of GuruList) {
      if (guru.waliKelas) {
        await Kelas.findByIdAndUpdate(
          { _id: guru.waliKelas },
          { $unset: { waliKelas: null } }
        );
      }
      await Jadwal.deleteMany({ guru: guru._id });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil menghapus guru terpilih.",
    });
  } catch (error) {
    next(error);
  }
};

export const updateGuru = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { kelas, namaKelas, bidangStudi } = req.body;
    delete req.body.waliKelas;

    const guru = await Guru.findById(id);

    if (!guru) {
      throw new ResponseError(404, "Guru tidak ditemukan.");
    }

    if (req.body.password) {
      const salt = await genSalt();
      req.body.password = await hash(req.body.password, salt);
    }

    if (!kelas && !namaKelas) {
      delete req.body.namaKelas;
      delete req.body.kelas;
      if (guru.waliKelas) {
        await Kelas.findByIdAndUpdate(
          { _id: guru.waliKelas },
          { $unset: { waliKelas: null } }
        );
        await Guru.findByIdAndUpdate(
          { _id: id },
          { $unset: { waliKelas: null } }
        );
      }

      await Guru.findByIdAndUpdate(id, { ...req.body }, { new: true });
    } else {
      const newKelas = await Kelas.findOne({ kelas, nama: namaKelas });

      if (!newKelas) {
        throw new ResponseError(404, "kelas tidak ditemukan.");
      }

      if (newKelas.waliKelas && newKelas.waliKelas.toString() !== id) {
        throw new ResponseError(404, "Kelas sudah memiliki wali kelas");
      }

      if (guru.waliKelas) {
        await Kelas.findByIdAndUpdate(
          { _id: guru.waliKelas },
          { $unset: { waliKelas: null } }
        );
      }

      delete req.body.namaKelas;
      delete req.body.kelas;

      await Kelas.findByIdAndUpdate(
        { _id: newKelas._id },
        { waliKelas: guru._id }
      );

      await Guru.findByIdAndUpdate(
        { _id: id },
        { ...req.body, waliKelas: newKelas._id },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengubah data guru.",
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboard = async (req, res, next) => {
  try {
    const id = req.userId;

    const guru = await Guru.findById(id);

    if (guru.bidangStudi) {
      guru.populate({ path: "bidangStudi", select: "nama" });
    }

    if (guru.waliKelas) {
      guru.populate({ path: "waliKelas", select: "siswa kelas nama" });
    }

    const jadwalList = await Jadwal.find({ guru: id });

    let jumlahPertemuan = 0;

    for (const jadwal of jadwalList) {
      jumlahPertemuan += jadwal.jumlahPertemuan;
    }

    let totalMurid;
    if (guru.waliKelas) {
      const waliKelas = await Kelas.findOne({ waliKelas: id }).select("siswa");

      totalMurid = waliKelas.siswa.length;
    } else {
      totalMurid = 0;
    }

    let detail;
    if (guru.bidangStudi) {
      detail = {
        bidangStudi: guru?.bidangStudi?.nama,
        totalMurid,
        jumlahPertemuan,
      };
    } else {
      detail = {
        totalMurid,
        jumlahPertemuan,
      };
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil detail guru.",
      detail,
    });
  } catch (error) {
    next(error);
  }
};

export const getBidangStudi = async (req, res, next) => {
  try {
    const id = req.userId;

    const guru = await Guru.findById(id)
      .populate("bidangStudi")
      .select("bidangStudi -_id");

    const mapel = Array(guru.bidangStudi);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil detail guru.",
      mapel,
    });
  } catch (error) {
    next(error);
  }
};
