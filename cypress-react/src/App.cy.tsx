import React from "react"
import App from "./App"
import { mount } from "cypress/react18"

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

describe("<App />", () => {
  it("renders", () => {
    cy.mount(<App />)

    cy.contains(/learn react/i).should("be.visible")
  })
})
