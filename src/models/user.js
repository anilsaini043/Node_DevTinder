const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        uppercase: true,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        unique: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email format is not correct...!" + value)
            }
        }
    },
    password: {
        type: String,
        minLength: 3,
        maxLength: 200,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter strong password"+ value)
            }
        }
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw  new Error("Gender is not Valid...!" + value)
            }
        }
    },
    skills: {
        type: [String],
    },
    job: {
        type: String,
        default: "I am an Application Developer"
    },
    photoUrl:{
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL format...!" + value)
            }
        }
    }
}, {
    timestamps : true
});

// User schema method
userSchema.methods.getJWT = async function() {
    const user = this;

    const token = await jwt.sign({_id: user._id}, "Secret@key", {
        expiresIn: "7d",
    })

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}



module.exports = mongoose.model("User", userSchema);;