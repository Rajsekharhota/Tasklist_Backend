const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Authenticator } = require("../Middlewares/Authenticator");
const { TaskModel } = require("../Models/TaskSchema");

const taskRouter = express.Router();
taskRouter.use(Authenticator);

taskRouter.get("/", async (req, res) => {
  let token = req.headers.authorization;
  jwt.verify(token, "rajsekhar", async (err, decode) => {
    try {
      let data = await TaskModel.find({ user: decode.userId });
      res.send({
        data: data,
        message: "Success",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
});

taskRouter.post("/create", async (req, res) => {
  try {
    let task = new TaskModel(req.body);
    await task.save();
    res.send({
      message: "task created",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

taskRouter.patch("/", async (req, res) => {
  let { id } = req.headers;

  try {
    await TaskModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "Task Updated",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

taskRouter.delete("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.send({
      message: "Task deleted",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

module.exports = {
  taskRouter,
};
