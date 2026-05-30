const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth.js")

const app = express();

// Handle Auth midlleware for all GET, POST, DELETE, PATCH ... PUT requests
app.use("/admin", adminAuth);
app.use("/user", userAuth);

// Admin routes
app.get("/admin/getAdminData", (req, res) => {
    res.send("Admin data sent");
});

app.get("/admin/deleteAdmin", (req, res) => {
    res.send("Admin Deleted");
});

// User routes
app.get("/user/getUser", (req, res)=>{
    res.send("User data sent")
})
app.post('/user/newUser', (req, res)=>{
    res.send("New user created")
})

app.listen(7070, () => {
  console.log("Server is running on Port 7070.");
});
