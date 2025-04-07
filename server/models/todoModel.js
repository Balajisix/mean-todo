const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deadline: { type: Date },
  notified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);
