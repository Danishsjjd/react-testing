import express, { Request, Response } from "express"
import { Todo } from "./type"

let todos: Todo[] = []

const app = express()
const PORT = 3000

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

// Set all todos
app.put("/set-all", (req: Request, res: Response) => {
  const newTodos: Todo[] = req.body

  if (!Array.isArray(newTodos)) {
    return res.status(400).json({ error: "Invalid data format" })
  }

  todos = newTodos
  res.status(200).json(todos)
})

// Toggle todo completion status
app.put("/toggle/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id))

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" })
  }

  todos[todoIndex].completed = !todos[todoIndex].completed
  res.status(200).json(todos[todoIndex])
})

// Start server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)
