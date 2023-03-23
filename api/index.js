//We need to create the API endpoints for register and login
//this is our express App

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://127.0.0.1:5173/",
//   })
// );

app.get("/test", (req, res) => {
  res.json(console.log("test ok"));
});

app.post('/register', (req,res)=>{
const {name,email,password} = req.body
res.json({name,email,password})
})

app.listen(4000);
