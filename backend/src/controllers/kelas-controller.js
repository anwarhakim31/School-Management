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
