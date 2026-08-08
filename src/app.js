const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter  = require("./routes/user.js");

const app = express();
app.use(express.json()); // req/ res reading
app.use(cookieParser()); // Working as cookie parser middleware

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)

// MongoDB connction
connectDB()
  .then(() => {
    console.log("Database connection successfull...!!!");
    app.listen(7070, () => {
      console.log("Server is running on Port 7070.");
    });
  })
  .catch((err) => {
    console.error("Database connection FAILED...!!!", err);
  });
