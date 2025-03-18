import multer from "multer";
import * as path from "node:path";
import fs from "fs";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const destinationPath = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    cb(null, destinationPath);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPEG, PNG, and GIF images are allowed"));
  }
  cb(null, true);
};

export default multer({ storage, fileFilter });
