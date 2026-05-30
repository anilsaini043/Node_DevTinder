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

const userAuth = (req, res, next) => {
  // Logic to check req authorization
  console.log("User auth is getting checked!!!");
  const token = "xyz";
  const isAuth = token === "xyz";
  if (!isAuth) {
    res.status(401).send("User has made Unauthorized request.....!!!!");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth }
