const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')
const multer = require('multer')
const bodyParser = require('body-parser')
const route = require('./src/routes/api')



app.use(rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100
}))
app.use(cors())
app.use(bodyParser.json())



const uri = `mongodb+srv://arifulislam:<password>@cluster0.gzjuput.mongodb.net/`
const options ={user:"arifulislam",pass:"arifulislam"}
mongoose.connect(uri, options)
.then(()=>{
  console.log("MongoDB connecte")
}).catch((err)=>{
  console.log(err)
})



app.use('/api/v1', route)

app.use("*",(req,res)=>{
res.status(404).json({message:"not found"})
})

module.exports = app