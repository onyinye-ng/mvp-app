import { Link } from "react-router-dom"
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
      className={`p-3 px-6 text-center rounded-md focus:outline-none focus:shadow-none hover:opacity-95 active:opacity-95 disabled:bg-opacity-95 ${props.className}`}
    >
      {props.type === "submit" && isLoading ? (
        <LoadingIndicator borderColor="text-grey-light" />
      ) : (
        props.children
      )}
    </button>
  )
}

/**
 * An optimized text button.
 * Pass the `title` props, else `⚠` is returned
 *
 * @param props
 * @returns button
 */
export const TextButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { isLoading } = useStatusStore()
  if (!props["title"]) return <span children={"⚠"} />
  return (
    <button
      aria-label={props.title}
      {...props}
      disabled={(props.type === "submit" && isLoading) || props.disabled}
      className={`p-0 focus:outline-none focus:shadow-none focus:underline active:underline disabled:bg-grey-light ${props.className}`}
    />
  )
}

/**
 * An optimized icon button.
 * Pass the `title` props, else `⚠` is returned
 *
 * @param props
 * @returns button
 */
export const IconButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { isLoading } = useStatusStore()
  if (!props["title"]) return <span children={"⚠"} />
  return (
    <button
      aria-label={props.title}
      {...props}
      disabled={(props.type === "submit" && isLoading) || props.disabled}
      className={`p-2 flex justify-center items-center rounded-full focus:outline-none focus:shadow-none hover:opacity-95 active:opacity-95 disabled:bg-grey-light ${props.className}`}
    />
  )
}

type LinkProps = {
  children: any
  title: string
  className?: string
  to: string
}

/**
 * An optimized link button.
 * Pass the `title` props, else `⚠` is returned
 *
 * @param props
 * @returns button
 */
export const LinkButton: React.FC<LinkProps & React.RefAttributes<HTMLAnchorElement>> = (props) => {
  if (!props["title"]) return <span children={"⚠"} />
  return (
    <Link
      aria-label={props.title}
      {...props}
      className={`p-3 px-6 text-center rounded-md focus:outline-none focus:shadow-none hover:opacity-95 active:opacity-95 ${props.className}`}
    />
  )
}
