import { render, screen } from "@testing-library/react"
import ProductDetail from "../../src/components/ProductDetail"
import { products } from "../mocks/data"
import { server } from "../mocks/node"
import { HttpResponse, http } from "msw"

describe("ProductDetail", () => {
  it("should render details for correct productId", async () => {
    render(<ProductDetail productId={1} />)
    const name = await screen.findByText(new RegExp(products[0].name))
    const price = await screen.findByText(
      new RegExp(products[0].price.toString())
    )
    expect(name).toBeInTheDocument()
    expect(price).toBeInTheDocument()
  })

  it("should render an error for invalid productId", async () => {
    render(<ProductDetail productId={0} />)
    const error = await screen.findByText(/invalid/i)
    expect(error).toBeInTheDocument()
  })

  it("should render not found if no product found", async () => {
    server.use(
      http.get("/products/1", () => HttpResponse.json(null, { status: 404 }))
    )
    render(<ProductDetail productId={1} />)
    const notFound = await screen.findByText(/not found/i)
    expect(notFound).toBeInTheDocument()
  })
})
