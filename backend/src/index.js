const express = require("express");
require("./db/mongoose");

const app = express();

// routes
const userRoute = require("./routes/user");

app.use(express.json());

app.use("/api/user", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
