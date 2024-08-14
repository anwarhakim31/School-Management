import ResponseError from "../error/response-error.js";
import Guru from "../models/guru-model.js";
import Kelas from "../models/kelas-model.js";
import Siswa from "../models/siswa-model.js";

export const addKelas = async (req, res, next) => {
  try {
    const { kelas, nama, waliKelas } = req.body;

    const kelasExists = await Kelas.findOne({ kelas, nama });

    if (kelasExists) {
      throw new ResponseError(400, "Kombinasi kelas dan nama sudah digunakan.");
    }

    if (!waliKelas) {
      delete req.body.waliKelas;

      const newKelas = new Kelas(req.body);

      await newKelas.save();
    } else {
      const waliExist = await Guru.findById({ _id: waliKelas });

      if (waliExist.waliKelas) {
        throw new ResponseError(400, "Guru sudah sebagai Wali Kelas.");
      }

      const newKelas = new Kelas(req.body);

      await newKelas.save();

      await Guru.findByIdAndUpdate(waliKelas, { waliKelas: newKelas._id });
    }

    res
      .status(200)
      .json({ success: true, message: "Berhasil menambah kelas." });
  } catch (error) {
    next(error);
  }
};

export const getKelas = async (req, res, next) => {
  try {
    const kelas = await Kelas.find().populate("waliKelas");

    // const newData = kelas.map((kel) => ({
    //   ...kel._doc,
    // }));

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data kelas.",
      kelas,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteKelas = async (req, res, next) => {
  try {
    const { id } = req.params;

    const kelas = await Kelas.findById(id).populate("siswa");

    if (!kelas) {
      throw new ResponseError(404, "Kelas tidak di temukan");
    }

    if (kelas.waliKelas) {
      await Guru.findByIdAndUpdate(kelas.waliKelas, {
        $unset: { waliKelas: null },
      });
    }

    if (kelas.siswa.length > 0) {
      await Siswa.updateMany(
        { _id: { $in: kelas.siswa } },
        { $unset: { kelas: null } }
      );
    }

    await Kelas.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Kelas berhasil di hapus.",
    });
  } catch (error) {
    next(error);
  }
};

export const updateKelas = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nama, kelas, waliKelas } = req.body;

    console.log(id, "IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");

    const kelasExists = await Kelas.findOne({ nama, kelas, _id: { $ne: id } });

    if (kelasExists) {
      throw new ResponseError(400, "Kombinasi kelas dan nama sudah digunakan.");
    }

    const isExist = await Kelas.findById(id);

    if (!waliKelas) {
      if (isExist.waliKelas) {
        await Guru.findByIdAndUpdate(
          isExist.waliKelas,
          {
            $unset: { waliKelas: null },
          },
          { new: true }
        );
      }

      delete req.body.waliKelas;

      await Kelas.findByIdAndUpdate(
        id,
        { $unset: { waliKelas: null } },
        { runValidators: true, new: true }
      );
    } else {
      const alreadyWali = await Guru.findOne({ _id: waliKelas });

      if (alreadyWali.waliKelas) {
        throw new ResponseError(404, "Guru sudah sebagai Wali Kelas.");
      }

      if (isExist.waliKelas) {
        await Guru.findByIdAndUpdate(
          { _id: isExist.waliKelas },
          {
            $unset: { waliKelas: null },
          },
          { new: true }
        );
      }

      await Guru.findByIdAndUpdate(waliKelas, {
        waliKelas: id,
      });

      await Kelas.findByIdAndUpdate(
        id,
        { $set: { ...req.body } },
        { runValidators: true, new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Kelas berhasil di ubah.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getWaliKelas = async (req, res, next) => {
  try {
    const waliKelas = req.params.id;

    const kelas = await Kelas.findOne({ waliKelas: waliKelas }).populate({
      path: "siswa",
      select: "-password",
      populate: {
        path: "kelas",
        select: "nama kelas",
      },
    });

    if (!kelas) {
      throw new ResponseError(404, "Kelas dengan walikelas tersebut tidak ada");
    }

    res.status(200).json({
      success: true,
      message: `Berhasil mengambil  data`,
      kelas,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
