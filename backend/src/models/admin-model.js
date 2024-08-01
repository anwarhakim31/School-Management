import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "admin",
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: false,
  },
  foto: {
    type: String,
    required: false,
  },
});

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }
  next();
});

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
