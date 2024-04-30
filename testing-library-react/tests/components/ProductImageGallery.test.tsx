import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ProductImageGallery from "../../src/components/ProductImageGallery"

describe("ProductImageGallery", () => {
  it("should render nothing if product list is empty", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />)

    expect(container).toBeEmptyDOMElement()
  })

  it("should render a list of images", () => {
    const imagesArr = Array.from({ length: 2 }, (_, i) => `${i}.png`)
    render(<ProductImageGallery imageUrls={imagesArr} />)

    const images = screen.getAllByRole("img")

    expect(images).toHaveLength(2)

    imagesArr.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url)
    })
  })
})
