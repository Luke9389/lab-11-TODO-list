const client = require('../lib/client');
const tasks = require('./tasks.js');

client.connect()
    .then(() => {
        return Promise.all(
            tasks.map(task => {
                return client.query(`
                    INSERT INTO tasks (name, completed)
                    VALUES ($1, $2)
                    RETURNING *;
                `,
                [task.name, task.completed])
                    .then(result => result.rows[0]);
            })
        );
    })
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });