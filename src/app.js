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

// Get user by email id
app.get("/user", async (req, res)=>{
  const userEmail = req.body.emailId;
  try{
    // It will give only One match
    const user = await User.findOne({emailId: userEmail});
    if(!user){
      res.status(404).send("User not found...!")
    }else{
      res.send(user)
    }
    // It will give all Matching records

    // const users = await User.find({emailId: userEmail});
    // if(users.length === 0){
    //   res.status(404).send("User not found...!")
    // }else{
    //   res.send(users)
    // }
  }catch(err){
    res.status(400).send("Something went wrong...!")
  }
})

// Feed api - GET /feed - Get all the users from the database
app.get("/feed", async (req, res)=>{
  try{
    const users = await User.find({}) // For {} --> empty means will fetch all documents lists
    res.send(users);
  }catch(err){
    res.status(400).send("Something went wrong...!")
  }
})

// Delete user by userId. --> _id = userId
app.delete("/delete", async (req, res)=> {
  const userId = req.body.userId;
  try{
    await User.findByIdAndDelete(userId); // findByIdAndDelete({_id=userId}) or findByIdAndDelete(userId) both are same
    res.send("User deleted successfully...!")
  }catch(err){
    res.status(400).send("Something went wrong...!")
  }
})

// Update user 
app.patch("/user", async (req, res)=> {
  const userId = req.body.userId;
  const updateData = req.body;
  try{
    await User.findByIdAndUpdate({_id: userId}, updateData, {
      runValidators : true
    }
    );
    res.send("User updated successfully...!")
  }catch(err){
    res.status(400).send("Something went wrong...!"+ err.message)
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
    console.error("Database connection FAILED...!!!", err);
  });
