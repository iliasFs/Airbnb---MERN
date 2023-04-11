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
const imageDownloader = require("image-downloader");
const multer = require("multer");
const Place = require("./models/place.js");

//for renaming the files from upload(they are not in jpeg)
const fs = require("fs");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

//middleware to display out photos in our browser
app.use("/uploads", express.static(__dirname + "/uploads"));
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
});

//in order to logout we need to delete or reset our cookie
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

//upload the photos in theuploads folder. We will use a library called image-downloader witch we install.

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  if (!link) return null;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads" });
// we use package multer to upload.
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    //we are trying to take the extensnion .webp and append it to the path
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;

    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads", ""));
  }

  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  //so we need to save to our database the new place we added.
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const placeDoc = await Place.create({
      //owner is the user loggen-in. so we grab information from our token above.
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  //we need the user id first so...we grab it from token
  const { token } = req.cookies;
  //decrypting out token now

  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;

    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  //we also need to verify the user through token verification.
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("Ok");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.listen(4000);
