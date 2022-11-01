import { useStatusStore } from "../../stores"
import { LoadingIndicator } from "../layouts/StatusBar"

/**
 * An optimized button.
 * Pass the `title` props, else `⚠` is returned
 *
 * @param props
 * @returns button
 */
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { isLoading } = useStatusStore()
  if (!props["title"]) return <span children={"⚠"} />
  return (
    <button
      aria-label={props.title}
      {...props}
      disabled={(props.type === "submit" && isLoading) || props.disabled}
      autoFocus={isLoading}
      className={`py-[0.875rem] px-[1.125rem] text-center font-semibold rounded-[0.25rem] bg-primary400 text-white hover:bg-primary500 active:bg-primary500 focus:bg-primary500 disabled:bg-primary400/20 focus:outline-none focus:shadow-none ${props.className}`}
    >
      {props.type === "submit" && isLoading ? (
        <LoadingIndicator borderColor="text-white" />
      ) : (
        props.children
      )}
    </button>
  )
}
