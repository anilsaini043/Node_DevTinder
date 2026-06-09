const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://anilsaini:09ebnit002@namastenodejs.xhe80cs.mongodb.net/devTinder"); // "devTinder" is DB name
}

module.exports = connectDB;
