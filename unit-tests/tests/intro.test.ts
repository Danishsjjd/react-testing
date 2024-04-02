import { factorial, fizzBuzz, max } from "../src/intro"
import { describe, expect, it } from "vitest"

describe("max", () => {
  it("should return the first argument if it's greater", () => {
    expect(max(2, 1)).toBe(2)
  })
  it("should return the second argument if it's greater", () => {
    expect(max(1, 2)).toBe(2)
  })
  it("should return the first argument if both numbers are equal", () => {
    expect(max(2, 2)).toBe(2)
  })
})

describe("fizzBuzz", () => {
  it("should return FizzBuzz if the number is divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz")
  })
  it("should return Fizz if the number is divisible by 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz")
  })
  it("should return Buzz if the number is divisible by 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz")
  })
  it("should return the number as a string if it's not divisible by 3 or 5", () => {
    expect(fizzBuzz(7)).toBe("7")
  })
})

describe("factorial", () => {
  it("should return 1 for 0", () => {
    expect(factorial(0)).toBe(1)
  })
  it("should return 1 for 1", () => {
    expect(factorial(1)).toBe(1)
  })
  it("should return 2 for 2", () => {
    expect(factorial(2)).toBe(2)
  })
  it("should return 6 for 3", () => {
    expect(factorial(3)).toBe(6)
  })
  it("should return undefined for negative number", () => {
    expect(factorial(-2)).toBe(undefined)
  })
})
