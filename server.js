// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

// Database Client
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

app.get('/api/tasks', (req, res) => {
    client.query(`
        SELECT *
        FROM tasks
        ORDER BY name;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/tasks', (req, res) => {
    const task = req.body;
    client.query(`
        INSERT INTO tasks (name, completed)
        VALUES ($1, $2)
        RETURNING *;
    `,
    [task.name, task.completed]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Task "${task.name}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = req.body;

    client.query(`
        UPDATE tasks
        SET    name = $2,
               completed = $3
        WHERE  id = $1
        RETURNING *;
    `,
    [id, task.name, task.completed]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Type "${task.name}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});