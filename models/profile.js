const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  age: {
    type: String,
  },
  degree: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  profession: {
    type: String,
  },
  company: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
