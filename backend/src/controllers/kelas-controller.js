import ResponseError from "../error/response-error.js";
import Kelas from "../models/kelas-model.js";

export const addKelas = async (req, res, next) => {
  try {
    const data = req.body;

    console.log(data);

    const newUser = new Kelas(data);

    await newUser.save();

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

    const result = await Kelas.findByIdAndDelete(id);

    if (!result) {
      throw new ResponseError(404, "Kelas tidak di temukan");
    }

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
