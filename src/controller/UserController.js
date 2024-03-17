
const userModel = require('../models/UsersModel')


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
    const data = req.body
    const user = await userModel.findOne({email:data.email})
    if(!user){
      return res.status(400).json({status:'fail', message:"User not found"})
    }
    if(user.password !== data.password){
      res.status(400).json({status: 'Failed', message:'wrong password'})
    }
    res.status(200).json({status:'success', data:user})
  }
  catch(error){
    res.status(400).json({status: 'Failed', message:error.message})
  }
}

// cerate a login end