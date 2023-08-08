
const bcrypt = require('bcryptjs');

const Todos = require('./model')
const AppError = require('../../utils/apperror')



exports.addTodo = async (req, res, next) => {

  try {
    req.body.user = req.user_id;
    const todo = await Todos.create(req.body);

    return res.status(200).json({
      success: true,
      data: todo,
    });

  } catch (error) {
    next(new AppError("Server error", 500));
  }

};


//  get getAllTodos
exports.getAllTodos = async (req, res, next) => {

  // to dos is already available in req due to the protect middleware
  const todos = await Todos.find({user: req.user_id});

  res.status(200).json({
    success: true,
    data: todos,
  });
};


//  get todo
exports.getTodo = async (req, res, next) => {

  // to dos is already available in req due to the protect middleware
  const todo = await Todos.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: todo,
  });
};

// delete todo
exports.deleteTodo = async (req, res, next) => {

  try {

    const todo = await Todos.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      date: todo

    });

  } catch (error) {
    next(new AppError("server error", 500));
  }

};




exports.editTodos = async (req, res, next) => {

  try {
    delete req.body.password;


    const todo = await Todos.findById(req.body.id);

    if (!todo)
      return next(new AppError("There is no todo with the specified id", 400));
    const newone = await Todos.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }

    );
    console.log("Ddalal adlaldadldl")
    console.log(newone)
    return res.status(200).json({
      success: true,
      data: newone
    });

  } catch (error) {
    console.log(error)
    next(new AppError("server error", 500));
  }

};


