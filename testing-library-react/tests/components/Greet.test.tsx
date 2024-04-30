import { it, expect, describe } from "vitest"
import Greet from "../../src/components/Greet"
import { render, screen } from "@testing-library/react"

describe("Greet", () => {
  it("should return name with Hello when name is provided", () => {
    render(<Greet name="Danish" />)

    expect(screen.getByRole("heading")).toHaveTextContent(/danish/i)
  })

  it("should return login button when name is not provided", () => {
    render(<Greet name="" />)

    expect(screen.getByRole("button")).toHaveTextContent(/login/i)
  })
})
