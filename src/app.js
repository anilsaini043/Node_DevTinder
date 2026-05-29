const express = require('express');

const app = express();

app.use("/", (req, res)=>{
    res.send("Hello Node js");
})

app.use("/test", (req, res)=> {
    res.send("TEST Test")
})

app.get("/user", (req, res)=> {
    res.send("USER USER")
})

app.post("/user/2", (req, res)=>{
    res.send("2-User posted")
})

app.delete("/user/2", (req, res)=>{
    res.send("2-User deleted")
})

app.listen(7070, ()=> {
    console.log("Server is running on Port 7070.")
}) 