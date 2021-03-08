const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");

require("./db/mongoose");

const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".pdf")) {
      return cb(new Error("File must be PDF"));
    }
    cb(undefined, true);
  },
});
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(cors());

app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
