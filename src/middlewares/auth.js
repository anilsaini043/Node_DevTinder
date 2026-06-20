const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
  // Logic to check req authorization
  console.log("Admin auth is getting checked!!!");
  const token = "xyz";
  const isAuth = token === "xyz";
  if (!isAuth) {
    res.status(401).send("Admin is Unauthorized.....!!!!");
  } else {
    next();
  }
};

const userAuth = async (req, res, next) => {
  try{
    const {token} = req.cookies;
    if(!token){
      throw new Error("Token is not valid...")
    }
  const decodedObj = await jwt.verify(token, "Secret@key");
  const {_id} = decodedObj;
  const user = await User.findById(_id);
  if(!user){
    throw new Error("User not found.")
  }
  req.user = user;
  next();
  }catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { adminAuth, userAuth }
