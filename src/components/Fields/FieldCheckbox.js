import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react"
import {useField, fieldPropTypes, fieldDefaultProps, useForm} from "@formiz/core"
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
      empty,
    checkedItems,
    setCheckedItems,
    ...otherProps
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const [checkedArray,setCheckedArray] = useState([]);
  const [checked, setChecked] = useState(false);
  const showError = !isValid
  const form = useForm()

  // useEffect(() => {
  //   console.log('use my effect')
  //   empty && setChecked(false);
  // }, [empty]);

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
    if (e.target.value === 'nonex' && e.target.checked === true) {
        console.log('uncheck everything else!')
      // document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
      setCheckedItems({
        [e.target.value]: e.target.checked,
      })
    } else {
      setCheckedItems({
        ...checkedItems,
        [e.target.value]: e.target.checked,
      })
    }
  }

  console.log(checkedItems)

  return (
      <FormGroup {...formGroupProps}>
        <Stack>
          {(options || []).map((item, i) => (
              <>
              <CheckboxGroup name="MyCheckBoxGroup">
              <Checkbox
                  key={i}
                  isChecked={checkedItems[i]}
                  value={item.value}
                  onChange={(val) => {setValue(!value); handleChange(val)}} // Update here
                  required={required}
                  // checked={false}

              >

                {item.label}
              </Checkbox>
              </CheckboxGroup>
              </>
          ))}
        </Stack>
      </FormGroup>
  )
}

FieldCheckbox.propTypes = propTypes
FieldCheckbox.defaultProps = defaultProps