import { test, expect } from "@playwright/test"

test("should sum", () => {
  // AAA test
  // arrange
  const a = 1,
    b = 3
  // act
  const sum = a + b
  // assert
  expect(sum).toEqual(4)
})

// The real google.com serves consent/anti-bot pages to headless browsers on CI,
// so the demo stubs it out and stays deterministic.
const googleHome = `<!DOCTYPE html>
<html>
  <head><title>Google</title></head>
  <body>
    <form action="/search" method="GET">
      <input title="Search" name="q" />
      <button type="submit">Google Search</button>
    </form>
  </body>
</html>`

const googleResults = (query: string) => `<!DOCTYPE html>
<html>
  <head><title>${query} - Google Search</title></head>
  <body><h1>Results for ${query}</h1></body>
</html>`

test("Page demo", async ({ page } /* fixtures */) => {
  // fixtures are only created when they are requested

  // test.setTimeout(2 * 1000)

  // AAA test
  // arrange
  await page.route(/^https:\/\/www\.google\.com\//, async (route) => {
    const url = new URL(route.request().url())
    await route.fulfill({
      contentType: "text/html",
      body:
        url.pathname === "/search"
          ? googleResults(url.searchParams.get("q") ?? "")
          : googleHome,
    })
  })
  await page.goto("https://www.google.com")
  // act
  const input = page.locator("[title=Search]")
  await input.fill("playwright")
  await input.press("Enter")
  await page.waitForURL("https://www.google.com/search?**")
  //   assert
  await expect(page).toHaveTitle("playwright - Google Search")
})
