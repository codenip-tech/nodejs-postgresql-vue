import { Todo } from "./models/todo";

const { client } = require("./database");

export class NotFoundError extends Error {}

type QueryResult<RowType> = {
    rows: RowType[]
}

type TodoRow = { id: number, name: string, is_done: boolean }
type CreateInput = { name: string }

interface TodoRepository {
    findAll(): Promise<Todo[]>
    create(input: CreateInput): Promise<void>
    deleteOne(id: number): Promise<void>
    updateDone(id: number, isDone: boolean): Promise<void>
}

class PostgresqlTodoRepository implements TodoRepository {
    async findAll(): Promise<Todo[]> {
        const result: QueryResult<TodoRow> = await client.query('SELECT id, name, is_done FROM todos ORDER BY id DESC')
        return result.rows.map(r => ({
            id: r.id,
            done: r.is_done,
            name: r.name,
        }))
    }

    async create({ name }: CreateInput): Promise<void> {
        await client.query('INSERT INTO todos (name, is_done) VALUES ($1, false)', [name])
    }

    async deleteOne(id: number): Promise<void> {
        const result = await client.query('DELETE FROM todos WHERE id = $1', [id])
        if (result.rowCount !== 1) {
            throw new NotFoundError('Failed to delete')
        }
    }

    async updateDone(id: number, isDone: boolean): Promise<void> {
        await client.query('UPDATE todos SET is_done = $1 WHERE id = $2', [isDone, id])
    }
}

export const todoRepository = new PostgresqlTodoRepository() as TodoRepository
