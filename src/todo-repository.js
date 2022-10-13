const { client } = require("./database");

class NotFoundError extends Error {}

class TodoRepository {
    async findAll() {
        const result = await client.query('SELECT id, name, is_done FROM todos ORDER BY id DESC')
        return result.rows.map((r) => ({
            id: r.id,
            done: r.is_done,
            name: r.name,
        }))
    }

    async create({ name }) {
        await client.query('INSERT INTO todos (name, is_done) VALUES ($1, false)', [name])
    }

    async deleteOne(id) {
        const result = await client.query('DELETE FROM todos WHERE id = $1', [id])
        if (result.rowCount !== 1) {
            throw new NotFoundError('Failed to delete')
        }
    }

    async updateDone(id, isDone) {
        await client.query('UPDATE todos SET is_done = $1 WHERE id = $2', [isDone, id])
    }
}

module.exports = { todoRepository: new TodoRepository(), NotFoundError }
