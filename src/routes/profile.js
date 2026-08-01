const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { validateEditProfileData } = require("../utils/validation.js");

const profileRouter = express.Router();

// Profile view api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:-" + err.message);
  }
});

// Profile edit api
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try{
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser
    })
  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
})

// Forgot password api
profileRouter.patch("/profile/forgot", userAuth, async (req, res) => {
  try{
    const { password } = req.body;
    if(!validator.isStrongPassword(password)){
      throw new Error("Enter valid strong password")
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const loggedInUser = req.user;
    loggedInUser.password = passwordHash;
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName}, your profile password updated successfully`,)
  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
})

module.exports = profileRouter;