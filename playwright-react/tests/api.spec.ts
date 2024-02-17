import { APIRequestContext, expect, test } from "@playwright/test"
import { Todo } from "../api/type"

const apiUrl = "http://localhost:3000"

async function setAll(request: APIRequestContext, data: Todo[]) {
  const response = await request.put(`${apiUrl}/set-all`, { data })
  return {
    response,
    json: (await response.json()) as Todo[],
  }
}

async function add(request: APIRequestContext, data: Pick<Todo, "task">) {
  const response = await request.post(`${apiUrl}/add`, { data })
  return {
    response,
    json: (await response.json()) as Todo,
  }
}

async function getAll(request: APIRequestContext) {
  const response = await request.get(`${apiUrl}/get-all`)
  return {
    response,
    json: (await response.json()) as Todo[],
  }
}

test.beforeEach(async ({ request }) => {
  await setAll(request, [])
})

test("setAll should be able to clear all todos", async ({ request }) => {
  const getResponse = await request.get(`${apiUrl}/get-all`)
  expect(getResponse.ok()).toBeTruthy()
  expect(getResponse.status()).toBe(200)
  expect(await getResponse.json()).toEqual([])
})

test("add should work", async ({ request }) => {
  const { json, response } = await add(request, { task: "test" })
  const assertResponse = {
    id: expect.any(Number),
    task: "test",
    completed: false,
  }

  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(201)
  expect(json).toEqual(assertResponse)

  const getResponse = await getAll(request)

  expect(getResponse.json[0]).toEqual(assertResponse)
})
