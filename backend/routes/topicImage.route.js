const router = require("express").Router();
const multer = require("multer");

// const corsOrigin = "http://localhost:3000";
// app.use(
//   cors({
//     origin: [corsOrigin],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

const imageUploadPath = "build/img";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const imageUpload = multer({ storage: storage });

router.post("/image-upload", imageUpload.array("my-image-file"), (req, res) => {
  console.log("POST request received to /image-upload.");
  console.log("Axios POST body: ", req.body);
  res.send("POST request recieved on server to /image-upload.");
});

module.exports = router;
