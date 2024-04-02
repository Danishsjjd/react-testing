import { beforeEach, describe, expect, it, test, vi } from "vitest"
import {
  getDiscount,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from "../src/mocking"
import { getShippingQuote } from "../src/libs/shipping"
import { trackPageView } from "../src/libs/analytics"
import { sendEmail } from "../src/libs/email"
import { charge } from "../src/libs/payment"
import security from "../src/libs/security"

vi.mock("../src/libs/shipping")
vi.mock("../src/libs/analytics")
vi.mock("../src/libs/payment")
vi.mock("../src/libs/email", async (importOriginal) => {
  const originalModule = await importOriginal<object>()
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  }
})
describe("test suite", () => {
  test("test case", async () => {
    const sendText = vi.fn()

    sendText.mockResolvedValue({ result: "ok" })
    const results = await sendText()

    expect(sendText).toHaveBeenCalledOnce()
    expect(results?.result).match(/ok/i)
  })
})

describe("getShippingInfo", () => {
  it("should return shipping unavailable if quote not found", () => {
    expect(getShippingInfo("Pakistan")).toMatch(/unavailable/i)
  })
  it("should return the shipping details when quote found", () => {
    const quote = { cost: 10, estimatedDays: 2 }
    vi.mocked(getShippingQuote).mockReturnValue(quote)

    const result = getShippingInfo("Pakistan")

    expect(result).toMatch("$10")
    expect(result).toMatch(/2 days/i)
    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i)
  })
})

describe("renderPage", () => {
  it("should return correct content", async () => {
    const result = await renderPage()

    expect(result).toMatch(/content/i)
  })

  it("should call analytics", async () => {
    await renderPage()

    expect(trackPageView).toHaveBeenCalledWith("/home")
  })
})

describe("submitOrder", () => {
  const order = { totalAmount: 10 }
  const creditCard = { creditCardNumber: "1234" }

  it("should charge the customer", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" })

    await submitOrder(order, creditCard)

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount)
  })

  it("should return success when payment is successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" })

    const result = await submitOrder(order, creditCard)

    expect(result).toEqual({ success: true })
  })

  it("should return success when payment is successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" })

    const result = await submitOrder(order, creditCard)

    expect(result).toEqual({ success: false, error: "payment_error" })
  })
})

describe("signUp", () => {
  const email = "name@domain.com"

  beforeEach(() => {
    // vi.mocked(sendEmail).mockClear() // clear all information about every call
    // vi.mocked(sendEmail).mockReset() // same as mockClear, but also clear implementation to empty function
    // vi.mocked(sendEmail).mockRestore() // similar to mockClear, but instead of setting the inner function to empty function, it restore the original implementation
  })

  it("should return false if email is not valid", async () => {
    const result = await signUp("a")

    expect(result).toBe(false)
  })

  it("should return true if email is valid", async () => {
    const result = await signUp(email)

    expect(result).toBe(true)
  })

  it("should send the welcome email if email is valid", async () => {
    await signUp(email)

    expect(sendEmail).toHaveBeenCalledOnce()
    const args = vi.mocked(sendEmail).mock.calls[0]
    expect(args[0]).toBe(email)
    expect(args[1]).toMatch(/welcome/i)
  })
})

describe("login", () => {
  it("should email the one-time login code", async () => {
    const email = "name@domain.com"
    const spy = vi.spyOn(security, "generateCode")

    await login(email)

    const securityCode = spy.mock.results[0].value.toString()
    expect(sendEmail).toHaveBeenCalledWith(email, securityCode)
  })
})

describe("isOnline", () => {
  it("should return false if current hour is outside opening hours", () => {
    vi.setSystemTime("2024-01-01 07:59")
    expect(isOnline()).toBe(false)

    vi.setSystemTime("2024-01-01 20:01")
    expect(isOnline()).toBe(false)
  })

  it("should return true if current hour is within opening hours", () => {
    vi.setSystemTime("2024-01-01 08:00")
    expect(isOnline()).toBe(true)

    vi.setSystemTime("2024-01-01 19:59")
    expect(isOnline()).toBe(true)
  })
})

describe("getDiscount", () => {
  it("should return .2 on Christmas day", () => {
    vi.setSystemTime("2024-12-25 00:01")
    expect(getDiscount()).toBe(0.2)

    vi.setSystemTime("2024-12-25 23:59")
    expect(getDiscount()).toBe(0.2)
  })

  it("should return 0 on any other day", () => {
    vi.setSystemTime("2024-12-24 00:01")
    expect(getDiscount()).toBe(0)

    vi.setSystemTime("2024-12-26 00:01")
    expect(getDiscount()).toBe(0)
  })
})
