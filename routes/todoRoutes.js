const express = require('express');
const router = express.Router();
const Todo = require('../Todo');

// Get All Todos
router.get('/all', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add New Todo
router.post('/add', async (req, res) => {
    try {
        const { name } = req.body;
        const newTodo = new Todo({ name });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Todo
router.put('/update/:id', async (req, res) => {
    try {
        const { name, completed } = req.body; 
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { name, completed }, { new: true });
        
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Edit Todo
router.patch('/edit/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        todo.name = name;
        todo.editedAt = new Date();
        await todo.save();  

        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Delete Todo
router.delete('/delete/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Reset All Todos
router.delete('/reset', async (req, res) => {
    try {
        await Todo.deleteMany({});
        res.json({ message: 'All tasks deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
