const express = require("express");

const app = express();

// app.use("/product/123", (req,res)=>{
//     console.log(req.query)
// })
// app.use("/product/:id", (req,res)=>{
//     console.log(req.params)
// })

app.use(
  "/test",
  (req, res, next) => {
    // Route handler
    // res.send("1")
    next();
  },
  (req, res) => {
    res.send("2");
  },
);

//
app.use(
  "/home",
  (req, res) => {
    res.send("1");
    next();
  },
  (req, res) => {
    res.send("2");
  },
);

//
app.use(
  "/name",
  (req, res, next) => {
    next();
    res.send("1");
  }, 
  (req, res) => {
    res.send("2");
  },
);

//
app.use(
  "/user",
  (req, res, next) => {
    next();
  },
  (req, res) => {
    res.send("Response-2");
  },
);

//
app.use(
  "/about",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next()
  },
  (req, res, next) => {
    next()
  },
);

//
app.use(
  "/demo",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next()
  },
  (req, res, next) => {
    next()
  },
  (req, res, next) => {
    res.send("4")
  },
);


// We can wrap multiple route handler inside array also

// app.use("/route", handler-1, handler-2, handler-3, handler-4, handler-5)
// // OR
// app.use("/route", [handler-1, handler-2, handler-3, handler-4, handler-5])
// // OR
// app.use("/route", [handler-1, handler-2], handler-3, handler-4, handler-5)
// // OR
// app.use("/route", handler-1, handler-2, [handler-3, handler-4, handler-5])
// // Or any other grouping


app.listen(7070, () => {
  console.log("Server is running on Port 7070.");
});
