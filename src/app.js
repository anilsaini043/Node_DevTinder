const express = require('express');

const app = express();

// Matches /ab or /abc  ---  {}. use for optional
app.get("/a{b}c", (req, res)=> {
    res.send("{} Matches /ab, /abc")
})

// Makes 'b' repeatable (0 or more times)
app.get("/ab*c", (req, res) => {
    res.send("*Matches: ac, abc, abbc, abbbc...")
})

// Makes 'y' required (1 or more times)
app.get("/xy:z", (req, res) => {
    res.send("+Matches: xyz, xyyz, xyyyz...")
})

app.listen(7070, ()=> {
    console.log("Server is running on Port 7070.")
}) 