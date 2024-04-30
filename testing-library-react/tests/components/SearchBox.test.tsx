import { it, expect, describe, vi } from "vitest"
import SearchBox from "../../src/components/SearchBox"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("SearchBox", () => {
  it("should render input that submit the onChange callback if the length of value is greater then 0", async () => {
    const fc = vi.fn()
    render(<SearchBox onChange={fc} />)

    const input = screen.getByPlaceholderText(/search/i)

    const user = userEvent.setup()
    await user.type(input, "{enter}")

    expect(fc).toHaveBeenCalledTimes(0)

    const search = "Search"
    await user.type(input, `${search}{enter}`)

    expect(fc).toHaveBeenCalledTimes(1)
    expect(fc).toHaveBeenCalledWith(search)
  })
})
