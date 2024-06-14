import { http, HttpResponse } from "msw"
import { products } from "./data"

export const handlers = [
  http.get("/products", () => {
    return HttpResponse.json(products)
  }),
  http.get("/products/:id", ({ params }) => {
    const id = parseInt(params.id as string)
    const product = products.find((e) => e.id === id)
    if (!product) return HttpResponse.json(null, { status: 404 })

    return HttpResponse.json(product)
  }),
]
