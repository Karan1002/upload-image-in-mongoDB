const express = require("express");
const { upload, postImage } = require("../controllers/imageController");
const router = express.Router();
const app = express();

router.post("/", upload.single("image"), postImage);

module.exports = router;
