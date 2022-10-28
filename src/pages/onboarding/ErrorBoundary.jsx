import React from "react"
import { Button, PageWrapper } from "../../components"

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: "" }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error.message }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <PageWrapper>
          <div className="w-100 vh-100 d-flex align-items-center">
            <div className="d-flex align-items-center">
              <div className="h-50 mb-6 pb-6 d-flex justify-content-center align-items-start">
                <div className="">
                  <h1 className="text-neut900 fw-bolder mb-1">Application error</h1>
                  {/* <div className="text-pry200 fw-bolder mb-4 fs-8">{this.state.error} error</div> */}
                  <p className="text-neut500 fs-7">
                    Sorry, this error wasn't suppose to occur. Support Team have been notified.
                    Please contact support if the error persists.
                  </p>

                  <div className="mt-6 d-flex align-items-center justify-content-start gap-3">
                    <Button
                      aria-label="create account"
                      href="/"
                      className="btn-primary px-3 fw-bolder d-flex align-items-center justify-content-center gap-2"
                    >
                      {/* <ArrowLeft size={16} /> */}
                      Return to homepage
                    </Button>

                    <Button
                      target="__blank"
                      href="mailto:support@safeli.io"
                      aria-label="Contact support"
                      className="bg-white px-3 fw-bolder shadow-sm border-neut200 text-neut700"
                    >
                      Contact support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageWrapper>
      )
    }

    return this.props.children
  }
}
