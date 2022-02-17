const mongoose = require("mongoose");

const refreshTokenShema = new mongoose.Schema(
  {
    refreshToken: { type: String, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("RefreshToken", refreshTokenShema);
