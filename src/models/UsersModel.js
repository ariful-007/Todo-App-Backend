const mongoose = require('mongoose');



const userSchema = new mongoose.Schema(
  // exemple create start
  {
    email: { type: 'string', unique: true },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    password: { type: 'string' },
    profilePicture: { type: 'string' },
    createdDate: { type:'date', default: Date.now },
  },
  { versionKey: false }
  // exemple create end
)

const userModel = mongoose.model('users', userSchema)

module.exports = userModel