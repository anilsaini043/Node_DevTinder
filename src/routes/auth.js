const express = require("express");
const bcrypt = require("bcryptjs");
const { validateSignUpData } = require("../utils/validation.js");
const User = require("../models/user.js");

const authRouter = express.Router();

// Signup API
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req); // first validate signup data
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); // Bcrypted password

    const user = new User({
      // Creating a new instance of the User model
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully...!");
  } catch (err) {
    res.status(400).send("Error saving the " + err.message);
  }
});

// Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordMatch = await user.validatePassword(password);
    if (isPasswordMatch) {
      const token = await user.getJWT(); // Create a JWT token
      res.cookie("token", token);  // Add JWT token to cookie and send the response back to the user
      res.send("User logged In successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// Logout Api
authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })

    res.send("You are successfully logged out...!")
})

module.exports = authRouter;