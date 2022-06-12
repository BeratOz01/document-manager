const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
      unique: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
    allowedAddresses: [{ type: String }],
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
