//We need to create the API endpoints for register and login
//this is our express App

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user.js");
const bcrypt = require("bcryptjs");
const secret = bcrypt.genSalt(10);
require("dotenv").config();

app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://127.0.0.1:5173/",
//   })
// );

//connecting mongodb whit our api
//we use .env file to encrypt passwords
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("Good");
});

// we dont want to pass password as a text. We want to encrypt it first.So we install bcryptjs.
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, secret),
  });
});

app.listen(4000);
