import React from "react"
import { Button, Input, Label, OnboardingWrapper } from "../../components"

export const Welcome: React.FC<{}> = () => {
  return (
    <OnboardingWrapper>
      <div className="h-5/6 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center lg:w-5/12 md:w-7/12 w-11/12 mx-auto gap-4 lg:gap-4">
          <h1 className="lg:text-5xl text-4xl font-medium text-center text-primary-light">
            Be the first to know when Onyinye Gift Cards launches!
          </h1>

          <div className="text-opacity-90 text-center text-primary-light">
            Onyinye is still under construction - enter your details below to find out as soon as
            we're live! You'll also be added to our email list and will receive regular updates and
            product announcements from Onyinye. You can unsubscribe at any time.
          </div>

          <form className="flex flex-col justify-center lg:gap-2 gap-3 mt-6 lg:w-4/6 w-full lg:p-10 p-4 bg-white rounded-md">
            <Label
              htmlFor="email"
              className="text-grey-dark"
            >
              Enter email address
            </Label>
            <Input
              id="email"
              className="w-full py-3 px-4 shadow-md border-grey"
              placeholder="you@company.com"
            />

            <div className="flex flex-col">
              <Button
                title="notify-me"
                className="bg-primary text-primary-light mt-2"
              >
                Notify me!
              </Button>
              <span className="text-grey text-sm mt-1">You can unsubscribe at any time.</span>
            </div>
          </form>
        </div>
      </div>
    </OnboardingWrapper>
  )
}
