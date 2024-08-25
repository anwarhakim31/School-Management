import ResponseError from "../error/response-error.js";
import Jadwal from "../models/jadwal-model.js";
import Libur from "../models/libur-model.js";
import Master from "../models/master-model.js";

export const addJadwal = async (req, res, next) => {
  try {
    const { bidangStudi, guru, kelas, hari, mulai, selesai, jumlahPertemuan } =
      req.body;

    const master = await Master.findOne();

    if (mulai < master.startTime) {
      throw new ResponseError(
        400,
        "Jam mulai pembelajaran tidak bisa sebelum waktu mulai masuk sekolah."
      );
    }

    if (mulai > master.endTime) {
      throw new ResponseError(
        400,
        "Jam mulai pembelajaran tidak bisa setelah waktu selesai sekolah."
      );
    }

    if (selesai > master.endTime) {
      throw new ResponseError(
        400,
        "Jam selesai pembelajaran tidak bisa setelah waktu selesai sekolah."
      );
    }

    if (selesai <= master.startTime) {
      throw new ResponseError(
        400,
        "Jam selesai pembelajaran tidak bisa sebelum atau sama dengan jam mulai."
      );
    }

    if (mulai > master.endTime) {
      throw new ResponseError(
        400,
        "Jam mulai pembelajaran tidak boleh melebihi jam selesai."
      );
    }

    const jadwalKelas = await Jadwal.findOne({
      kelas,
      hari,
      $or: [
        { mulai: { $lt: selesai, $gt: mulai } },
        { selesai: { $lt: selesai, $gt: mulai } },
        { mulai: { $lte: mulai }, selesai: { $gte: selesai } },
      ],
    });

    if (jadwalKelas) {
      throw new ResponseError(
        400,
        "Kelas ini sudah memiliki jadwal pada waktu tersebut."
      );
    }

    const jadwalGuru = await Jadwal.findOne({
      guru,
      hari,
      $or: [
        { mulai: { $lt: selesai, $gt: mulai } },
        { selesai: { $lt: selesai, $gt: mulai } },
        { mulai: { $lte: mulai }, selesai: { $gte: selesai } },
      ],
    });

    if (jadwalGuru) {
      throw new ResponseError(
        400,
        "Guru ini sudah memiliki jadwal mengajar pada waktu tersebut."
      );
    }

    if (jumlahPertemuan <= 0) {
      throw new ResponseError(400, "Jumlah pertemuan harus lebih dari 0.");
    }

    const libur = await Libur.findOne();

    const weekendHoliday = libur.perpekan.find((p) => p.hari === hari);

    if (weekendHoliday && weekendHoliday.status) {
      throw new ResponseError(
        400,
        "Hari yang yang di atur merupakan libur  pekan"
      );
    }

    const jadwal = new Jadwal({
      bidangStudi,
      guru,
      kelas,
      hari,
      mulai,
      selesai,
      jumlahPertemuan,
    });

    await jadwal.save();

    res.status(201).json({
      success: true,
      message: "Jadwal berhasil ditambahkan",
      jadwal,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getJadwal = async (req, res, next) => {
  try {
    const jadwal = await Jadwal.find()
      .populate({
        path: "bidangStudi",
      })
      .populate({
        path: "guru",
        select: "nama",
      })
      .populate({
        path: "kelas",
        select: "nama kelas",
      });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil jadwal",
      jadwal,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteJadwal = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Jadwal.findByIdAndDelete(id, { new: true });

    res
      .status(200)
      .json({ success: true, message: "Berhasil menghapus jadwal." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const editJadwal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bidangStudi, guru, kelas, hari, mulai, selesai, jumlahPertemuan } =
      req.body;

    await Jadwal.findByIdAndUpdate(
      id,
      { bidangStudi, guru, kelas, hari, mulai, selesai, jumlahPertemuan },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Berhasil mengubah jadwal." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
