import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  Box,
  Checkbox,
  Stack,
  HStack,
  CheckboxGroup,
  Input, Radio,
} from '@chakra-ui/core'
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

export const FieldCheckbox = props => {
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
    checkedItems,
    setCheckedItems,
    ...otherProps
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)

  //const [checkedItems, setCheckedItems] = useState({})
  let isChecked = ""

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

  // const handleChange = (value) => {
  //   console.log(value)
  //   //console.log(event.target.checked)
  //   //console.log('dick')
  //   setValue(value)
  //   setCheckedItems({
  //     ...checkedItems,
  //     [value]: true,
  //   })
  //   console.log(checkedItems)
  // }

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.value]: e.target.checked,
    })
    setCheckedItems({
      ...checkedItems,
      [e.target.value]: e.target.checked,
    })
  }

  const CurrentStack = orientation === "vertical" ? Stack : HStack
  return (
    <FormGroup {...formGroupProps}>
        <Stack>
          {(options || []).map((item,i) => (
            <Checkbox
              isChecked={checkedItems[i]}
              //onChange={(val) => handleChange(val)}
              value={item.value}
              onChange={val => handleChange(val)}
            >{item.label}
            </Checkbox>
          ))}
        </Stack>
    </FormGroup>
  )
}

FieldCheckbox.propTypes = propTypes
FieldCheckbox.defaultProps = defaultProps
