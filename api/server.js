const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("QR Backend is running from Vercel!");
});

// Routes
app.use("/api/auth", qrcodeRoutes);

const qrcodeRoutes = require("./routes/qrcodeRoutes");
app.use("/api/qrcodes", qrcodeRoutes);

module.exports = app;
