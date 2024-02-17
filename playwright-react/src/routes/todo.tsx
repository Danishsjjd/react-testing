import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Todo as TodoType } from "../../api/type"

const api = `http://localhost:3000`
const Todo = () => {
  const [task, setTask] = useState("")
  const [todos, setTodos] = useState<TodoType[]>([])

  useEffect(() => {
    fetch(`${api}/get-all`)
      .then((data) => data.json())
      .then((todos) => setTodos(todos))
  }, [])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetch(`${api}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task }),
          })
            .then((data) => data.json())
            .then((data) => {
              setTodos((pre) => [...pre, data])
              setTask("")
            })
        }}
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </form>
      <button
        onClick={() =>
          fetch(`${api}/set-all`, { method: "PUT" }).then(
            (res) => res.ok && setTodos([])
          )
        }
      >
        clear all
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span>{todo.task}</span>
            <button
              onClick={() =>
                fetch(`${api}/toggle/${todo.id}`, { method: "PUT" })
                  .then(async (data) => (await data.json()) as TodoType)
                  .then((data) =>
                    setTodos((pre) =>
                      pre.map((e) => (e.id === data.id ? data : e))
                    )
                  )
              }
            >
              toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Route = createFileRoute("/todo")({
  component: Todo,
})

export default Todo
