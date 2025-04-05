const Todo = require('../models/todoModel');

// Create a new todo
const createTodo = async(req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.user.userId,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a todo by id
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.userId });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    Object.assign(todo, req.body);
    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a todo by id
const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
}