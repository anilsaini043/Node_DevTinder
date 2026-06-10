const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://anilsaini:HWT57Xy1Ltg3ghTA@namastenodejs.xhe80cs.mongodb.net/devTinder"); // "devTinder" is DB name
}

module.exports = connectDB;
