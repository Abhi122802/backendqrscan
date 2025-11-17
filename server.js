const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
// app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/qrcodes", require("./routes/qrcodes"));
app.use('/api/qrcodes', require('./routes/qrcodes'));


// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
