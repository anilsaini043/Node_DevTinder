const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");

const app = express();
app.use(express.json())

// Signup API
app.post("/signup", async (req, res)=>{
    // Creating a new instance of the User model
    const user = new User(req.body);
    
    try{
        await user.save();
        res.send("User added successfully...!")
    }catch(err){
        res.status(400).send("Error saving the user" + err.message)
    }
})


// MongoDB connction
connectDB()
  .then(() => {
    console.log("Database connection successfull...!!!");
    app.listen(7070, () => {
      console.log("Server is running on Port 7070.");
    });
  })
  .catch((err) => {
    console.error("Database connection FAILED...!!!");
  });
