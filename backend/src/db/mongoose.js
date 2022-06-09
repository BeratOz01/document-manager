// Mongoose Import
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.error(err);
    else console.log("MongoDB connected");
  }
);
