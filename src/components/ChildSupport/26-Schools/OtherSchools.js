import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Text } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "",
  },
]

export const OtherSchools = () => {
  const form = useForm({
    subscribe: {
      fields: [
        "Schools",
        "Schools.postSecondary",
      ],
    },
  })
  const [state, setState] = useState({})
  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const [collection, setCollection] = useState(defaultCollection)

  useEffect(() => {
    setCollection(defaultCollection)
  }, [form.resetKey])

  const addItem = () => {
    setCollection(c => [
      ...c,
      {
        id: uuidv4(),
      },
    ])
  }

  const removeItem = id => {
    setCollection(c => c.filter(x => x.id !== id))
  }
  const Note = index => (
    <>
      <FieldInput name={`OtherSchools.${index}.name`} label={"School name"} />
      <FieldInput
        name={`OtherSchools.${index}.courseOfStudy`}
        label={"Course of study"}
      />
      <FieldRadio
        name={`OtherSchools.${index}.grad`}
        label="Did you graduate or complete the course of study?"
        placeholder="Select option..."
        required="Required"
        updateState={updateState}
        index={index}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {state["OtherSchools." + index + ".grad"] === "yes"
        ? disabled === false
        : (disabled = true)}
      <FieldInput
        name={`OtherSchools[${index}].completionDate`}
        label={"Completion date"}
        isDisabled={disabled}
      />
      {state["OtherSchools." + index + ".grad"] === "yes" && (
        <Text mt="-4" fontSize={"sm"}>
          If you are not sure of the exact date, enter something like "September
          2012."
        </Text>
      )}
      <FieldInput
        name={`OtherSchools[${index}].degree`}
        label={"Degree/Diploma, if any"}
        isDisabled={disabled}
      />
    </>
  )

  let disabled

  return (
    <>
      {form.values.Schools && form.values.Schools.postSecondary === "yes" && (
        <FormizStep label="Other Schools" name="OtherSchools" order={26500}>
          <SectionHeader
            header={`Enter each of the other schools you have attended:`}
          />
          <AddAnotherHeader header="Continue until you have entered all previous schools." />

          {collection.map(({ id, name }, index) => (
            <Box key={index}>
              <AddAnother
                note={Note(index)}
                index={index}
                removeItem={removeItem}
                expenseID={id}
              />
            </Box>
          ))}

          {OtherSchools.length <= 20 && (
            <AddPlaceholder label="Add another school?" onClick={addItem} />
          )}
        </FormizStep>
      )}
    </>
  )
}
