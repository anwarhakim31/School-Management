import ResponseError from "../error/response-error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.Scholarcy;

  if (!token) {
    throw new ResponseError(
      401,
      "Sesi login telah habis. Jika ingin melanjutkan silahkan login kembali."
    );
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      res.clearCookie("jwt");
      throw new ResponseError(401, "Token tidak valid");
    }

    req.userId = payload.id;
    req.role = payload.role;

    next();
  });
};

export default verifyToken;
