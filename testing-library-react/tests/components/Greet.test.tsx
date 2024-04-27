import { it, expect, describe } from "vitest"
import Greet from "../../src/components/Greet"
import { render, screen } from "@testing-library/react"

describe("Greet", () => {
  it("should return name with Hello when name is provided", () => {
    render(<Greet name="Danish" />)

    const heading = screen.getByRole("heading")
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/danish/i)
  })

  it("should return login button when name is not provided", () => {
    render(<Greet name="" />)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/login/i)
    screen.debug()
  })
})
