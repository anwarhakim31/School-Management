import mongoose from "mongoose";
import { formatTanggalIndonesia } from "../data/formatTanggalIndonesia.js";
import ResponseError from "../error/response-error.js";
import Absensi from "../models/Absensi-model.js";
import Kelas from "../models/kelas-model.js";
import Libur from "../models/libur-model.js";

export const getAbsenKelas = async (req, res, next) => {
  try {
    const kelasId = req.params.kelasId;
    const guruId = req.query.guruId;

    const kelas = await Kelas.findById(kelasId).populate("siswa");

    if (!kelas) {
      throw new ResponseError(404, "Kelas Tidak ditemukan.");
    }

    const today = new Date();

    const formatHari = today.toLocaleString("id-ID", { weekday: "long" });

    const libur = await Libur.findOne({
      $or: [
        {
          perpekan: {
            $elemMatch: {
              hari: formatHari,
              status: true,
            },
          },
        },
        {
          nasional: {
            $elemMatch: {
              tanggal: new Date().toISOString().split("T")[0],
            },
          },
        },
      ],
    });

    const existingAbsensi = await Absensi.findOne({
      kelas: kelasId,
      guru: guruId,
      tanggal: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lte: new Date(today.setHours(23, 59, 59, 999)),
      },
    });

    res.status(200).json({
      success: true,
      kelas,
      alreadyAbsensi: !!existingAbsensi,
      hariLibur: !!libur,
    });
  } catch (error) {
    next(error);
  }
};

export const postAbsenKelas = async (req, res, next) => {
  try {
    const kelasId = req.params.kelasId;
    const { guruId, absensiData } = req.body;

    const today = new Date();

    const formatHari = today.toLocaleString("default", { weekday: "long" });

    const libur = await Libur.findOne({
      $or: [
        {
          perpekan: {
            $elemMatch: {
              hari: formatHari,
              status: true,
            },
          },
        },
        {
          nasional: {
            $elemMatch: {
              tanggal: new Date().toISOString().split("T")[0],
            },
          },
        },
      ],
    });

    if (libur) {
      throw new ResponseError(400, "Saat ini libur sekolah");
    }

    const existingAbsensi = await Absensi.findOne({
      guru: guruId,
      kelas: kelasId,
      tanggal: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lte: new Date(today.setHours(23, 59, 59, 999)),
      },
    });

    if (existingAbsensi) {
      throw new ResponseError(400, "Anda sudah melakukan absen hari ini");
    }

    for (let siswaList of absensiData) {
      const newAbsensi = Absensi({
        tanggal: today,
        siswa: siswaList._id,
        kelas: kelasId,
        status: siswaList.status,
        guru: guruId,
      });

      await newAbsensi.save();
    }

    const formattedDate = formatTanggalIndonesia(today);

    res.status(201).json({
      success: true,
      message: `Absensi berhasil disimpan pada ${formattedDate}`,
    });
  } catch (error) {
    next(error);
  }
};

export const editAbsenKelas = async (req, res, next) => {
  try {
    const kelasId = req.params.kelasId;
    const { guruId, absensiData } = req.body;

    const today = new Date();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    for (const absenList of absensiData) {
      await Absensi.findOneAndUpdate(
        {
          siswa: new mongoose.Types.ObjectId(absenList._id),
          kelas: new mongoose.Types.ObjectId(kelasId),
          tanggal: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
        {
          siswa: new mongoose.Types.ObjectId(absenList._id),
          kelas: new mongoose.Types.ObjectId(kelasId),
          tanggal: today,
          status: absenList.status,
          guru: new mongoose.Types.ObjectId(guruId),
        },
        {
          upsert: true,
        }
      );
    }

    const formattedDate = formatTanggalIndonesia(today);

    res.status(201).json({
      success: true,
      message: `Berhasil mengubah absensi pada ${formattedDate}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getDataAlreadyAbsen = async (req, res, next) => {
  try {
    const id = req.params.kelasId;

    const siswaList = await Kelas.findById(id).select("siswa");

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const absenHariIni = await Absensi.find({
      siswa: { $in: siswaList.siswa },
      kelas: new mongoose.Types.ObjectId(id),
      tanggal: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).populate({ path: "siswa", select: "nama _id" });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data absensi hari ini.",
      absenHariIni,
    });
  } catch (error) {
    next(error);
  }
};

export const getRekapAbsensi = async (req, res, next) => {
  try {
    const kelasId = req.params.kelasId;
    const { year, month } = req.query;

    // Pastikan 'month' dikurangi 1 karena JavaScript Date object menggunakan indeks bulan mulai dari 0
    const jumlahHari = new Date(year, parseInt(month), 0).getDate();

    const kelas = await Kelas.findById(kelasId).populate({ path: "siswa" });

    if (!kelas) {
      return res.status(404).json({ message: "Kelas tidak ditemukan." });
    }

    const siswaList = kelas.siswa.sort((a, b) => {
      const nameA = a.nama.toLowerCase();
      const nameB = b.nama.toLowerCase();
      return nameA.localeCompare(nameB);
    });
    const rekapAbsensi = [];

    for (let siswa of siswaList) {
      const monthPadded = (parseInt(month) + 1).toString().padStart(2, "0"); // Bulan dimulai dari 1 untuk manusia
      const startDate = new Date(`${year}-${monthPadded}-01`); // Tanggal awal bulan
      const endDate = new Date(`${year}-${monthPadded}-${jumlahHari}`); // Tanggal akhir bulan

      // Ambil data absensi siswa dalam rentang tanggal tersebut
      const absenSiswa = await Absensi.find({
        siswa: siswa._id,
        kelas: kelas._id,
        tanggal: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      const statusPerHari = Array(jumlahHari).fill(" ");

      let hadirCount = 0;
      let sakitCount = 0;
      let izinCount = 0;
      let alphaCount = 0;

      absenSiswa.forEach((absen) => {
        const tanggalAbsensi = new Date(absen.tanggal).getDate();
        statusPerHari[tanggalAbsensi - 1] = absen.status;

        // Hitung berdasarkan status absensi
        switch (absen.status) {
          case "hadir":
            hadirCount++;

            break;
          case "sakit":
            sakitCount++;

            break;
          case "izin":
            izinCount++;

            break;
          case "alpha":
            alphaCount++;

            break;
        }
      });

      // Tambahkan data rekap untuk setiap siswa
      rekapAbsensi.push({
        nama: siswa.nama,
        statusPerHari,
        totalHadir: hadirCount,
        totalSakit: sakitCount,
        totalIzin: izinCount,
        totalAlpha: alphaCount,
      });
    }

    const { kelas: grade, nama } = kelas._doc;

    res.status(200).json({
      success: true,
      jumlahHari,
      rekapAbsensi,
      kelas: {
        grade,
        nama,
      },
    });
  } catch (error) {
    next(error);
  }
};
