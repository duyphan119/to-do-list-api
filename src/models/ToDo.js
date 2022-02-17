const mongoose = require("mongoose");

const toDoShema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ToDo", toDoShema);
