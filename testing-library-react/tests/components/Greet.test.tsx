import { render, screen } from "@testing-library/react"
import { describe, it } from "vitest"
import Greet from "../../src/components/Greet"

describe("Greet", () => {
  it("should return name with Hello when name is provided", () => {
    render(<Greet name="Danish" />)

    screen.debug()
  })
})
