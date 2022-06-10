const express = require("express");
const cors = require("cors");

require("./db/mongoose");

const app = express();

// routes
const userRoute = require("./routes/user");

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
