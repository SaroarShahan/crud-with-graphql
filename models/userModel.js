const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    companyID: {
      type: String
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
