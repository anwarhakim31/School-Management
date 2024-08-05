import bcrypt, { hash, genSalt } from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { app } from "./src/app/app.js";
// import { siswa } from "./src/data/siswa.js";
import Siswa from "./src/models/siswa-model.js";
import Kelas from "./src/models/kelas-model.js";
import { siswas } from "./src/data/siswa.js";

dotenv.config();

const bulkInsertStudents = async () => {
  try {
    // Adjusted file path to src/data/siswa.json
    const filePath = path.resolve("src", "data", "siswa.json");

    // Read and parse the JSON file
    const data = fs.readFileSync(filePath, "utf-8");
    const students = JSON.parse(data);

    if (!Array.isArray(students) || students.length === 0) {
      console.error("Invalid or empty student data.");
      return;
    }

    const studentsToInsert = [];
    const errors = [];

    for (const student of students) {
      const { kelas, namaKelas, nis, password, ...otherFields } = student;

      const siswaExist = await Siswa.findOne({ nis });
      if (siswaExist) {
        errors.push({ nis, message: "NIS sudah digunakan" });
        continue;
      }

      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);

      studentsToInsert.push(newStudentData);
    }

    if (studentsToInsert.length > 0) {
      await Siswa.insertMany(studentsToInsert);
      console.log("Siswa berhasil ditambahkan");
    }

    if (errors.length > 0) {
      console.error("Errors occurred during insertion:", errors);
    }
  } catch (error) {
    console.error("Error during bulk insertion:", error);
  }
};

const port = process.env.PORT || 2001;
const databaseURL = process.env.DATABASE_URL;

async function hashPassord(Users) {
  for (const user of Users) {
    if (user.password) {
      const salt = await genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
  }

  return Users;
}

app.get("/", (req, res) => {
  res.send(`
    <html">
      <head>
        <title>API Status</title>
        <script>
          function updateTime() {
            const date = new Date();
            const idn = new Intl.DateTimeFormat('id-ID', {
              dateStyle: 'full',
              timeStyle: 'long',
              timeZone: 'Asia/Jakarta',
            }).format(date);
            document.getElementById("timestamp").textContent = idn;
          }
          setInterval(updateTime, 1000);
        </script>
      </head>
      <body style="font-family: Arial, sans-serif; background:#9118e2; color:#ffffff; text-align: center; width:100%; height:100vh; display:flex; justify-content:center; align-items:center; overflow:hidden;">
        <h1 ">API is running</h1>
        <p ">Status: <strong>success</strong></p>
        <p ">Timestamp: <strong id="timestamp">${new Date().toISOString()}</strong></p>
      </body>
    </html>
  `);
});

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL);

    console.log("conncect to DB");
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, async () => {
  connectDB();
  // try {
  //   // Masukkan data ke koleksi Siswa
  //   const insertedSiswa = await Siswa.insertMany(siswas);
  //   console.log("Data siswa berhasil dimasukkan");

  //   // Kelompokkan siswa berdasarkan kelas dan perbarui dokumen Kelas
  //   const kelasUpdates = insertedSiswa.reduce((acc, siswa) => {
  //     const kelasId = siswa.kelas.toString();
  //     if (!acc[kelasId]) {
  //       acc[kelasId] = [];
  //     }
  //     acc[kelasId].push(siswa._id);
  //     return acc;
  //   }, {});

  //   for (const [kelasId, siswaIds] of Object.entries(kelasUpdates)) {
  //     await Kelas.findByIdAndUpdate(kelasId, {
  //       $push: { siswa: { $each: siswaIds } },
  //     });
  //   }

  //   console.log("Data kelas berhasil diperbarui");
  // } catch (error) {
  //   console.error("Gagal memasukkan data siswa:", error);
  // }

  console.log("Server is running in port " + process.env.PORT);
});
