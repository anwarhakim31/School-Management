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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Total = mongoose.model("total", TotalSchema);

export default Total;
