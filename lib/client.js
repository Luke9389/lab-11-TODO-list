// make sure .env has been loaded
require('dotenv').config();
// "require" pg (after `npm i pg`)
const pg = require('pg');
// Use the pg Client
const Client = pg.Client;
// note: you will need to create the database!
const client = new Client(process.env.DATABASE_URL);
// export the client
client.connect()
    // provide success/failure log based on connection working
    .then(() => console.log('connected to db', process.env.DATABASE_URL))
    .catch(err => console.error('connection error', err));

// listen for errors on the connection and log them
client.on('error', err => {
    console.error('\n**** DATABASE ERROR ****\n\n', err);
});


module.exports = client;
