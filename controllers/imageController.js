const expressAsyncHandler = require("express-async-handler");
const imageModel = require("../models/imageModel");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const postImage = expressAsyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      res.json({ msg: "no file upload" });
    }
    const imageFile = imageModel({
      filename: req.file.filename,
      filepath: req.file.path,
    });
    // console.log(Image);
    const saveImage = await imageFile.save();
    res.json({ saveImage, msg: "sucess upload" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { upload, postImage };
