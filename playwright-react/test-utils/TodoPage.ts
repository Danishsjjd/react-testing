import { APIRequestContext, Page, expect } from "@playwright/test"

const pageUrl = "http://localhost:5173/todo",
  apiUrl = "http://localhost:3000"

export class TodoPage {
  constructor(private readonly page: Page) {}

  async clearTodos(request: APIRequestContext) {
    await request.put(`${apiUrl}/set-all`)
  }

  async visit() {
    await this.page.goto(pageUrl)
  }

  async clearTodoAndVisit(request: APIRequestContext) {
    await this.clearTodos(request)
    await this.visit()
  }

  get newTodoInput() {
    return this.page.getByRole("textbox")
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text)
    // remove `await` intentionally, so we can await response from add call
    this.newTodoInput.press("Enter")
    try {
      const addResponse = await this.page.waitForResponse(/add/, {
        timeout: 5000,
      })
      addResponse.ok() && (await expect(this.newTodoInput).toHaveValue(""))
    } catch (e) {
      console.log("unable to catch add todo response")
    }
  }

  async expectTodos(todos: string[]) {
    await expect(this.page.locator("ul li span")).toHaveText(todos)
  }
}
