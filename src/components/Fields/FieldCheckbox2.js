import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Checkbox, Stack, HStack, CheckboxGroup } from "@chakra-ui/core"
import { useField, fieldPropTypes, fieldDefaultProps } from "@formiz/core"

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

export const FieldCheckbox2 = props => {
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
    required,
    helper,
    updateState,
    orientation,
    index,
    //checkedItems,
    ...otherProps
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)

  const [checkedItems, setCheckedItems] = useState({})

  const handleChange = event => {
    setValue(!value)
   // setValue(!event.target.name)
    //updateState(name, value, index)
    //updateMontana(value)
    console.log(value)
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


    </FormGroup>
  )
}

FieldCheckbox2.propTypes = propTypes
FieldCheckbox2.defaultProps = defaultProps
