
require('dotenv').config();
const express = require('express');
const path = require('path');


const app = express();

// Middleware 
app.use(express.json());

// Custom middleware to log requests
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET endpoint
app.get('/My Week 2 API!', (req, res) => {
    res.send('My Week 2 API!');
});

// POST endpoint - Create user
app.post('/user', (req, res) => {
    const { name, email } = req.body;
    
    // Error handling for missing data
    if (!name || !email) {
        return res.status(400).json({
            error: 'Missing required fields',
            message: 'Both name and email are required'
        });
    }
    
    res.json({
        message: `Hello, ${name}!`,
        email: email
    });
});

// GET endpoint - Get user by ID
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} profile`);
});

// Error handling for 404 - Route not found
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: 'The requested endpoint does not exist'
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`- Test GET /My Week 2 API!`);
    console.log(`- Test POST /user`);
    console.log(`- Test GET /user/:id`);
});