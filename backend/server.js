const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

const connectMongoDB = "mongodb://0.0.0.0:27017/book-store/books";

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN stack Application");
});

mongoose
  .connect(connectMongoDB)
  .then(() => {
    console.log(`Database is connected at: ${connectMongoDB}`);
    app.listen(PORT, () => {
      console.log(`Server started at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to Database", error);
  });
