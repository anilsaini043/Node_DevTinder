const express = require("express");

const app = express();

app.get("/getUserData", (req, res, next)=>{
    throw new Error("Failing....!");
    res.send("User data sent")
})

// Handle errors. ---  Order matters (err, req, res, next)
app.use("/", (err, req, res, next)=>{
    if(err){
        res.status(500).send(`Something went wrong ---> ${err}`)
    }
})

app.listen(7070, () => {
  console.log("Server is running on Port 7070.");
});
