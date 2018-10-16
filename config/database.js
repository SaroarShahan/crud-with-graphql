const config = require("./config");
const mongoose = require("mongoose");

module.exports = mongoose.connect(
  config.development.database.db,
  { useNewUrlParser: true, useCreateIndex: true },
  error => {
    error ? console.log(error) : console.log("mongoose connected");
  }
);
