import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react"
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

  const clearState = () => {
    setCheckedItems({});
  };

  const handleChange = e => {

      console.log(e.target.value)
    console.log(isValid)
    setValue({
      ...value,
      [e.target.value]: e.target.checked,
    })

      setCheckedItems({
        [e.target.value]: e.target.checked,
      })

  }

  return (
    <FormGroup {...formGroupProps}>
      <Stack>
        <CheckboxGroup isDisabled="true" colorScheme="green" defaultValue={["naruto", "kakashi"]}>
          foo
        {(options || []).map((item, i) => (
          <Checkbox
            key={i}
            isChecked={checkedItems[i]}
            value={item.value}
             onChange={val => handleChange(val)}
            //onChange={val => setValue(!val)}
          >
            {item.label}
          </Checkbox>

        ))}
        </CheckboxGroup>
      </Stack>
    </FormGroup>
  )
}

FieldCheckbox.propTypes = propTypes
FieldCheckbox.defaultProps = defaultProps
