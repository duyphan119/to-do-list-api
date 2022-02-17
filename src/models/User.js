const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, min: 6 },
    hash: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userShema);
