import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Radio, RadioGroup } from "@chakra-ui/core"
import {
  useField,
  fieldPropTypes,
  fieldDefaultProps,
  FormizStep,
} from "@formiz/core"
import { FormGroup } from "../FormGroup"

const propTypes = {
  label: PropTypes.node,
  helper: PropTypes.node,
  options: PropTypes.array,
  ...fieldPropTypes,
}

const defaultProps = {
  label: "",
  helper: "",
  options: [],
  ...fieldDefaultProps,
}

export const FieldRadio = (props) => {
  const {
    errorMessage,
    id,
    isValid,
    isSubmitted,
    resetKey,
    setValue,
    value,
  } = useField(props)
  const { label, name, options, required, helper,updateState, ...otherProps } = props
  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)

  const handleChange = value => {
    setValue(value)
    updateState(name,value)
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
      <RadioGroup
        key={resetKey}
        value={value || ""}
        mb={8}
        onChange={e => {
          handleChange(e.target.value)
        }}
      >
        {(options || []).map(item => (
          <Radio key={item.value} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </RadioGroup>
    </FormGroup>
  )
}

FieldRadio.propTypes = propTypes
FieldRadio.defaultProps = defaultProps
