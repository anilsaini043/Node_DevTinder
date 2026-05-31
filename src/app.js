const express = require("express");
const connectDB = require("./config/database.js");

const app = express();

connectDB()
  .then(() => {
    console.log("Database connection successfull...!!!");
    app.listen(7070, () => {
      console.log("Server is running on Port 7070.");
    });
  })
  .catch((err) => {
    console.error("Database connection FAILED...!!!");
  });
