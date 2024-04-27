import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import UserAccount from "../../src/components/UserAccount"
import { User } from "../../src/entities"

const user: User = { id: 1, name: "Danish", isAdmin: false }
const admin: User = { ...user, isAdmin: true }

describe("UserAccount", () => {
  it("should render username", () => {
    render(<UserAccount user={user} />)

    expect(screen.getByText(user.name)).toBeVisible()
  })
  it("should render edit button if user is admin", () => {
    render(<UserAccount user={admin} />)

    const button = screen.getByRole("button")

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/edit/i)
  })
  it("should not render edit button if user is not admin", () => {
    render(<UserAccount user={user} />)

    const button = screen.queryByRole("button")
    expect(button).not.toBeInTheDocument()
  })
})
