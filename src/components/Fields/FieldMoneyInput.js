import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Box, Input, Radio } from "@chakra-ui/core"
import { useField, fieldPropTypes, fieldDefaultProps } from "@formiz/core"
import { FormGroup } from "../FormGroup"

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

export const FieldMoneyInput = props => {
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
    type,
    required,
    placeholder,
    helper,
    updateState,
    ...otherProps
  } = props

  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)

  const handleChange = value => {
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
    updateState,
    ...otherProps,
  }

  return (
    <FormGroup {...formGroupProps}>
      <Box d="flex" alignContent="bottom">
        <Box fontSize="lg" mt={2} mr={2}>
          $
        </Box>
        <Box flex={1}>
          <Input
            key={resetKey}
            type={type || "text"}
            id={id}
            value={value ?? ""}
            onChange={e => {
              handleChange(e.target.value)
            }}
            onBlur={() => setIsTouched(true)}
            aria-invalid={showError}
            aria-describedby={!isValid ? `${id}-error` : null}
            placeholder={placeholder}
          />
        </Box>
      </Box>
    </FormGroup>
  )
}

FieldMoneyInput.propTypes = propTypes
FieldMoneyInput.defaultProps = defaultProps
