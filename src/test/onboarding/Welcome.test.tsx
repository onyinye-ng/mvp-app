import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import "@testing-library/jest-dom"
import { MemoryRouter } from "react-router-dom"
// import { createMemoryHistory } from "history"
import App from "../../App"

// Visit this for guidance
// https://testing-library.com/docs/
// const history = createMemoryHistory()

test("Testing route '/'", () => {
  const routes = ["/"]

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={routes}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByRole("heading").innerHTML).toBe(
    "Be the first to know when Onyinye Gift Cards launches!"
  )
})
