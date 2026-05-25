const express = require('express');
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const router = express.Router();

// GET all todos (with optional filter)
router.get('/', getTodos);

// GET single todo
router.get('/:id', getTodoById);

// CREATE new todo
router.post('/', createTodo);

// UPDATE todo
router.put('/:id', updateTodo);

// DELETE todo
router.delete('/:id', deleteTodo);

module.exports = router;
