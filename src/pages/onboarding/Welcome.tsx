import React, { FormEvent, useEffect } from "react"
import { Button, H1, Input, Label, OnboardingWrapper } from "../../components"
import { useForm, useStatusStore } from "../../stores"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import { clearInput, throttle } from "../../utils"

type props = {
  status: "success" | "error" | "sending" | null
  message: string | Error | null
  onValidated: Function
}

const CustomForm: React.FC<props> = ({ status, message, onValidated }) => {
  const { setCredential, setCredentials, setError, credentials } = useForm()
  const { loading, toast } = useStatusStore()
  const validateEmail = () => credentials.email?.indexOf("@") > -1

  useEffect(() => {
    return throttle(() => {
      setCredentials({
        email: "",
      })
    })
  }, [setCredentials])

  useEffect(() => {
    if (status === "error") {
      loading(false)
      setError("email", message)
      toast.error(String(message))
    }
  }, [loading, message, setError, status, toast])

  useEffect(() => {
    if (status === "success") {
      loading(false)
      clearInput("email")
      toast.success(String(message))
    }
  }, [loading, message, setCredential, status, toast])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    loading(true, "Submitting...")

    validateEmail() === true && onValidated({ EMAIL: credentials.email! })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center lg:gap-2 gap-3 mt-6 lg:w-4/6 w-full lg:p-10 p-4 bg-white rounded-md"
    >
      <Label
        htmlFor="email"
        className="text-neutral600"
      >
        Enter email address
      </Label>
      <Input
        id="email"
        type="email"
        required
        defaultValue={credentials.email!}
        onChange={(e) => setCredential("email", e.target.value)}
        className="w-full py-3 px-4 shadow-md border-neutral500"
        autoCapitalize="off"
        autoCorrect="off"
        placeholder="you@company.com"
      />

      <div className="flex flex-col">
        <Button
          title="notify-me"
          type="submit"
          disabled={!validateEmail()}
          className="bg-primary text-primary50 mt-2"
        >
          Notify me!
        </Button>
        <span className="text-neutral500 text-sm mt-1">You can unsubscribe at any time.</span>
      </div>
    </form>
  )
}

export const Welcome: React.FC<{}> = () => {
  return (
    <OnboardingWrapper>
      <div className="h-5/6 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center lg:w-5/12 md:w-7/12 w-11/12 mx-auto gap-4 lg:gap-4">
          <H1 className="text-center font-medium text-primary50">
            Be the first to know when Onyinye Gift Cards launches!
          </H1>

          <div className="text-opacity-90 text-center text-primary50">
            Onyinye is still under construction - enter your details below to find out as soon as
            we're live! You'll also be added to our email list and will receive regular updates and
            product announcements from Onyinye. You can unsubscribe at any time.
          </div>

          <MailchimpSubscribe
            url={`https://onyinye.us14.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_LIST_ID}`}
            render={({ subscribe, status, message }) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={async (formData: any) => {
                  subscribe(formData)
                }}
              />
            )}
          />
        </div>
      </div>
    </OnboardingWrapper>
  )
}
