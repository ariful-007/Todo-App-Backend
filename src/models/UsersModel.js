const mongoose = require('mongoose');
const userSchema = new mongoose.Schema( 
  // exemple bitore gula start
  {
    userName:{type: 'string', required: true},
    password:{type:'string', required: true},
    email:{type: 'string', required: true, unique: true},
  },
  {versionKey: false}
  // exemple bitore gula end
)

const userModel = mongoose.model('users', userSchema)

module.exports = userModel