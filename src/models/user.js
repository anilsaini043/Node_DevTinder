const mongoose = require("mongoose");
const validator = require("validator");

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
        maxLength: 12,
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

const User = mongoose.model("User", userSchema);

module.exports = User;