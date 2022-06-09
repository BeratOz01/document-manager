const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    nonce: {
      type: Number,
      required: false,
      default: parseInt(Math.floor(Math.random() * 10100001010)),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
