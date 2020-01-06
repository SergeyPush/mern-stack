const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));

const PORT = config.get("port") || 9000;
async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
    });
  } catch (error) {
    console.log("Server error " + error);
    process.exit(1);
  }
}

start();
