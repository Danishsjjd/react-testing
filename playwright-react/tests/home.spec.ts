import { expect, test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/")
})

test("Heading should be visible", async ({ page }) => {
  const heading = page.locator("h1", { hasText: "Vite + React" })
  await expect(heading).toBeVisible()
})

test.describe("Counter", () => {
  test("should functional", async ({ page }) => {
    const counter = page.locator("button")
    await expect(counter).toBeVisible()
    await expect(counter).toHaveText("count is 0")
    await counter.click()
    await expect(counter).toHaveText("count is 1")
  })
})
