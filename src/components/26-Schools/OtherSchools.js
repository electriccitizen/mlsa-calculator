import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldInput } from "../Fields/FieldInput"
import { Box, Divider, IconButton, Stack, Text } from "@chakra-ui/core"
import { SectionHeader } from "../SectionHeader"
import { AddPlaceholder } from "../AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { FieldSelect } from "../Fields/FieldSelect"
import { FaPlus, FaTrashAlt } from "react-icons/fa/index"
import { FieldRadio } from "../Fields/FieldRadio"
const defaultCollection = [
  {
    id: uuidv4(),
    name: "",
  },
]

export const OtherSchools = () => {
  const form = useForm()

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

  let updateState = (name, value, index) => {
    console.log(index)
    name === "OtherSchools." + index + ".grad" &&
      sessionStorage.setItem("OtherSchools." + index + ".grad", value)
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
                {/*<Box transform="translateY(4rem)">*/}
                {/*  <IconButton*/}
                {/*    aria-label="Add"*/}
                {/*    icon={<FaPlus />}*/}
                {/*    size="sm"*/}
                {/*    onClick={() => addItemAtIndex(index)}*/}
                {/*    variant="ghost"*/}
                {/*    isDisabled={collection.length > 20}*/}
                {/*    pointerEvents={*/}
                {/*      index + 1 >= collection.length ? "none" : null*/}
                {/*    }*/}
                {/*    opacity={index + 1 >= collection.length ? 0 : null}*/}
                {/*  />*/}
                {/*</Box>*/}

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
                    {sessionStorage.getItem(
                      "OtherSchools." + index + ".grad"
                    ) === "yes"
                      ? disabled === false
                      : (disabled = true)}

                    <>
                      <Box flex="1" mr="4">
                        <FieldInput
                          name={`OtherSchools[${index}].completionDate`}
                          label={"Completion date"}
                          isDisabled={disabled}
                        />
                        {sessionStorage.getItem(
                          "OtherSchools." + index + ".grad"
                        ) === "yes" && (
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
