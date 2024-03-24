
const OtpModel = require('../models/OtpModel');
const userModel = require('../models/UsersModel')
const jwt = require('jsonwebtoken');
const SendEmailUitility = require('../uitility/SendEmailUitility');
const { response } = require('express');


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
      // projection
      const responsData = {email: user['email'], firstName: user['firstName'], lastName: user['lastName'], photo: user['profilePicture']}
      res.status(200).json({status:'success', data:responsData, token:token})
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

// profile details start

exports.ProfileDetails = async (req, res) =>{
  try{
    let email = req.headers.email;
    let query = {email: email};
    const user = await userModel.findOne(query);
    res.status(200).json({status:'success', data: user})
  }
  catch(error){
    res.status(200).json({status: 'Failed', data:error})
  }
}
// profile details end

// emailverificatin start

exports.EmailVerification = async (req, res) =>{
  try{
    let email = req.params.email;
    let query = {email: email};
    let otp = Math.floor(10000 + Math.random() * 900000)
    const user = await userModel.findOne(query);
    if(!user){
      return res.status(200).json({status:'fail', message:"User not found"})
    }else{
      const createOpt = await OtpModel.create({email: email, otp:otp,})
      const sendEmail = SendEmailUitility(email, 'To-do-taskar password verification',`You OTP Is ${otp}`)
      res.status(200).json({status: 'succss', message:'OTP Send Successfully'})
    }
  }
  catch(error){
    res.status(200).json({status: 'Failed', data:error})
  }
}
// emailverificatin end
