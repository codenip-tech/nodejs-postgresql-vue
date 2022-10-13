const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'postgresql',
    database: 'postgres',
    password: 'postgres',
})

module.exports = { client }
