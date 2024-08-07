import ResponseError from "../error/response-error.js";
import Guru from "../models/guru-model.js";
import Kelas from "../models/kelas-model.js";
import { hash, genSalt } from "bcrypt";

export const addGuru = async (req, res, next) => {
  try {
    const { nip, kelas, namaKelas, password } = req.body;

    const isExist = await Guru.findOne({ nip });

    if (isExist) {
      throw new Response(400, "Nip Sudah digunakan.");
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
