import bcrypt, { hash, genSalt } from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { app } from "./src/app/app.js";
import Siswa from "./src/models/siswa-model.js";
import Kelas from "./src/models/kelas-model.js";
import Total from "./src/models/total-model.js";
import { fileURLToPath } from "url";
dotenv.config();

const port = process.env.PORT || 2001;
const databaseURL = process.env.DATABASE_URL;

// Function to hash passwords
async function hashPassword(users) {
  for (const user of users) {
    if (user.password) {
      const salt = await genSalt();
      user.password = await hash(user.password, salt);
    }
  }
  return users;
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON data from file
const readJsonData = () => {
  const filePath = path.join(__dirname, "src/data", "siswa.json");
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Bulk add siswa function
// Bulk add siswa function
const bulkAddSiswa = async () => {
  try {
    // Read and hash the data
    const siswas = readJsonData();
    const hashedSiswas = await hashPassword(siswas);

    // Group siswa by kelas and namaKelas
    const kelasUpdates = {};
    const siswaToInsert = [];
    const tahunMasukCounts = {};

    for (const siswa of hashedSiswas) {
      // Find the Kelas based on kelas and namaKelas
      const kelasSiswa = await Kelas.findOne({
        kelas: siswa.kelas,
        nama: siswa.namaKelas,
      });

      if (!kelasSiswa) {
        console.log(
          `Kelas with kelas: ${siswa.kelas} and namaKelas: ${siswa.namaKelas} not found`
        );
        continue;
      }

      // Add siswa to the insert list
      siswaToInsert.push({ ...siswa, kelas: kelasSiswa._id });

      // Update kelasUpdates with the Kelas ID
      if (!kelasUpdates[kelasSiswa._id]) {
        kelasUpdates[kelasSiswa._id] = [];
      }
      kelasUpdates[kelasSiswa._id].push(null); // Placeholder for siswa _id

      // Count students by tahunMasuk
      if (!tahunMasukCounts[siswa.tahunMasuk]) {
        tahunMasukCounts[siswa.tahunMasuk] = 0;
      }
      tahunMasukCounts[siswa.tahunMasuk]++;
    }

    // Insert siswa data in bulk
    let insertedSiswas;
    if (siswaToInsert.length > 0) {
      insertedSiswas = await Siswa.insertMany(siswaToInsert);
    }

    // Map the inserted siswa to their _id
    const siswaIdMap = insertedSiswas.reduce((map, siswa) => {
      map[siswa.kelas] = map[siswa.kelas] || [];
      map[siswa.kelas].push(siswa._id);
      return map;
    }, {});

    // Update Kelas documents
    for (const [kelasId, siswaIds] of Object.entries(kelasUpdates)) {
      const siswaList = siswaIdMap[kelasId] || [];

      await Kelas.findByIdAndUpdate(kelasId, {
        $push: { siswa: { $each: siswaList } },
        $set: {
          jumlahSiswa:
            siswaList.length + (await Kelas.findById(kelasId)).siswa.length,
        },
      });
    }

    // Update Total collection
    for (const [tahunMasuk, count] of Object.entries(tahunMasukCounts)) {
      await Total.findOneAndUpdate(
        { ajaran: tahunMasuk },
        {
          $inc: { totalSiswa: count },
        },
        { upsert: true, new: true }
      );
    }

    console.log("Bulk data added successfully");
  } catch (error) {
    console.error("Failed to bulk add siswa:", error);
  }
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL);
    console.log("Connected to DB");

    // Perform bulk insertion after DB connection is established
    // await bulkAddSiswa();
  } catch (error) {
    console.log("Failed to connect to DB:", error);
  }
};

// Endpoint to check API status
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

app.listen(port, async () => {
  await connectDB();
  console.log("Server is running on port " + port);
});
