import test from "@playwright/test"
import { TodoPage } from "../test-utils/TodoPage"

test.beforeEach(async ({ request, page }) => {
  await new TodoPage(page).clearTodoAndVisit(request)
})

test("should be able to add todos", async ({ page }) => {
  const todosPage = new TodoPage(page)

  await todosPage.addTodo("test")
  await todosPage.expectTodos(["test"])

  await todosPage.addTodo("test1")
  await todosPage.expectTodos(["test", "test1"])
})
