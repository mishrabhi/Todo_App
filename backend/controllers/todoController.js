const Todo = require('../models/Todo');

// GET all todos with optional filtering
exports.getTodos = async (req, res, next) => {
  try {
    const { filter } = req.query;
    let query = {};

    if (filter === 'completed') {
      query.completed = true;
    } else if (filter === 'pending') {
      query.completed = false;
    }

    const todos = await Todo.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

// GET single todo by ID
exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE a new todo
exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const todo = await Todo.create({
      title,
      description,
      dueDate,
    });

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE a todo
exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;

    let todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (completed !== undefined) todo.completed = completed;

    todo = await todo.save();

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE a todo
exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};
