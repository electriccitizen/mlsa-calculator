import React from "react"
import PropTypes from "prop-types"
import { Checkbox, Stack } from "@chakra-ui/react"
import {useField, fieldPropTypes, fieldDefaultProps} from "@formiz/core"
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
    // resetKey,
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
  // const [isTouched, setIsTouched] = useState(false)
  // const [checkedArray,setCheckedArray] = useState([]);
  // const [checked, setChecked] = useState(false);
  // const [checkedItems, setCheckedItems] = React.useState([])
  const showError = !isValid

  // useEffect(() => {
  //   setIsTouched(false)
  // }, [resetKey])

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

    if (e.target.value === 'none' && e.target.checked === true) {
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

  // const allChecked = checkedItems.every(Boolean)
  return (
      <FormGroup {...formGroupProps}>
        <Stack>
          {/*<CheckboxGroup name="MyCheckBoxGroup">*/}
          {(options || []).map((item, i) => (
              <Checkbox
                  key={i}
                  // isChecked={checkedItems[i]}
                  value={item.value}
                  onChange={(val) => {setValue(!value); handleChange(val)}} // Update here
                  // onChange={(e) => setCheckedItems({...checkedItems},[e.target.value,e.target.checked])}
                  //onChange={(e) => setCheckedItems({...checkedItems},[e.target.value, e.target.checked])}
                  // onChange={(val) =>  handleChange(val)}
                  required={required}
                  // checked={true}
              >

                {item.label}
              </Checkbox>

          ))}
          {/*</CheckboxGroup>*/}
        </Stack>
      </FormGroup>
  )
}

FieldCheckbox.propTypes = propTypes
FieldCheckbox.defaultProps = defaultProps