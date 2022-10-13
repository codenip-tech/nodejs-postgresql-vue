const express = require("express");
const router = express.Router()
const { todoRepository, NotFoundError } = require('./todo-repository')

router.get('/', async (req, res) => {
    const todos = await todoRepository.findAll()
    res.json(todos)
})

router.post('/', async (req, res) => {
    const body = req.body
    await todoRepository.create({ name: body.name })
    const todos = todoRepository.findAll()
    res.json(todos)
})

router.delete(`/:id`, async (req, res) => {
    const id = req.params.id
    try {
        await todoRepository.deleteOne(id)
        res.status(204).send()
    } catch (e) {
        if (e instanceof NotFoundError) {
            res.status(404).send('Todo not found')
        } else {
            throw e
        }
    }
})

router.patch(`/:id`, async (req, res) => {
    const id = req.params.id
    const body = req.body
    await todoRepository.updateDone(id, body.done)
    res.status(204).send()
})

module.exports = router
