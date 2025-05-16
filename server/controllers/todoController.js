const Todo = require('../models/todoModel');

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      ...req.body,
      user: req.user.userId,
    });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all todos 
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .select('title completed deadline createdAt')
      .lean();

    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a todo by ID 
const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true, runValidators: true, context: 'query' }
    ).lean();

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a todo by ID
const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    }).lean();

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
  deleteTodo,
};
