import mongoose from "mongoose";

const MasterSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
    default: "07:00",
  },
  endTime: {
    type: String,
    required: true,
    default: "15:00",
  },
  semester: [
    {
      keterangan: {
        type: String,
        enum: ["semester 1", "semester 2"],
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
        default: function () {
          return this.semester.length === 0;
        },
      },
    },
  ],
});

MasterSchema.pre("save", function (next) {
  const activeSemesters = this.semester.filter((sem) => sem.status === true);

  // Ensure only one semester is active
  if (activeSemesters.length > 1) {
    next(new Error("Hanya satu semester yang bisa aktif."));
  } else {
    next();
  }
});

const Master = mongoose.model("Master", MasterSchema);

export default Master;
