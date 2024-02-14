import { defineConfig } from "cypress"
import "@cypress/instrument-cra"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    setupNodeEvents(on, config) {
      //
    },
  },
})
