import Siswa from "../models/siswa-model.js";
import Kelas from "../models/kelas-model.js";
import Guru from "../models/guru-model.js";
import Mapel from "../models/mapel-model.js";
import Total from "../models/total-model.js";
import { color, getColor } from "../data/color.js";
import Master from "../models/master-model.js";
import ResponseError from "../error/response-error.js";
import Jadwal from "../models/jadwal-model.js";

export const getMaster = async (req, res, next) => {
  try {
    const totalSiswa = await Siswa.countDocuments();

    const totalGuru = await Guru.countDocuments();
    const totalKelas = await Kelas.countDocuments();
    const totalMapel = await Mapel.countDocuments();
    const siswaPerAjaran = await Total.aggregate([
      {
        $addFields: {
          startYear: {
            $toInt: { $arrayElemAt: [{ $split: ["$ajaran", "/"] }, 0] },
          },
        },
      },
      {
        $sort: { startYear: 1 },
      },
      {
        $project: {
          ajaran: 1,
          totalSiswa: 1,
        },
      },
    ]);
    const kelasPerTotal = await Kelas.aggregate([
      {
        $group: {
          _id: "$kelas",
          totalKelas: { $sum: 1 },
        },
      },
      {
        $addFields: {
          colorIndex: { $mod: [{ $toInt: "$_id" }, color.length] },
        },
      },
      {
        $addFields: {
          fill: { $arrayElemAt: [color, "$colorIndex"] },
        },
      },
      {
        $project: {
          _id: 0,
          kelas: { $concat: ["kelas ", { $toString: "$_id" }] },
          totalKelas: 1,
          fill: 1,
        },
      },
      {
        $sort: { kelas: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data Umum.",
      data: {
        totalSiswa,
        totalGuru,
        totalKelas,
        totalMapel,
        siswaPerAjaran,
        kelasPerTotal,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAkademik = async (req, res, next) => {
  try {
    const akademik = await Master.findOne();

    if (!akademik) {
      const masterSemester = new Master({
        semester: [
          {
            keterangan: "semester 1",
            status: true,
          },
          {
            keterangan: "semester 2",
            status: false,
          },
        ],
      });
      await masterSemester.save();

      res.status(200).json({
        success: true,
        message: "Berhasil mengambil data akademik.",
        akademik: masterSemester,
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data akademik.",
      akademik,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleSemester = async (req, res, next) => {
  try {
    const { keterangan } = req.body;

    const master = await Master.findOne();

    if (!master) {
      throw new ResponseError(404, "Data master tidak ditemukan.");
    }

    const selectedSemester = master.semester.find(
      (sem) => sem.keterangan === keterangan
    );
    const notSelectSemester = master.semester.find(
      (sem) => sem.keterangan !== keterangan
    );

    if (selectedSemester && selectedSemester.status === true) {
      selectedSemester.status = false;
      notSelectSemester.status = true;
    } else {
      selectedSemester.status = true;
      notSelectSemester.status = false;
    }

    await master.save();

    res.status(200).json({
      success: true,
      message: `Berhasil mengubah status semester`,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJam = async (req, res, next) => {
  try {
    const { end, start } = req.body;

    const master = await Master.findOne();

    if (!master) {
      throw new ResponseError(404, "Data master tidak ditemukan");
    }

    if (start >= end) {
      throw new ResponseError(
        400,
        "Waktu mulai tidak bisa lebih dari waktu selesai"
      );
    }

    if (end <= start) {
      throw new ResponseError(
        400,
        "Waktu Selesai tidak bisa kurang dari waktu mulai"
      );
    }

    const update = await Master.findOneAndUpdate(
      {},
      { endTime: end, startTime: start },
      { new: true }
    );

    const jadwalList = await Jadwal.find({ mulai: { $lte: update.startTime } });

    for (const jadwal of jadwalList) {
      await Jadwal.findByIdAndUpdate(jadwal.id, { mulai: update.startTime });
    }

    res.status(200).json({
      success: true,
      message: "berhasil mengupdate jam pembelajaran",
      update,
    });
  } catch (error) {
    next(error);
  }
};

export const getSemester = async (req, res, next) => {
  try {
    const master = await Master.findOne();

    const aktif = master.semester.find((data) => data.status === true);

    res.status(200).json({
      success: true,
      message: "berhasil mengambil semester aktif",
      semester: aktif,
    });
  } catch (error) {
    next(error);
  }
};
