import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/file"); // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname); // File name
  },
});

export const upload = multer({ storage: storage });
