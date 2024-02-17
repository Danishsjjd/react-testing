import { createFileRoute } from "@tanstack/react-router"

const Todo = () => {
  return (
    <div>
      <p>Todo app will be here</p>
    </div>
  )
}

export const Route = createFileRoute("/todo")({
  component: Todo,
})

export default Todo
