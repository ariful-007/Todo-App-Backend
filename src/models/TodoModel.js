const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {type: String},
    description: {type: String},
    status: {type: String},
    email: {type: String},
    createDate: {type: Date, default: Date.new}
  },
  {versionKey: false}
)

const TodoModel = mongoose.model('Todos', todoSchema); 

module.exports = TodoModel;