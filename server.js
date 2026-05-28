require("dotenv").config();

const express = require("express");
const passport = require("./config/passport");

const connectDB = require("./config/db");

const userRoutes = require("./routes/api/userRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

// connect database
connectDB();

// middleware
app.use(express.json());
app.use(passport.initialize());

// routes
app.use("/api/users", userRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

// test route
app.get("/", (req, res) => {
  res.send("TaskMaster API Running");
});

// server listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});