
const express = require('express');
const router = require('./src/routes/api');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const app = express();
const mongoose  = require('mongoose');
const rateLimit = require('express-rate-limit');



app.use(rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(bodyParser.json());
app.use(cors());

// Database connection start
const uri = "mongodb+srv://arifulislam:arifulislam@cluster0.gzjuput.mongodb.net/TodoApp?retryWrites=true&w=majority&appName=Cluster0";
const options ={user:"arifulislam", pass:"arifulislam"}

mongoose.connect(uri, options)
  .then(() => {
    console.log('DB connected');
  }).catch((error) => {
    console.log(error);
  });
// Database connection end

// Router implementation start
app.use("/api/v1", router);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});
// Router implementation end

module.exports = app;

