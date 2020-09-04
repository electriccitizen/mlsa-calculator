import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { Box, Divider, IconButton, Stack, Text } from "@chakra-ui/core"
import { SectionHeader } from "../SectionHeader"
import { AddPlaceholder } from "../AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { FaTrashAlt } from "react-icons/fa/index"
import { FieldRadio } from "../Fields/FieldRadio"

export const OtherSchools = () => {
  const form = useForm()
  const [state, setState] = useState({})
  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const defaultCollection = [
    {
      id: uuidv4(),
      name: "",
    },
  ]

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

  const addItemAtIndex = index => {
    setCollection(c => [
      ...c.slice(0, index + 1),
      {
        id: uuidv4(),
      },
      ...c.slice(index + 1),
    ])
  }

  const removeItem = id => {
    setCollection(c => c.filter(x => x.id !== id))
  }

  let disabled

  return (
    <>
      {form.values.Schools && form.values.Schools.postSecondary === "yes" && (
        <FormizStep name="OtherSchools" order={26500}>
          <SectionHeader
            header={`Enter each of the other schools you have attended:`}
          />
          <Box fontSize={"md"} mb={4}>
            Continue to click "Add another school" until you have entered all
            previous schools.
          </Box>
          <Box>
            {collection.map(({ id, name }, index) => (
              <Stack
                key={id}
                direction="row"
                spacing="2"
                mb="6"
                data-test={`repeater-item[${index}]`}
              >
                <Box>
                  <Box d={"flex"} mb={2}>
                    <Box flex="1" mr="4">
                      <FieldInput
                        name={`OtherSchools.${index}.name`}
                        label={"School name"}
                      />
                    </Box>
                    <Box flex="1">
                      <FieldInput
                        name={`OtherSchools.${index}.courseOfStudy`}
                        label={"Course of study"}
                      />
                    </Box>
                  </Box>

                  <Box d={"flex"} mb={2}>
                    <Box flex="1">
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
                    </Box>
                    {state["OtherSchools." + index + ".grad"] === "yes"
                      ? disabled === false
                      : (disabled = true)}

                    <>
                      <Box flex="1" mr="4">
                        <FieldInput
                          name={`OtherSchools[${index}].completionDate`}
                          label={"Completion date"}
                          isDisabled={disabled}
                        />
                        {state["OtherSchools." + index + ".grad"] === "yes" && (
                          <Text mt="-4" fontSize={"sm"}>
                            If you are not sure of the exact date, enter
                            something like "September 2012."
                          </Text>
                        )}
                      </Box>
                      <Box flex="1">
                        <FieldInput
                          name={`OtherSchools[${index}].degree`}
                          label={"Degree/Diploma, if any"}
                          isDisabled={disabled}
                        />
                      </Box>
                    </>
                  </Box>

                  <Divider />
                </Box>
                <Box transform="translateY(1rem)" pt="1.75rem">
                  <IconButton
                    aria-label="Delete"
                    icon={<FaTrashAlt />}
                    onClick={() => removeItem(id)}
                    variant="ghost"
                  />
                </Box>
              </Stack>
            ))}
          </Box>

          {OtherSchools.length <= 20 && (
            <AddPlaceholder label="Add another school?" onClick={addItem} />
          )}
        </FormizStep>
      )}
    </>
  )
}
