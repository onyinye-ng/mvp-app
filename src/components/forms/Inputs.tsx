import { useStatusStore } from "../../stores"

type InputProps = {
  errors?: string[]
}

/**
 * An optimized input.
 *
 * @param props
 * @returns input
 */
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & InputProps> = (
  props
) => {
  const { isLoading } = useStatusStore()
  return (
    <div>
      <input
        type={props.type ?? "text"}
        {...props}
        disabled={isLoading}
        className={`rounded-md w-full py-2 px-3 placeholder:text-grey text-grey-dark focus:outline-double focus:outline-grey-light ${props.className}`}
      />
      {props.errors && props.errors.length > 0 && (
        <div className="text-danger font-medium text-xs mt-1">
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </div>
      )}
    </div>
  )
}

type PrefixInputProps = {
  affix: JSX.Element
  errors?: string[]
}

/**
 * An optimized input.
 *
 * @param props
 * @returns input
 */
export const PrefixInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & PrefixInputProps
> = (props) => {
  const { isLoading } = useStatusStore()
  return (
    <div>
      <div
        className={`rounded-sm w-full py-2 px-3 bg-white placeholder:text-grey text-grey-dark focus:outline-double focus:outline-grey-light flex justify-between ${props.className}`}
      >
        <div className="">{props.affix}</div>
        <input
          type={props.type ?? "text"}
          {...props}
          disabled={isLoading}
          className={`w-full pl-3 border-none placeholder:text-grey text-grey-dark focus:outline-double focus:outline-grey-light ${props.className}`}
        />
      </div>
      {props.errors && props.errors.length > 0 && (
        <div className="text-danger font-medium text-xs mt-1">
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * An optimized textarea input.
 *
 * @param props
 * @returns textarea
 */
export const TextareaInput: React.FC<
  React.InputHTMLAttributes<HTMLTextAreaElement> & InputProps
> = (props) => {
  const { isLoading } = useStatusStore()
  return (
    <div>
      <textarea
        rows={2}
        {...props}
        disabled={isLoading}
        className={`rounded-sm w-full py-2 px-3 placeholder:text-grey text-grey-dark focus:outline-double focus:outline-grey-light ${props.className}`}
      />
      {props.errors && props.errors.length > 0 && (
        <div className="text-danger font-medium text-xs mt-1">
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * An optimized checkbox input.
 *
 * @param props
 * @returns checkbox
 */
export const CheckboxInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & InputProps> = (
  props
) => {
  const { isLoading } = useStatusStore()
  return (
    <div>
      <input
        {...props}
        disabled={isLoading}
        type={props.type ?? "checkbox"}
        className={`p-2 border-primary-dark text-primary-dark checked:bg-primary checked:text-primary-light focus:outline-double focus:outline-grey-light hover:opacity-95 ${props.className}`}
      />
      {props.errors && props.errors.length > 0 && (
        <div className="text-danger font-medium text-xs mt-1">
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * An optimized label.
 *
 * @param props
 * @returns label
 */
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  return (
    <label
      {...props}
      className={`${props.className}`}
    />
  )
}
