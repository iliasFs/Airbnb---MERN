//We need to create the API endpoints for register and login
//this is our express App

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user.js");
const bcrypt = require("bcryptjs");
const secret = bcrypt.genSaltSync(10);
const jwtSecret = "wertwertw45w5t54wgfrdgsfgs45";
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

//connecting mongodb whit our api
//we use .env file to encrypt passwords
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("Good");
});

// we dont want to pass password as a text. We want to encrypt it first.So we install bcryptjs.
//user creation is asynchronous operation. so async await
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, secret),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({
    email,
  });

  if (userDoc) {
    const passwordOk = bcrypt.compareSync(password, userDoc.password);

    if (passwordOk) {
      //we sign a cookie
      jwt.sign(
        { name: userDoc.name, email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;

          //token coming from above jwt.sign
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("wrong password. Try again");
    }
  } else {
    res.json("User not found");
  }
});

//used into the User Context to grab user information
app.get("/profile", (req, res) => {
  //so we grab the cookie to get the user information
  //to read cookies we need to install cookies parser -and of course the middlware
  const { token } = req.cookies;
  if (token) {
    //data is the user information
    jwt.verify(token, jwtSecret, {}, (error, data) => {
      if (error) throw error;
      res.json(data);
    });
  } else {
    res.json(null);
  }
  res.json({ token });
});

app.listen(4000);
