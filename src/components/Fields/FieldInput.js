import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Input } from "@chakra-ui/react"
import { useField, fieldPropTypes, fieldDefaultProps } from "@formiz/core"
import { FormGroup } from "../Utils/FormGroup"

const propTypes = {
  label: PropTypes.node,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  helper: PropTypes.node,
  ...fieldPropTypes,
}
const defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  helper: "",
  ...fieldDefaultProps,
}

export const FieldInput = props => {
  const {
    errorMessage,
    id,
    isValid,
    isSubmitted,
    resetKey,
    setValue,
    value,
  } = useField(props)

  const {
    children,
    label,
    name,
    type,
    required,
    placeholder,
    helper,
    fieldWidth,
    ...otherProps
  } = props

  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)

  // const handleChange = value => {
  //   setValue(value)
  // }

  useEffect(() => {
    setIsTouched(false)
  }, [resetKey])

  const formGroupProps = {
    errorMessage,
    helper,
    id,
    isRequired: !!required,
    label,
    showError,
    ...otherProps,
  }

  return (
    <FormGroup {...formGroupProps}>
      <Input
        key={resetKey}
        type={type || "text"}
        id={id}
        value={value ?? ""}
        onChange={e => setValue(e.target.value)}
        onBlur={() => setIsTouched(true)}
        aria-invalid={showError}
        aria-describedby={!isValid ? `${id}-error` : null}
        placeholder={placeholder}
        width={fieldWidth ? fieldWidth : "100%"}
      />
    </FormGroup>
  )
}

FieldInput.propTypes = propTypes
FieldInput.defaultProps = defaultProps
