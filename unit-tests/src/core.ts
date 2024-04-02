// Positive and negative testing
export function validateUserInput(username: string, age: number) {
  const errors: string[] = []

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 255
  )
    errors.push("Invalid username")

  if (typeof age !== "number" || age < 18 || age > 100)
    errors.push("Invalid age")

  return errors.length === 0 ? "Validation successful" : errors.join(", ")
}

// Boundary testing
export function canDrive(age: number, countryCode: "US" | "UK") {
  const legalDrivingAge = {
    US: 16,
    UK: 17,
  }

  if (!legalDrivingAge[countryCode]) {
    return "Invalid country code"
  }

  return age >= legalDrivingAge[countryCode]
}

// Setup and teardown
export class Stack<T> {
  items: T[]

  constructor() {
    this.items = []
  }

  push(item: T) {
    this.items.push(item)
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty")
    }
    return this.items.pop()
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty")
    }
    return this.items[this.items.length - 1]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  clear() {
    this.items = []
  }
}

// Setup and teardown
export function createProduct(product: { name: string; price: number }) {
  if (!product.name)
    return {
      success: false,
      error: { code: "invalid_name", message: "Name is missing" },
    }

  if (product.price <= 0)
    return {
      success: false,
      error: { code: "invalid_price", message: "Price is missing" },
    }

  return { success: true, message: "Product was successfully published" }
}
