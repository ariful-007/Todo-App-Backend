
const userModel = require('../models/UsersModel')
// cerate exemple start
exports.createUser = async (req, res) =>{
  const data = req.body
  
  try{
    const result = await userModel.create(data)
    res.status(200).json({status: 'succss', message:"User Create Succssfully" , data:result})
  }
  catch(error){
    res.status(400).json({status: 'Failed', message:error.message})
  }
}
// cerate exemple end