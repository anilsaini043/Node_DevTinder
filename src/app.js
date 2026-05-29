const express = require('express');

const app = express();
app.use("/about", (req, res)=>{
    res.send("I am about")
})
app.use("/", (req, res)=>{
    res.send("Hello Node js");
})



app.listen(7070, ()=> {
    console.log("Server is running on Port 7070.")
}) 