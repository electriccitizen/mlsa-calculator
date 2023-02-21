import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Radio, Stack, RadioGroup } from "@chakra-ui/react"
import { useField, fieldPropTypes, fieldDefaultProps } from "@formiz/core"

import { FormGroup } from "../Utils/FormGroup"
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

export const FieldRadio = props => {
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
    options,
    required,
    helper,
    updateState,
    forceStack,
    index,
    ...otherProps
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)

  const handleChange = value => {
    setValue(value)
    updateState && updateState(name, value, index)
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
    <>
      <RadioGroup key={resetKey} value={value || ""} onChange={handleChange} >
        <Stack
          // direction={forceStack ? ["column"] : ["column", "column", "row"]}
          // spacing={forceStack ? [".2rem"] : [".2rem"]}
        >
          {(options || []).map(item => (
            <Radio
              mr={4}
              size="lg"
              colorScheme="brand"
              key={item.value}
              value={item.value}
            >
              {item.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>


      {children}

    </>
     </FormGroup>
  )
}

FieldRadio.propTypes = propTypes
FieldRadio.defaultProps = defaultProps