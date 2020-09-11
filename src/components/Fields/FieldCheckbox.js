import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Checkbox, Stack } from "@chakra-ui/core"
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

  const handleChange = e => {
    setValue({
      ...value,
      [e.target.value]: e.target.checked,
    })
    setCheckedItems({
      ...checkedItems,
      [e.target.value]: e.target.checked,
    })
  }

  return (
    <FormGroup {...formGroupProps}>
      <Stack>
        {(options || []).map((item, i) => (
          <Checkbox
            isChecked={checkedItems[i]}
            value={item.value}
            onChange={val => handleChange(val)}
          >
            {item.label}
          </Checkbox>
        ))}
      </Stack>
    </FormGroup>
  )
}

FieldCheckbox.propTypes = propTypes
FieldCheckbox.defaultProps = defaultProps
