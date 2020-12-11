import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Input } from "@chakra-ui/react"
import { useField, fieldPropTypes, fieldDefaultProps } from "@formiz/core"
import { FormGroup } from "../Utils/FormGroup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

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

export const FieldDate = props => {
  const {
    errorMessage,
    id,
    isValid,
    isSubmitted,
    resetKey,
    setValue,
    value,
  } = useField(props)
  const { label, type, required, placeholder, helper, ...otherProps } = props
  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)
  const [startDate, setStartDate] = useState("")

  const handleChange = value => {
    setValue(value)
    setStartDate(value)
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

  const tenYears = new Date()
  tenYears.setFullYear(tenYears.getFullYear() + 10)
  return (
    <FormGroup ml={2} mr={2} {...formGroupProps}>
      <DatePicker
        key={resetKey}
        type={type || "text"}
        id={id}
        customInput={<Input value={startDate ?? ""} />}
        selected={startDate}
        //value={startDate ?? ""}
        value={value ?? ""}
        onChange={date => {
          handleChange(date)
        }}
        aria-invalid={showError}
        aria-describedby={!isValid ? `${id}-error` : null}
        onBlur={() => setIsTouched(true)}
        placeholderText={placeholder}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        maxDate={tenYears}

        //minDate={subMonths(new Date(), 6)}
      />
    </FormGroup>
  )
}

FieldDate.propTypes = propTypes
FieldDate.defaultProps = defaultProps
