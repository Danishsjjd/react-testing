import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  test,
} from "vitest"
import { Stack, canDrive, createProduct, validateUserInput } from "../src/core"

describe("Compare approaches", () => {
  test("string", () => {
    const results = "file not found."
    // Loose (too general)
    expect(results).toBeDefined()

    // Tight (too specific)
    expect(results).toBe("file not found.")

    // Correct
    expect(results).toMatch(/not found/i)
  })
  test("array", () => {
    const results = [1, 2, 3]
    // Loose
    expect(results).toBeDefined()

    // Tight
    expect(results).toEqual([1, 2, 3])
    expect(results).length(3)

    // Correct
    expect(results).toEqual(expect.arrayContaining([1, 2, 3]))
    // can be correct in some cases
    expect(results.length).toBeGreaterThan(0)
  })
  test("object", () => {
    const results = { a: 1, b: 2, c: 3 }

    // Loose
    expect(results).toBeDefined()

    // Tight
    expect(results).toEqual({ a: 1, b: 2, c: 3 })

    // Correct
    expect(results).toEqual(expect.objectContaining({ a: 1 }))
    expect(results).toHaveProperty("a")
    expect(typeof results.a).toBe("number")
  })
})

describe("validateUserInput", () => {
  it("should return error if username is invalid", () => {
    expect(validateUserInput("Jo", 20)).toMatch(/invalid/i)
    expect(validateUserInput("A".repeat(256), 18)).toMatch(/invalid/i)
  })

  it("should return error if age is not allowed", () => {
    expect(validateUserInput("Jon", 17)).toMatch(/invalid age/i)
    expect(validateUserInput("Jon", 200)).toMatch(/invalid age/i)
  })

  it("should return error if both username & age is invalid", () => {
    const results = validateUserInput("Jo", 17)
    expect(results).toMatch(/invalid username/i)
    expect(results).toMatch(/invalid age/i)
  })

  it("should be success if given valid input", () => {
    expect(validateUserInput("Jon", 18)).toMatch(/success/i)
  })
})

describe("canDrive", () => {
  // parameterized tests
  it.each<{ age: number; country: "US" | "UK"; result: boolean }>([
    { age: 15, country: "US", result: false },
    { age: 16, country: "US", result: true },
    { age: 17, country: "US", result: true },
    { age: 16, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
    { age: 18, country: "UK", result: true },
  ])(
    "should return $result for ($age, $country)",
    ({ age, country, result }) => {
      expect(canDrive(age, country)).toBe(result)
    }
  )
})

describe("test suite", () => {
  beforeEach(() => {
    console.log("beforeEach", new Date().getMilliseconds())
  })
  afterEach(() => {
    console.log("afterEach", new Date().getMilliseconds())
  })
  beforeAll(() => {
    console.log("beforeAll", new Date().getMilliseconds())
  })
  afterAll(() => {
    console.log("afterAll", new Date().getMilliseconds())
  })

  it("test case 1", () => {})
  it("test case 2", () => {})
})

describe("Stack", () => {
  const stack = new Stack()
  beforeEach(() => {
    stack.clear()
  })

  it("push should add an item", () => {
    stack.push(1)

    expect(stack.size()).toBe(1)
  })

  it.each<{
    method: "pop" | "peek"
    item: unknown
    size: number
    name: string
  }>([
    { method: "pop", item: 2, size: 1, name: "remove last item" },
    { method: "peek", item: 2, size: 2, name: "return last item" },
  ])("$method should $name", ({ item, method, size }) => {
    stack.push(1)
    stack.push(2)

    const stackItem = stack[method]()

    expect(stackItem).toBe(item)
    expect(stack.size()).toBe(size)
  })

  it("pop should throw error when stack empty", () => {
    expect(stack.pop).toThrowError(/empty/i)
  })
  it("peek should throw error when stack empty", () => {
    expect(stack.peek).toThrowError(/empty/i)
  })
  it("isEmpty should return true when empty", () => {
    expect(stack.isEmpty()).toBe(true)
  })
  it("isEmpty should return false when not empty", () => {
    stack.push(1)

    expect(stack.isEmpty()).toBe(false)
  })
  it("size should return the number of items in the stack", () => {
    stack.push(1)

    expect(stack.size()).toBe(1)
  })
  it("clear should remove all items from the stack", () => {
    stack.push(1)
    stack.clear()

    expect(stack.size()).toBe(0)
  })
})

describe("createProduct", () => {
  it("should return an error if name is empty", () => {
    expect(createProduct({ name: "", price: 1 }).error?.code).toBe(
      "invalid_name"
    )
  })
  it("should return an error if price is negative", () => {
    expect(createProduct({ name: "product", price: -1 }).error?.code).toBe(
      "invalid_price"
    )
  })
  it("should create product with correct name & price", () => {
    expect(createProduct({ name: "product", price: 1 }).success).toBe(true)
  })
})
