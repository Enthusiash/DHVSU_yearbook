const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDB");
const app = express();
const PORT = process.env.PORT;

//import routes
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

//define routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to DHVSU_Yearbook API");
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});