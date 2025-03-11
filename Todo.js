const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    editedAt: { type: Date }
});

module.exports = mongoose.model('Todo', TodoSchema);
