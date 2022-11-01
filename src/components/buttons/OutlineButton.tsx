import { useStatusStore } from "../../stores"
import { LoadingIndicator } from "../layouts/StatusBar"

/**
 * An optimized button.
 * Pass the `title` props, else `⚠` is returned
 *
 * @param props
 * @returns button
 */
export const OutlineButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { isLoading } = useStatusStore()
  if (!props["title"]) return <span children={"⚠"} />
  return (
    <button
      aria-label={props.title}
      {...props}
      disabled={(props.type === "submit" && isLoading) || props.disabled}
      autoFocus={isLoading}
      className={`py-[0.875rem] px-[1.125rem] text-center font-semibold rounded-[0.25rem] bg-transparent text-primary400 border-2 border-primary400 hover:border-primary500 active:border-primary500 focus:border-primary500 hover:text-primary500 active:text-primary500 focus:text-primary500 disabled:opacity-20 focus:outline-none focus:shadow-none ${props.className}`}
    >
      {props.type === "submit" && isLoading ? (
        <LoadingIndicator borderColor="text-primary400" />
      ) : (
        props.children
      )}
    </button>
  )
}
