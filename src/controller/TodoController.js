const TodoModel = require('../models/TodoModel');

// create todo start
exports.CreateTodo = async (req,res) => {
  try{
    const reqBody = req.body;
    reqBody.email = req.headers.email;
    const todo = await TodoModel.create(reqBody);
    res.status(200).json({status: 'success', data: todo});
  }
  catch(error) {
    res.status(200).json({status: 'fail', data: error});
  }
}
// create todo end

// update todo start
exports.UpdateTodo = async (req , res) =>{
  try{
    const id = req.params.id;
    const status = req.params.status;
    const query = {_id: id};
    const todo = await TodoModel.updateOne(query, {status: status});
    res.status(200).json({status:'success', data: todo});
  }
  catch(error) {
    res.status(200).json({status: 'fail', data: error});
  }
}
// update todo end

// delete todo start
exports.DeleteTodo = async (req, res) => {
  try{
    const id = req.params.id;
    const query = {_id: id};
    const todo = await TodoModel.deleteOne(query);
    res.status(200).json({status:'success', data: todo});
  }
  catch(error) {
    res.status(200).json({status: 'fail', data: error});
  }
}
// delete todo end
// todo list by status start
exports.TodoListByStatus = async (req, res) => {
  try{
    const status = req.params.status;
    const email = req.headers.email;
    const result = await TodoModel.aggregate(
      [
        {$match:{status:status,email:email}},
        {$project:{_id:1, title:1, description:1, status:1, createdDate:{$dateToString:{format:"%d-%m-%y", date:$createdDate}}}}
      ]
    )
    res.status(200).json({status:'success', data: todo});
  }
  catch(error) {
    res.status(200).json({status: 'fail', data: error});
  } 
}
// todo list by status end

// todo count by status start
exports.TodoCountByStatus = async (req, res) => {
  try{
    const email = req.headers.email;
    const result = await TodoModel.aggregate(
      [
        {$match:{email:email}},
        {$group:{_id:"$status",total:{$count:{}}}}
      ]
    )
    res.status(200).json({status:'success', data: result});
  }
  catch(error) {
    res.status(200).json({status: 'fail', data: error});
  }
}
// todo count by status end


