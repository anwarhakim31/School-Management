import ResponseError from "../error/response-error.js";
import Kelas from "../models/kelas-model.js";

export const addKelas = async (req, res, next) => {
  try {
    const { kelas, nama } = req.body;

    const kelasExists = await Kelas.findOne({ kelas, nama });

    if (kelasExists) {
      throw new ResponseError(400, "Kombinasi kelas dan nama sudah digunakan.");
    }
    const newKelas = new Kelas({ kelas, nama });

    await newKelas.save();

    res
      .status(200)
      .json({ success: true, message: "Berhasil menambah kelas." });
  } catch (error) {
    next(error);
  }
};

export const getKelas = async (req, res, next) => {
  try {
    const kelas = await Kelas.find();

    const newData = kelas.map((kel) => ({
      ...kel._doc,
      jumlahSiswa: kel.siswa.length,
    }));

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data kelas.",
      kelas: newData,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteKelas = async (req, res, next) => {
  try {
    const { id } = req.params;

    const kelas = await Kelas.findById(id).populate("siswa");

    if (!result) {
      throw new ResponseError(404, "Kelas tidak di temukan");
    }

    console.log(kelas);

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
    const updateData = req.body;

    const kelas = await Kelas.findByIdAndUpdate(
      id,
      { $set: updateData },
      { runValidators: true, new: true }
    );

    if (!kelas) {
      throw new ResponseError(404, "Kelas tidak di temukan");
    }

    res.status(200).json({
      success: true,
      message: "Kelas berhasil di ubah.",
    });
  } catch (error) {
    next(error);
  }
};
