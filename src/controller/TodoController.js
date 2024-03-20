const TodoModel = require('../models/TodoModel');


// create todo start
exports.CreateTodo = async (req,res) =>{
  try{
    const reqBody = req.body;
    reqBody.email = req.headers.email;
    const todo = await TodoModel.create(reqBody);
    res.status(200).json({status: 'success', data: todo});
  }catch(error) {
    res.status(200).json({status: 'fail', data: error});
  }
}
// create todo end

// update todo start
// update todo end

// delete todo start
// delete todo end


