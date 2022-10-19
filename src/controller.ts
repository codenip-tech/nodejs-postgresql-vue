import { Router, Request, Response } from 'express';
import { todoRepository, NotFoundError } from './todo-repository'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const todos = await todoRepository.findAll()

    res.json(todos)
})

router.post('/', async (req: Request<any, any, { name: string }>, res: Response) => {
    const body = req.body
    await todoRepository.create({ name: body.name })
    const todos = todoRepository.findAll()
    res.json(todos)
})

router.delete(`/:id`, async (req: Request<{ id: string }>, res: Response) => {
    const id = parseInt(req.params.id)
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

router.patch(`/:id`, async (req: Request<{ id: string }>, res: Response) => {
    const id = parseInt(req.params.id)
    const body = req.body
    await todoRepository.updateDone(id, body.done)
    res.status(204).send()
})

export default router
