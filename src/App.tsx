import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Welcome } from "./pages"

function App() {
  return (
    <>
      {/* <ErrorBoundary> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<Welcome />}
          />
        </Routes>
      </Suspense>
      {/* </ErrorBoundary> */}
    </>
  )
}

export default App
