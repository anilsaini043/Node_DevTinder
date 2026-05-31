const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://anilsaini:09ebnit002@devtinderappcluster.caaz2am.mongodb.net/");
}

module.exports = connectDB;
