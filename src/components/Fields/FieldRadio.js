import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Box, Radio, Stack, HStack, RadioGroup } from "@chakra-ui/core"
import { useField, fieldPropTypes, fieldDefaultProps } from "@formiz/core"
import { FormGroup } from '../FormGroup';
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
    orientation,
    index,
    ...otherProps
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)

  const handleChange = value => {
    setValue(value)
    updateState(name, value, index)
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

  const CurrentStack = orientation === "vertical" ? Stack : HStack
  return (
    <FormGroup {...formGroupProps}>
      <RadioGroup
        key={resetKey}
        value={value || ""}
        mb={8}
        onChange={handleChange}
      >
        <CurrentStack>
          {(options || []).map(item => (
            <Radio
              mr={4}
              size="lg"
              colorScheme="brand"
              key={item.value}
              value={item.value}
            >
              {/*<Box fontSize="xl" d="flex">*/}
              {item.label}
              {/*</Box>*/}
            </Radio>
          ))}
        </CurrentStack>
      </RadioGroup>
      {children}
    </FormGroup>
  )
}

FieldRadio.propTypes = propTypes
FieldRadio.defaultProps = defaultProps
