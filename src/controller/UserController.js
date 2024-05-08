const OtpModel = require('../models/OtpModel');
const userModel = require('../models/UsersModel')
const jwt = require('jsonwebtoken');
const SendEmailUitility = require('../uitility/SendEmailUitility');


// cerate a registraion start
exports.Registraion = async (req, res) =>{
  try{
    const reqBody = req.body
    const user = await userModel.create(reqBody)
    res.status(200).json({status:'success', data:user})
  }
  catch(error){
    res.status(400).json({status: 'Failed', data:error.message}) 
  }
}
// cerate a registraion  end

// cerate a login start
exports.Login = async (req, res) =>{
  try{
    const reqBody = req.body
    const user = await userModel.findOne({email:reqBody.email})
    if(!user){
      return res.status(400).json({status:'fail', data:"User Not Found"})
    }
    if(user.password !== reqBody.password){
      res.status(400).json({status: 'Failed', data:'Wrong password'})
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
    res.status(400).json({status: 'Failed', data:error.message})
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
    res.status(400).json({status: 'Failed', data:error.message})
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
      return res.status(200).json({status:'fail', data:"User not found"})
    }else{
      const createOpt = await OtpModel.create({email: email, otp:otp,})
      const sendEmail = SendEmailUitility(email, 'To-do-taskar password verification',`You OTP IS ${otp}`)
      res.status(200).json({status: 'succss', data:'OTP Send Successfully'})
    }
  }
  catch(error){
    res.status(200).json({status: 'Failed', data:error})
  }
}
// emailverificatin end

// otp verifiy start
exports.OtpVerifiy = async (req,res) =>{
  try{
    let email = req.params.email;
    let otp = req.params.otp;
    let status = 0;
    let updateStatus = 1;
    let otpCheck = await OtpModel.aggregate([
      {$match:{email:email, otp:otp}},
      {$count:"total"},
    ]);
    if(otpCheck.length>0){
      let updateOtp = await OtpModel.updateOne({email:email, otp:otp, status:status},{email:email, otp:otp,status:updateStatus})
      res.status(200).json({status:'success', data:"OTP Verified Successfully"})
    }
    else{
      res.status(200).json({status: 'Failed', data:"Invalid OTP"})
    }
  }
  catch(error){
    res.status(200).json({status: 'Failed', data:error})
  }
}



// otp verifiy end

// reset password start
exports.ResetPassword = async (req, res) =>{
  try{
    let email = req.body.email;
    let otp = req.body.otp;
    let updatePassword = req.body.password;
    let updateStatus = 1;
    let otpCheck = await OtpModel.aggregate([
      {$match:{email:email, otp:otp, status:updateStatus}},
      {$count:"total"},
    ]);
    if(otpCheck.length>0){
      let passwordUpdate = await userModel.updateOne({email:email},{ password:updatePassword});
      res.status(200).json({status:'success', data:"Password Reset Successfully"})
    }
    else{
      res.status(200).json({status: 'Failed', data:"OTP Invalid"})
    }
  }
  catch(error){
    res.status(200).json({status: 'Failed', data:error})
  }
}
// reset password end
