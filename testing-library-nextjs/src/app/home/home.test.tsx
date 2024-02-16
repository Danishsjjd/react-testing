import Home from "@/app/home/page"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const buttonRegex = /make payment/i
const getButton = (name = buttonRegex) => screen.getByRole("button", { name })

describe("Home", () => {
  it("should have 'make payment' button", () => {
    render(<Home />)

    const paymentButton = getButton()

    expect(paymentButton).toBeInTheDocument()
  })
  test("'make payment' should be disabled initially", () => {
    render(<Home />)

    const paymentButton = getButton()

    expect(paymentButton).toBeDisabled()
  })
  it("should becomes enabled after valid data", async () => {
    // AAA pattern:
    render(<Home />) // arrange

    const elem = screen.getByPlaceholderText("amount")
    await userEvent.type(elem, "5") // Act
    const paymentButton = getButton()

    expect(paymentButton).toBeEnabled() // Assert
  })
})
