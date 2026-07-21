const express = require("express");
const { userAuth } = require("../middlewares/auth.js");

const requestRouter = express.Router();

// Send connection request api
requestRouter.post("/sendConnectionRequest", userAuth, async(req, res) => {
  const user = req.user;
  // Sending a connection request
  console.log("Sending a connection request....");
  res.send(user.firstName + " sent a connection request.")
})

module.exports = requestRouter;