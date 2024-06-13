import { render, screen } from "@testing-library/react"
import Greet from "../../src/components/Greet"

describe("Greet", () => {
  it("should render Hello with the name when name is provided", () => {
    render(<Greet name="Danish" />)

    const heading = screen.getByRole("heading")
    expect(heading).toHaveTextContent(/Danish/i)
  })

  it("should render login button when name is not provided", () => {
    render(<Greet name="" />)

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent(/login/i)
  })
})
