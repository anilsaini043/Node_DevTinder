const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("User name required field missing...!")
    }else if(firstName.length < 4 || firstName.length > 20){
        throw new Error("Name should be between 4-20 charactor")
    }else if(!validator.isEmail(emailId)){
        throw new Error("EmailId is not valid")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password")
    }
}

module.exports = {
    validateSignUpData
}