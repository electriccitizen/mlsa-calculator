import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Select } from "@chakra-ui/core"
import { useForm, useField, fieldPropTypes, fieldDefaultProps } from "@formiz/core"
import { FormGroup } from "../FormGroup"

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


export const FieldSelect = props => {

  const form = useForm()
  const {
    errorMessage,
    id,
    isValid,
    isSubmitted,
    resetKey,
    setValue,
    value,

    fieldwidth,
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
    ...otherProps
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)

  const handleChange = ( name, value,index) => {
    setValue(value)
    updateState(name,value)
    //updateLabel(value, index)
    // setValue(!event.target.name)
    //updateMontana(value)
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
        //onChange={e => setValue(e.target.value)}
        onChange={e => {
          handleChange(name, e.target.value, index)
        }}
        width={"50%"}
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

FieldSelect.propTypes = propTypes
FieldSelect.defaultProps = defaultProps
