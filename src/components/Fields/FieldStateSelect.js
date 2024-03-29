import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Select } from "@chakra-ui/react"
import { useField, fieldPropTypes, fieldDefaultProps } from "@formiz/core"
import { FormGroup } from "../Utils/FormGroup"

const propTypes = {
  label: PropTypes.node,
  placeholder: PropTypes.string,
  helper: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array,
  ...fieldPropTypes,
}
const defaultProps = {
  label: "",
  placeholder: "",
  helper: "",
  options: [],
  ...fieldDefaultProps,
}

export const FieldStateSelect = props => {
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
    label,
    name,
    options,
    index,
    required,
    placeholder,
    helper,
    updateLabel,
    updateState,
    fieldWidth,
    ...otherProps
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)

  const handleChange = (name, value) => {
    setValue(value)
    updateState && updateState(name, value)
  }

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
      <Select
        id={id}
        key={resetKey}
        value={value || ""}
        onBlur={() => setIsTouched(true)}
        aria-invalid={showError}
        aria-describedby={!isValid ? `${id}-error` : null}
        placeholder={placeholder}
        name={name}
        index={index}
        width={fieldWidth ? fieldWidth : "100%"}
        onChange={e => {
          handleChange(name, e.target.value, index)
        }}
      >
        {(options || []).map(item => (
          <option key={item.value} value={item.value}>
            {item.label || item.value}
          </option>
        ))}
      </Select>
    </FormGroup>
  )
}

FieldStateSelect.propTypes = propTypes
FieldStateSelect.defaultProps = defaultProps
