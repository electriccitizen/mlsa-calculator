import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  Box,
  Checkbox,
  Stack,
  HStack,
  CheckboxGroup,
  Input,
} from "@chakra-ui/core"
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
    ...otherProps
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const showError = !isValid && (isTouched || isSubmitted)

  const handleChange = e => {
    //setChecked(!value)
    //console.log(e)
    updateState(e.target)
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
      <CheckboxGroup colorScheme="green" defaultValue={["naruto", "kakashi"]}>
        <Stack>
          {(options || []).map(item => (
            <>
              Foo: {item.name}
              <Checkbox
                isChecked={checkedItems[item.name]}
                //onChange={handleChange}
                onClick={e => {
                  handleChange(e)
                }}
                mr={4}
                size="lg"
                colorScheme="brand"
                key={item.value}
                value={item.value}
              >
                {/*<Box fontSize="xl" d="flex">*/}
                {item.label}
                {/*</Box>*/}
              </Checkbox>
              {/*<Box>Lemme at em</Box>*/}
            </>
          ))}
        </Stack>
      </CheckboxGroup>
    </FormGroup>
  )
}

FieldCheckbox.propTypes = propTypes
FieldCheckbox.defaultProps = defaultProps
