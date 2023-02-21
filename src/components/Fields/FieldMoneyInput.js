import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Input, Box, InputRightElement, Spinner } from "@chakra-ui/react"
import { useField, fieldPropTypes, fieldDefaultProps } from "@formiz/core"
import { FormGroup } from "../Utils/FormGroup"
import {isPattern} from "@formiz/validations";

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
    isValidating,
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
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

  const handleChange = e =>
      setValue(addCommas(removeNonNumeric(e.target.value)));
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
            // value={value ?? ""}
            // onChange={e => setValue(e.target.value)}
            onChange={(e) => handleChange(e)} value={value}
            onBlur={() => setIsTouched(true)}
            aria-invalid={showError}
            aria-describedby={!isValid ? `${id}-error` : null}
            placeholder={placeholder}
            width={fieldWidth ? fieldWidth : "40%"}
            validations={[
              {
                rule: isPattern(/^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/),
                message: 'Please enter a valid dollar amount',
              },
            ]}
          />
          {(isTouched || isSubmitted) && isValidating && (
            <InputRightElement>
              <Spinner size="sm" flex="none" />
            </InputRightElement>
          )}
        </Box>
      </Box>
    </FormGroup>
  )
}

FieldMoneyInput.propTypes = propTypes
FieldMoneyInput.defaultProps = defaultProps
