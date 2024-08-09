import mongoose from "mongoose";

const TotalSchema = new mongoose.Schema({
  ajaran: {
    type: String,
    required: true,
  },
  totalSiswa: {
    type: Number,
    required: true,
  },
});

const Total = mongoose.model("total", TotalSchema);

export default Total;
