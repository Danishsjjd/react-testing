import { render, screen } from "@testing-library/react"
import { it, expect, describe } from "vitest"
import ExpandableText from "../../src/components/ExpandableText"
import userEvent from "@testing-library/user-event"

describe("ExpandableText", () => {
  it("should render all short text", () => {
    const shortText = "a".repeat(255)
    render(<ExpandableText text={shortText} />)
    const button = screen.queryByRole("button")
    const text = screen.getByRole("article")

    expect(button).not.toBeInTheDocument()
    expect(text).toHaveTextContent(shortText)
  })
  it("should render long text with expandable button", async () => {
    const longText = "a".repeat(256)
    render(<ExpandableText text={longText} />)
    const button = screen.getByRole("button")
    const article = screen.getByRole("article")
    const user = userEvent.setup()

    expect(article.textContent).toBe(longText.substring(0, 255) + "...")
    expect(button).toHaveTextContent(/more/i)

    await user.click(button)

    expect(article.textContent).toBe(longText)
    expect(button).toHaveTextContent(/less/i)

    await user.click(button)

    expect(article.textContent).toBe(longText.substring(0, 255) + "...")
    expect(button).toHaveTextContent(/more/i)
  })
})
