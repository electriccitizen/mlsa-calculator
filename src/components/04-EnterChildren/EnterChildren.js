import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio} from '../Fields/FieldRadio'
import { SimpleGrid,  IconButton, Box, Stack } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { AddPlaceholder } from '../AddPlaceholder'
import { v4 as uuidv4 } from 'uuid';

export const EnterChildren = () => {
  const form = useForm();
  const [children, setChildren] = useState([]);

  let updateState = (name,value) => {
    console.log(value)
    name==='children.relationship' && localStorage.setItem('relationship', JSON.stringify( value));
  }

  useEffect(() => {
    setChildren([]);
  }, [form.resetKey]);

  const addItem = () => {
    setChildren((s) => [
      ...s,
      {
        id: uuidv4(),
      },
    ]);
  };

  const removeItem = (id) => {
    setChildren((s) => s.filter((x) => x.id !== id));
  };

  return (
    <FormizStep name="exposedPorts">
      <SectionWrapper>
        <SectionHeader
          header={
            `Enter the details for each of your children`
          }
        />
        <>
      {children.map((port, index) => (
        <Stack
          key={index}
          spacing="4"
          mb="6"
          rounded="md"
          borderWidth="1px"
          borderColor='gray.200'
          p="4"
        >
          <Stack
            isInline
            spacing="4"
            rounded="md"
          >
            <Box flex="1">
          <SectionHeader
            header={
              `Child 1`
            }
          />
          </Box>
          </Stack>

        <Stack
          isInline
          spacing="4"
          mb="6"
          rounded="md"
          p="4"
        >
          <Box flex="1">
            <FieldInput
              name={`children[${index}].fname`}
              label="First"
              required="Required"
              type="text"
              m="0"
            />
          </Box>
          <Box flex="1">
            <FieldInput
              name={`children[${index}].mname`}
              label="Middle"
              required="Required"
              type="text"
              m="0"
            />
          </Box>
          <Box flex="1">
            <FieldInput
              name={`children[${index}].lname`}
              label="Last name"
              required="Required"
              placeholder="Enter last name"
              type="text"
              m="0"
            />

          </Box>
          <Box pt="1.75rem">
            <IconButton
              icon="delete"
              onClick={() => removeItem(port.id)}
              variant="ghost"
            />
          </Box>
        </Stack>
          <Stack
            isInline
            spacing="4"
            mb="6"
            rounded="md"
            p="4"
          >
          <Box flex="1">
            <SectionHeader
              header={
                `Date of birth`
              }
            />
            <FieldDate
              name={`children[${index}].dob`}
              label="Date of birth"
              required="Required"
              type="text"
              m="0"
              p="4"
            />
          </Box>
          <Box flex="1">
            <SectionHeader
              header={
                `This child is (select all that apply):`
              }
            />
            <FieldRadio
              name="children[${index}].status"
              required="Required"
              updateState={updateState}
              options={[
                { value: 'emancipated', label: 'Emancipated' },
                { value: 'married', label: 'Married' },
                { value: 'military', label: 'Military' },
                { value: 'none', label: 'None of the above' },
              ]}
            />
          </Box>

          </Stack>
        </Stack>

      ))}
        </>
      {children.length <= 20 && (
        <AddPlaceholder label="Add child" onClick={addItem}/>
      )}
      </SectionWrapper>
    </FormizStep>
  )
}
