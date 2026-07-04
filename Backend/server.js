const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://jobapp-1-du84.onrender.com"],
    credentials: true,
  }),
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5600;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/jobposts", require("./Routes/jobPostRoutes"));
