
const express = require('express');
const router = require('./src/routes/api');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const app = express();

const { default: mongoose } = require('mongoose');

app.use(bodyParser.json());
app.use(cors());

// Database connection start
const uri = "mongodb+srv://arifulislam:arifulislam@cluster0.gzjuput.mongodb.net/myapp?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connected');
  }).catch((error) => {
    console.log("error", error.message);
  });
// Database connection end

// Router implementation start
app.use("/api/v1", router);
app.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});
// Router implementation end

module.exports = app;

