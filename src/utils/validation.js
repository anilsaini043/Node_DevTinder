const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("User name required field missing...!");
  } else if (firstName.length < 4 || firstName.length > 20) {
    throw new Error("Name should be between 4-20 charactor");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
    "job"
  ];
  const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
