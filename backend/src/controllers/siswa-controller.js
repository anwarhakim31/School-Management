import ResponseError from "../error/response-error.js";
import Siswa from "../models/siswa-model.js";
import Kelas from "../models/kelas-model.js";
import fs from "fs";
import s3 from "../util/aws3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { genSalt, hash } from "bcrypt";
import Total from "../models/total-model.js";
import TahunAjaran from "../models/tahunAjaran-model.js";
import Absensi from "../models/Absensi-model.js";
import NilaiPertemuan from "../models/nilaiPertemuan-model.js";
import Nilai from "../models/nilai-model.js";

import { fileURLToPath } from "url";
import XLSX from "xlsx";
import path from "path";

export const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const { tahunMasuk, jenisKelamin, kelas, kelasNama } = req.query;

    const searchRegex = new RegExp(search.trim(), "i");

    const filterQuery = {
      $or: [
        { nama: { $regex: searchRegex } },
        { nis: { $regex: searchRegex } },
      ],
    };

    if (tahunMasuk) {
      filterQuery.tahunMasuk = tahunMasuk;
    }

    if (jenisKelamin) {
      filterQuery.jenisKelamin = jenisKelamin;
    }

    if (kelasNama) {
      filterQuery.kelas = kelasNama;
    }

    let siswa = await Siswa.find(filterQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: "kelas", select: "-siswa" })
      .exec();

    const totalSiswa = await Siswa.countDocuments(filterQuery);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data siswa",
      data: siswa,
      pagination: {
        currentPage: page,
        perPage: limit,
        total: totalSiswa,
        totalPages: Math.ceil(totalSiswa / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const uploadPhotoSiswa = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ResponseError(400, "Foto di butuhkan");
    }

    const fileStream = fs.createReadStream(req.file.path);

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `Siswa/${Date.now().toString()}-${req.file.originalname}`,
      Body: fileStream,
      ACL: "public-read",
    };

    const data = await s3.send(new PutObjectCommand(uploadParams));

    const fileName = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

    fs.unlink(req.file.path, (err) => {
      if (err) {
      }
    });
    await res.status(200).json({
      success: true,
      message: "Berhasil unggah gambar",
      foto: fileName,
    });
  } catch (error) {
    next(error);
  }
};

