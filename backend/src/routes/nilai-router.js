import express from "express";

import verifyToken from "../middlewares/auth-middleware.js";
import {
  addNilai,
  deleteManyNilai,
  deleteOneNilai,
  getNilaiAverage,
  getNilaiKelas,
  getRaport,
  getRekapKelas,
  updateNilai,
} from "../controllers/nilai-controller.js";

const nilaiRouter = express.Router();

nilaiRouter.post("/add-nilai", verifyToken, addNilai);
nilaiRouter.get("/all-siswa/:walikelasId", verifyToken, getNilaiKelas);
nilaiRouter.get("/rekap-nilai", verifyToken, getRekapKelas);
nilaiRouter.delete("/delete-one-nilai/:id", verifyToken, deleteOneNilai);
nilaiRouter.delete("/delete-many-nilai", verifyToken, deleteManyNilai);
nilaiRouter.put("/update-nilai/:id", verifyToken, updateNilai);
nilaiRouter.get("/get-raport/:siswaId", verifyToken, getRaport);
nilaiRouter.get("/get-average", verifyToken, getNilaiAverage);

export default nilaiRouter;
