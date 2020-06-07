import { useField } from '@formiz/core'

export const MyField = (props) => {
  const {
    errorMessage,
    isValid,
    isSubmitted,
    setValue,
    value,
  } = useField(props)
  const { label, type, required } = props
  const [isTouched, setIsTouched] = React.useState(false)
  const showError = !isValid && (isTouched || isSubmitted)
  const id = 99

  return (
    <div className={`demo-form-group ${(showError) ? 'is-error' : ''}`}>
      <label
        className="demo-label"
        htmlFor={id}
      >
        { label }
        {!!required && ' *'}
      </label>
      <input
        id={id}
        name={'my.field'}
        type={type || 'text'}
        value={value ?? ''}
        className="demo-input"
        onChange={e => setValue(e.target.value)}
        onBlur={() => setIsTouched(true)}
        aria-invalid={showError}
        aria-required={!!required}
        aria-describedby={showError ? `${id}-error` : null}
      />
      {showError && (
        <div id={`${id}-error`} className="demo-form-feedback">
          { errorMessage }
        </div>
      )}
    </div>
  )
}