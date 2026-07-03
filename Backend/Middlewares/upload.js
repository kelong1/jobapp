const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary");

const getFileFormat = (file) => {
  if (file.mimetype === "application/pdf") return "pdf";
  if (file.mimetype === "text/plain") return "txt";
  return "bin";
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "job_uploads",
    resource_type: "raw",
    format: getFileFormat(file),
    public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`,
  }),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype === "text/plain") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF or plain text files are allowed."));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
