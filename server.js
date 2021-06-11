// Import Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

//  Apply middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo URI
const mongoURI = process.env.mongoURI;

// Attempt t0 connect DB
mongoose
  .connect(mongoURI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection established successfully"))
  .catch((err) => console.log("Error in connecting to DB "));

// Testing Route
app.get("/", (req, res) => {
  res.send("API for User Profile Works successfully");
});

app.use("/api", authRoutes);
app.use("/api", profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));
