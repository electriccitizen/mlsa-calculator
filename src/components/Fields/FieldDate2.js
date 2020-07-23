import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Input } from "@chakra-ui/core"
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

export const FieldDate2 = props => {
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
    ...otherProps
  } = props

  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)
  console.log(id)
  var date = document.getElementById(id)
  console.log(date)
  var list=document.getElementsByTagName("input")
  console.log(list);
  function checkValue(str, max) {
    if (str.charAt(0) !== "0" || str == "00") {
      var num = parseInt(str)
      if (isNaN(num) || num <= 0 || num > max) num = 1
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? "0" + num
          : num.toString()
    }
    return str
  }

  id.addEventListener("input", function (e) {
    this.type = "text"
    var input = this.value
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3)
    var values = input.split("/").map(function (v) {
      return v.replace(/\D/g, "")
    })
    if (values[0]) values[0] = checkValue(values[0], 12)
    if (values[1]) values[1] = checkValue(values[1], 31)
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + " / " : v
    })
    this.value = output.join("").substr(0, 14)
  })

  const handleChange = value => {
    setValue(value)
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
    <FormGroup ml={2} mr={2} {...formGroupProps}>
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
    </FormGroup>
  )
}

FieldDate2.propTypes = propTypes
FieldDate2.defaultProps = defaultProps
