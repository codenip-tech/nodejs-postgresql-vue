import { client } from './database'
const express = require('express')
const app = express()

app.use(express.static(`${__dirname}/../public`))
app.use(express.json())
const controller = require("./controller");

app.use('/api/todo', controller)

async function start() {
    await client.connect()
    app.listen(8200)
}

start().catch((error) => {
    console.error('Something failed', error)
})
