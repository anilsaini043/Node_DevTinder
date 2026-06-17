const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

// Signup API
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req); // first validate signup data
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); // Bcrypted password
    
    const user = new User({            // Creating a new instance of the User model
      firstName,
      lastName,
      emailId,
      password: passwordHash
    }); 

    await user.save();
    res.send("User added successfully...!");
  } catch (err) {
    res.status(400).send("Error saving the " + err.message);
  }
});

// Get user by email id
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    // It will give only One match
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found...!");
    } else {
      res.send(user);
    }
    // It will give all Matching records

    // const users = await User.find({emailId: userEmail});
    // if(users.length === 0){
    //   res.status(404).send("User not found...!")
    // }else{
    //   res.send(users)
    // }
  } catch (err) {
    res.status(400).send("Something went wrong...!");
  }
});

// Feed api - GET /feed - Get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // For {} --> empty means will fetch all documents lists
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong...!");
  }
});

// Delete user by userId. --> _id = userId
app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId); // findByIdAndDelete({_id=userId}) or findByIdAndDelete(userId) both are same
    res.send("User deleted successfully...!");
  } catch (err) {
    res.status(400).send("Something went wrong...!");
  }
});

// Update user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId; // Getting userId from the url
  const updateData = req.body;
  try {
    // update data sanitization and validation
    const ALLOWED_FIELD_UPDATE = ["photoUrl", "job", "gender", "age", "skills"];
    const isUpdatedAllowed = Object.keys(updateData).every((k) =>
      ALLOWED_FIELD_UPDATE.includes(k),
    );

    if (!isUpdatedAllowed) {
      throw new Error("For these fields update NOT allowed");
    }
    if (updateData.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }

    await User.findByIdAndUpdate({ _id: userId }, updateData, {
      runValidators: true,
    });
    res.send("User updated successfully...!");
  } catch (err) {
    res.status(400).send("Something went wrong...!" + err.message);
  }
});

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
