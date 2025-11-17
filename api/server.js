const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("../config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("QR Backend is running from Vercel!");
});

// Routes
app.use("/api/qrcode", require("../routes/qrcode"));

module.exports = app;
