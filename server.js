require('dotenv').config();  

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;  

if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file");
    process.exit(1); 
}

// MongoDB Connection
mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

// Server Start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