export const addSiswa = async (req, res, next) => {
  try {
    const { kelas, namaKelas, nis, password, tahunMasuk } = req.body;

    const siswaExist = await Siswa.findOne({ nis });

    if (siswaExist) {
      throw new ResponseError(400, "NIS sudah digunakan");
    }

    if (!tahunMasuk) {
      throw new ResponseError(
        400,
        "Silakan mengatur Tahun Masuk Ajaran pada data umum terlebih dulu"
      );
    }

    const salt = await genSalt();
    req.body.password = await hash(password, salt);

    let newSiswa;

    if (!kelas && !namaKelas) {
      delete req.body.kelas;
      delete req.body.namaKelas;

      newSiswa = new Siswa({
        ...req.body,
      });
      await newSiswa.save();
    } else {
      const kelasSiswa = await Kelas.findOne({
        kelas,
        nama: namaKelas,
      });

      if (!kelasSiswa) {
        throw new ResponseError(404, "Kelas tidak ditemukan.");
      }

      newSiswa = new Siswa({
        ...req.body,
        kelas: kelasSiswa._id,
      });

      const siswaSaved = await newSiswa.save();
      kelasSiswa.siswa.push(siswaSaved._id);
      kelasSiswa.jumlahSiswa = kelasSiswa.siswa.length;

      await kelasSiswa.save();
    }

    await Total.findOneAndUpdate(
      { ajaran: tahunMasuk },
      { $inc: { totalSiswa: 1 } },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Berhasil menambahkan siswa" });
  } catch (error) {
    next(error);
  }
};

export const editSiswa = async (req, res, next) => {
  try {
    const { kelas, namaKelas, nis, password, _id } = req.body;

    const siswa = await Siswa.findById({ _id });

    if (!siswa) {
      throw new ResponseError(404, "Siswa tidak ditemukan");
    }

    const existingSiswa = await Siswa.findOne({ nis, _id: { $ne: _id } });

    if (existingSiswa) {
      throw new ResponseError(409, "NIS sudah digunakan oleh siswa lain");
    }

    if (password) {
      const salt = await genSalt();

      req.body.password = await hash(password, salt);
    }

    if (!kelas && !namaKelas) {
      delete req.body.kelas;
      delete req.body.namaKelas;
      if (siswa.kelas) {
        const kelasUpdate = await Kelas.findByIdAndUpdate(
          siswa.kelas,
          {
            $pull: { siswa: siswa._id },
          },
          { new: true }
        );

        if (kelasUpdate) {
          const jumlahSiswa = kelasUpdate.siswa.length;

          await Kelas.findByIdAndUpdate(
            siswa.kelas,
            {
              kelasUpdate,
              jumlahSiswa: jumlahSiswa,
            },
            { new: true }
          );
        }
      }
      await Siswa.findByIdAndUpdate(
        siswa._id,
        {
          $unset: { kelas: null },
          ...req.body,
        },
        { new: true }
      );
    } else {
      const newKelas = await Kelas.findOne({ kelas, nama: namaKelas });

      if (!newKelas) {
        throw new ResponseError(404, "Kelas tidak ditemukan.");
      }

      if (siswa.kelas && siswa.kelas !== newKelas._id) {
        const updatedClass = await Kelas.findByIdAndUpdate(
          siswa.kelas,
          { $pull: { siswa: siswa._id } },
          { new: true }
        );

        if (updatedClass) {
          const jumlahSiswa = updatedClass.siswa.length;
          await Kelas.findByIdAndUpdate(
            siswa.kelas,
            { jumlahSiswa },
            { new: true }
          );
        }
      }

      delete req.body.kelas;
      delete req.body.namaKelas;
      const siswaUpdate = await Siswa.findByIdAndUpdate(siswa._id, {
        kelas: newKelas._id,
        ...req.body,
      });

      if (siswa.kelas !== newKelas._id) {
        newKelas.siswa.push(siswaUpdate._id);
      }

      newKelas.jumlahSiswa = newKelas.siswa.length;
      await newKelas.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Berhasil mengubah data siswa" });
  } catch (error) {
    next(error);
  }
};

export const deleteOneSiswa = async (req, res, next) => {
  try {
    const id = req.params.id;

    const siswa = await Siswa.findById(id);

    if (!siswa) {
      throw new ResponseError(404, "Siswa tidak ditemukan.");
    }

    const kelas = await Kelas.findById(siswa.kelas);

    if (siswa.kelas) {
      const updateKelas = kelas.siswa.filter((data) => data.toString() !== id);
      const jumlahSiswa = updateKelas.length;

      await Kelas.findByIdAndUpdate(kelas._id, {
        siswa: updateKelas,
        jumlahSiswa,
      });
    }

    await Siswa.deleteOne({ _id: id });

    await Absensi.deleteMany({ siswa: id });
    await NilaiPertemuan.deleteMany({ siswa: id });
    await Nilai.deleteMany({ siswa: id });

    const ajaran = await TahunAjaran.findOne({ status: true }).select("ajaran");

    if (ajaran) {
      const data = await Total.findOneAndUpdate(
        { ajaran: ajaran.ajaran },
        { $inc: { totalSiswa: -1 } },
        { new: true }
      );

      if (data && data.totalSiswa === 0) {
        await Total.findByIdAndDelete(data._id);
      }
    }

    res.status(200).json({
      success: true,
      message: `Berhasil menghapus siswa`,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteManySiswa = async (req, res, next) => {
  try {
    const { dataChecked } = req.body;

    const tahunAjaran = await TahunAjaran.findOne({ status: true });
    if (tahunAjaran) {
      const siswaBedasarkanAjaran = await Siswa.find({
        _id: { $in: dataChecked },
        tahunMasuk: tahunAjaran.ajaran,
      }).countDocuments();

      const data = await Total.findOneAndUpdate(
        { ajaran: tahunAjaran.ajaran },
        { $inc: { totalSiswa: -siswaBedasarkanAjaran } },
        { new: true }
      );

      if (data && data.totalSiswa === 0) {
        await Total.findByIdAndDelete(data._id);
      }
    }

    const SiswaList = await Siswa.find({ _id: { $in: dataChecked } });

    await Siswa.deleteMany({ _id: { $in: dataChecked } });

    for (const siswa of SiswaList) {
      const updatedKelas = await Kelas.findByIdAndUpdate(
        siswa.kelas,
        {
          $pull: { siswa: siswa._id },
        },
        { new: true }
      );

      await Absensi.deleteMany({ siswa: siswa._id });
      await Nilai.deleteMany({ siswa: siswa._id });
      await NilaiPertemuan.deleteMany({ siswa: siswa._id });

      if (updatedKelas) {
        const jumlahSiswa = updatedKelas.siswa.length;

        await Kelas.findByIdAndUpdate(siswa.kelas, {
          jumlahSiswa: jumlahSiswa,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Berhasil menghapus siswa terpilih`,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDetail = async (req, res, next) => {
  try {
    const jumlahSiswa = await Siswa.countDocuments();
    const lk = (await Siswa.find({ jenisKelamin: "Laki-Laki" })).length;
    const pr = (await Siswa.find({ jenisKelamin: "Perempuan" })).length;

    res.status(200).json({
      success: true,
      message: `Berhasil mengambil detail data`,
      data: { jumlahSiswa, pr, lk },
    });
  } catch (error) {
    next(error);
  }
};

export const getSiswaKelas = async (req, res, next) => {
  try {
    const id = req.params.id;

    const siswa = await Siswa.find({ kelas: id });

    if (!siswa) {
      throw new ResponseError(404, "Siswa tidak ditemukan.");
    }

    res.status(200).json({
      success: true,
      message: `Berhasil mengambil siswa`,
      siswa,
    });
  } catch (error) {
    next(error);
  }
};

// Fungsi untuk membuat password dari tanggal lahir
const createPasswordFromDateOfBirth = (dateOfBirth) => {
  const date = new Date(dateOfBirth);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const addWithExcel = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "File tidak ditemukan" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheet_name_list = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    // Hapus file setelah membacanya
    fs.unlink(req.file.path, (err) => {
      if (err) {
      }
    });

    for (const row of data) {
      const { kelas, namaKelas, nis, password, tahunMasuk, tanggalLahir } = row;

      const siswaExist = await Siswa.findOne({ nis });

      if (siswaExist) {
        throw new ResponseError(400, `NIS ${nis} sudah digunakan.`);
      }

      if (!tahunMasuk) {
        throw new ResponseError(
          400,
          `Tahun Masuk Ajaran tidak diatur untuk NIS ${nis}.`
        );
      }

      if (!tahunMasuk.toString().includes("/")) {
        throw new ResponseError(400, "Format Tahun Masuk tidak sesuai");
      }

      const [first, last] = tahunMasuk.split("/");
      const firstYear = parseInt(first);
      const lastYear = parseInt(last);

      if (lastYear - firstYear !== 1) {
        throw new ResponseError(
          404,
          "Format Tahun Masuk. Pastikan perbedaan hanya 1 tahun."
        );
      }

      let hashedPassword;

      if (!password) {
        hashedPassword = await hash(
          createPasswordFromDateOfBirth(tanggalLahir),
          await genSalt()
        );
      } else {
        const salt = await genSalt();
        hashedPassword = await hash(password, salt);
      }

      let newSiswa;

      if (!kelas && !namaKelas) {
        newSiswa = new Siswa({ ...row, password: hashedPassword });
        await newSiswa.save();
      } else {
        const kelasSiswa = await Kelas.findOne({ kelas, nama: namaKelas });

        if (!kelasSiswa) {
          throw new ResponseError(
            404,
            `Kelas ${kelas} ${namaKelas} tidak ditemukan.`
          );
        }

        newSiswa = new Siswa({
          ...row,
          kelas: kelasSiswa._id,
          password: hashedPassword,
        });
        const siswaSaved = await newSiswa.save();
        kelasSiswa.siswa.push(siswaSaved._id);
        kelasSiswa.jumlahSiswa = kelasSiswa.siswa.length;
        await kelasSiswa.save();
      }

      await Total.findOneAndUpdate(
        { ajaran: tahunMasuk },
        { $inc: { totalSiswa: 1 } },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengunggah dan memproses data siswa",
    });
  } catch (error) {
    next(error);
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadTemplate = (req, res, next) => {
  try {
    const filePath = path.join(
      __dirname,
      "../uploads/file",
      "TemplateTambahSiswa.xlsx" // Pastikan nama file dan ekstensi sudah benar
    );

    res.sendFile(filePath, (err) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Terjadi kesalahan saat mengunduh template." });
      }
    });
  } catch (error) {
    next(error);
  }
};
