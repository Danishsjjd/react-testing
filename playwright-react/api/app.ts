import express, { Request, Response } from "express"
import { Todo } from "./type"
import cors from "cors"

let todos: Todo[] = []

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.get("/get-all", (_, res) => res.json(todos))

app.post("/add", (req: Request, res: Response) => {
  const { task }: { task?: string } = req.body

  if (!task) return res.status(400).json({ error: "Task is required" })

  const newTodo: Todo = {
    id: todos.length + 1,
    task,
    completed: false,
  }

  todos.push(newTodo)
  res.status(201).json(newTodo)
})

app.put("/set-all", (req: Request, res: Response) => {
  const newTodos: Todo[] = Array.isArray(req.body) ? req.body : []

  todos = newTodos || []
  res.status(200).json(todos)
})

app.put("/toggle/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id))

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" })
  }

  todos[todoIndex].completed = !todos[todoIndex].completed
  res.status(200).json(todos[todoIndex])
})

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)
