import { test, expect } from "@playwright/test"

test("should sum", () => {
  // arrange
  const a = 1,
    b = 3
  // act
  const sum = a + b
  // assert
  expect(sum).toEqual(4)
})

test("Page demo", async ({ page } /* fixtures */) => {
  // test.setTimeout(2 * 1000)
  // fixtures are only created when they are requested

  // arrange
  await page.goto("https://google.com")
  // act
  const input = page.locator("[title=Search]")
  await input.fill("playwright")
  await input.press("Enter")
  await page.waitForURL("https://www.google.com/search?**")
  //   assert
  await expect(page).toHaveTitle("playwright - Google Search")
})
