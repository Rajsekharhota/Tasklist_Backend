const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connection } = require("./Database/db");
const { userRouter } = require("./Routes/user.routes");
const { taskRouter } = require("./Routes/task.routes");
require("dotenv").config();
const port = process.env.PORT;
const app = express();

//All Routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send({
    message: "api is working now!",
  });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on ${port}`);
});
