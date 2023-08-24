const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,
    required: true,
  },
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
  TaskModel,
};
