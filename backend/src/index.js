const express = require("express");
const cors = require("cors");

// MongoDB Connection Init
require("./db/mongoose");

/// Web3 & Contract Instances Init
require("./web3/index");

const app = express();

// routes
const userRoute = require("./routes/user");
const fileRoute = require("./routes/file");

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/file", fileRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
