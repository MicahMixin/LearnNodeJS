const express = require("express");
const cors = require("cors");

require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(cors());

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
