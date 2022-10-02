const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Blogroute = require('./routes/Blog')
const Authroute = require('./routes/Auth')
const app = express();

//connect cloud database
mongoose.connect(process.env.DATEBASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => {
    console.log("เชื่อมกับฐานข้อมูลต่อเรียบร้อย");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
app.use('/api',Blogroute)
app.use('/api',Authroute)


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`start server in port ${port}`);
});