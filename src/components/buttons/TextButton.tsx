import { useStatusStore } from "../../stores"

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
      className={`p-0 focus:outline-none focus:shadow-none focus:underline active:underline disabled:bg-neutral100 ${props.className}`}
    />
  )
}
