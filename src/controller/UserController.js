
const userModel = require('../models/UsersModel')
const jwt = require('jsonwebtoken');


// cerate a registraion start
exports.Registraion = async (req, res) =>{
  try{
    const data = req.body
    const user = await userModel.create(data)
    res.status(200).json({status:'success', data:user})
  }
  catch(error){
    res.status(400).json({status: 'Failed', message:error.message})
  }
}
// cerate a registraion  end


// cerate a login start

exports.Login = async (req, res) =>{
  try{
    const reqBody = req.body
    const user = await userModel.findOne({email:reqBody.email})
    if(!user){
      return res.status(400).json({status:'fail', message:"User not found"})
    }
    if(user.password !== reqBody.password){
      res.status(400).json({status: 'Failed', message:'wrong password'})
    }
    else{
      let payload = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60), 
        data: user['email']
      } 
      let token = jwt.sign(payload, '123456')
      res.status(200).json({status:'success', data:user, token:token})
    }
    
  }
  catch(error){
    res.status(400).json({status: 'Failed', message:error.message})
  }
}

// cerate a login end

// update profile start

exports.UpdateProfile = async (req, res) =>{
  try{
    let email = req.headers.email;
    let reqBody = req.body;
    let query = {email: email};
    const user = await userModel.updateOne(query, reqBody);
    res.status(200).json({status:'success', data: user})
  }
  catch(error){
    res.status(400).json({status: 'Failed', message:error.message})
  }
}
// update profile end
