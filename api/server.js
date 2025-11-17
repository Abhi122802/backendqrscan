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
const qrcodeRoutes = require('./routes/qrcodeRoutes');


module.exports = app;
