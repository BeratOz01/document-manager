const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
    },
    nonce: {
      type: Number,
      required: false,
      default: parseInt(Math.floor(Math.random() * 10100001010)),
    },
    token: {
      type: String,
      required: false,
    },
    expiresAt: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
