const mongoose = require("mongoose");

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
    },
    password: {
        type: String,
        minLength: 3,
        maxLength: 12
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw  new Error("Gender is not Valid...!")
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
        type: String
    }
}, {
    timestamps : true
});

const User = mongoose.model("User", userSchema);

module.exports = User;